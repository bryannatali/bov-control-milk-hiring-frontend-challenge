import { FormHandles, Scope, SubmitHandler } from '@unform/core'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useRef, useState } from 'react'
import * as Yup from 'yup'

import { api } from '@services/api'
import { CheckList } from '@app-types/Checklist'
import { formatDate } from '@utils/formatDate'

import { Button } from '@components/Button'
import { CheckListNotFound } from '@components/CheckListNotFound'
import { UnformInput } from '@components/UnformInput'

import {
  EditCheckListContainer,
  EditForm,
  InputGroup,
} from './styles'
import { Breadcrumb } from '@components/Breadcrumb'

type FormData = {
  farmer: {
    name: string
    city: string
  }
  from: { name: string }
  to: { name: string }
  amount_of_milk_produced: number
  number_of_cows_head: number
}

type CheckListType = CheckList & {
  id: string
}

type EditCheckListPageProps = {
  checklist: CheckListType | null
}

const EditCheckListPage: NextPage<EditCheckListPageProps> = ({ checklist }) => {
  const [isSaving, setIsSaving] = useState(false)

  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = useCallback(async (data) => {
    if (!checklist) {
      return
    }

    setIsSaving(true)

    const schema = Yup.object().shape({
      farmer: Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        city: Yup.string().required('Campo obrigatório'),
      }),
      from: Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
      }),
      to: Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
      }),
      amount_of_milk_produced: Yup.number().min(1, 'Quantidade mínima é 1').required('Campo obrigatório'),
      number_of_cows_head: Yup.number().min(1, 'Quantidade mínima é 1').required('Campo obrigatório'),
    })

    try {
      await schema.validate(data, {
        abortEarly: false
      })

      await api.put(`/checklist/${checklist.id}`, {
        type: checklist.type,
        had_supervision: checklist.had_supervision,
        location: checklist.location,
        created_at: checklist.created_at,
        updated_at: checklist.updated_at,
        farmer: data.farmer,
        from: data.from,
        to: data.to,
        amount_of_milk_produced: data.amount_of_milk_produced,
        number_of_cows_head: data.number_of_cows_head,
      })

      alert("Informações salvas com sucesso.")
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {}
        let firstErrorPath = ''

        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message

            if (!firstErrorPath) {
              firstErrorPath = error.path
            }
          }
        })

        const firstErrorFieldRef = formRef.current?.getFieldRef(firstErrorPath)
        firstErrorFieldRef?.focus()

        formRef.current?.setErrors(validationErrors)
        return
      }

      alert("Erro ao salvar informações do ChekList.")
      console.log(err)
    }

    setIsSaving(false)
  }, [checklist])

  if (!checklist) {
    return (
      <CheckListNotFound />
    )
  }

  return (
    <EditCheckListContainer>
      <Head>
        <title>Editar {checklist.farmer.name}</title>
      </Head>

      <Breadcrumb />

      <h1>Editar dados {checklist.farmer.name}</h1>

      <EditForm
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={checklist}
      >
        <Scope path="farmer">
          <InputGroup>
            <UnformInput
              name="name"
              placeholder="Nome da fazenda"
              label="Fazenda"
              containerStyle={{ flex: 1 }}
              disabled={isSaving}
            />

            <UnformInput
              name="city"
              placeholder="Nome da cidade"
              label="Cidade da Fazenda"
              containerStyle={{ flex: 1, marginLeft: '2rem' }}
              disabled={isSaving}
            />
          </InputGroup>
        </Scope>

        <InputGroup>
          <Scope path="from">
            <UnformInput
              name="name"
              placeholder="Nome do fazendeiro"
              label="Fazendeiro"
              containerStyle={{ flex: 1 }}
              disabled={isSaving}
            />
          </Scope>

          <Scope path="to">
            <UnformInput
              name="name"
              placeholder="Nome do supervisor"
              label="Supervisor"
              containerStyle={{ flex: 1, marginLeft: '2rem' }}
              disabled={isSaving}
            />
          </Scope>
        </InputGroup>


        <InputGroup>
          <UnformInput
            type="number"
            name="amount_of_milk_produced"
            placeholder="Quantidade de leite produzida no mês"
            label="Quantidade de leite produzida"
            containerStyle={{ flex: 1 }}
            disabled={isSaving}
          />

          <UnformInput
            type="number"
            name="number_of_cows_head"
            placeholder="Quantidade de cabeça de gado"
            label="Cabeças de gado"
            containerStyle={{ flex: 1, marginLeft: '2rem' }}
            disabled={isSaving}
          />
        </InputGroup>

        <Button type="submit" color="success" disabled={isSaving}>
          {isSaving ? 'salvando...' : 'salvar informações'}
        </Button>
      </EditForm>
    </EditCheckListContainer>
  )
}

export default EditCheckListPage

export const getServerSideProps: GetServerSideProps<EditCheckListPageProps, { slug: string }> = async (ctx) => {
  if (!ctx.params || !Number(ctx.params.slug)) {
    return {
      props: { checklist: null }
    }
  }

  try {
    const { data } = await api.get<CheckListType>(`/checklist/${ctx.params.slug}`)

    return {
      props: {
        checklist: {
          ...data,
          formatedDate: formatDate(data.created_at)
        }
      }
    }
  } catch (err) {
    console.log(err)

    return {
      props: { checklist: null }
    }
  }
}