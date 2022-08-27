import { FormHandles, Scope, SubmitHandler } from '@unform/core'
import { LatLng } from 'leaflet'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import * as Yup from 'yup'

import { LocationProvider } from '@contexts/LocationContext'
import { api } from '@services/api'
import { CheckList } from '@app-types/Checklist'

import { UnformSwitch } from '@components/Switch/Unform'
import { UnformInput } from '@components/UnformInput'
import { UnformSelect } from '@components/UnformSelect'
import { Button } from '@components/Button'
import { Map } from '@components/Map'

import { CreationForm, Error, InputGroup, NewCheckListContainer } from './styles'
import { useRouter } from 'next/router'
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
  type: string
  had_supervision: boolean
}

type CheckListType = CheckList & { _id: number }

const NewCheckListPage: NextPage = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [farmPosition, setFarmPosition] = useState<LatLng | null>(null)
  const [farmPositionError, setFarmPositionError] = useState(false)

  const { colors } = useTheme()

  const router = useRouter()

  const formRef = useRef<FormHandles>(null)

  const handleSubmit: SubmitHandler<FormData> = useCallback(async (data) => {
    if (!formRef.current) {
      return
    }

    if (!farmPosition) {
      setFarmPositionError(true)
      return
    }

    setIsCreating(true)

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

      const { data: checklists } = await api.get<CheckListType[]>('/checklist')

      let id: string

      if (checklists.length > 0) {
        id = String(checklists[checklists.length - 1]._id + 1)
      } else {
        id = "1"
      }

      await api.post('/checklist', {
        checklists: [
          {
            id,
            type: data.type,
            amount_of_milk_produced: data.amount_of_milk_produced,
            number_of_cows_head: data.number_of_cows_head,
            had_supervision: data.had_supervision,
            farmer: data.farmer,
            from: data.from,
            to: data.to,
            location: {
              latitude: farmPosition.lat,
              longitude: farmPosition.lng
            },
            created_at: new Date(),
            updated_at: new Date()
          }
        ]
      })

      setIsCreating(false)

      router.push(`/checklists/${id}`)
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
        setIsCreating(false)
        return
      }

      alert("Erro ao criar ChekList.")
      console.log(err)
      setIsCreating(false)
    }
  }, [farmPosition])

  return (
    <NewCheckListContainer>
      <Head>
        <title>Novo CheckList</title>
      </Head>

      <Breadcrumb />

      <h1>Novo CheckList</h1>

      <CreationForm
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Scope path="from">
          <UnformInput
            name="name"
            placeholder="Nome do fazendeiro"
            label="Fazendeiro"
            disabled={isCreating}
          />
        </Scope>

        <Scope path="farmer">
          <InputGroup>
            <UnformInput
              name="name"
              placeholder="Nome da fazenda"
              label="Fazenda"
              containerStyle={{ flex: 1 }}
              disabled={isCreating}
            />

            <UnformInput
              name="city"
              placeholder="Cidade da fazenda"
              label="Cidade"
              containerStyle={{ flex: 1, marginLeft: '2rem' }}
              disabled={isCreating}
            />
          </InputGroup>
        </Scope>

        <InputGroup>
          <Scope path="to">
            <UnformInput
              name="name"
              placeholder="Nome do supervisor"
              label="Supervisor"
              containerStyle={{ flex: 1 }}
              disabled={isCreating}
            />
          </Scope>

          <UnformSelect
            name="type"
            placeholder="Escolha o tipo do CheckList"
            label="Tipo"
            containerStyle={{ flex: 1, marginLeft: '2rem' }}
            options={[
              { value: 'BPA', label: 'BPA' },
              { value: 'Antibiótico', label: 'Antibiótico' },
              { value: 'BPF', label: 'BPF' },
            ]}
            isDisabled={isCreating}
          />
        </InputGroup>

        <InputGroup>
          <UnformInput
            type="number"
            name="amount_of_milk_produced"
            placeholder="Quantidade de leite produzida no mês"
            label="Quantidade de leite produzida"
            containerStyle={{ flex: 1 }}
            disabled={isCreating}
          />

          <UnformInput
            type="number"
            name="number_of_cows_head"
            placeholder="Quantidade de cabeça de gado"
            label="Cabeças de gado"
            containerStyle={{ flex: 1, marginLeft: '2rem' }}
            disabled={isCreating}
          />
        </InputGroup>

        <UnformSwitch
          name="had_supervision"
          label="Teve supervisão no mês em curso"
          onColor={colors.secundary}
          offColor={colors.grey.medium}
          checkedIcon={false}
          uncheckedIcon={false}
          containerStyle={{ marginTop: '1rem' }}
          disabled={isCreating}
        />

        <LocationProvider onPositionChange={setFarmPosition}>
          <Map />
        </LocationProvider>

        {farmPositionError && (
          <Error>Selecione a localização da fazenda</Error>
        )}

        <Button type="submit" color="success" disabled={isCreating}>
          {isCreating ? 'criando...' : 'criar checklist'}
        </Button>
      </CreationForm>
    </NewCheckListContainer>
  )
}

export default NewCheckListPage