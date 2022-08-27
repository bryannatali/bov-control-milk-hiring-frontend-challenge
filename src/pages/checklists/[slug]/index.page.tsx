import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiCalendar, FiEdit, FiMapPin, FiUsers } from 'react-icons/fi'
import { GiCow, GiMilkCarton, GiFarmer } from 'react-icons/gi'

import { api } from '@services/api'
import { CheckList } from '@app-types/Checklist'
import { formatDate } from '@utils/formatDate'

import { CheckListNotFound } from '@components/CheckListNotFound'
import { Map } from '@components/Map'
import { Breadcrumb } from '@components/Breadcrumb'
import { Button } from '@components/Button'

import { CheckListDetailsContainer, CheckListDetailsHeader, CheckListInfoBox } from './styles'
import { LocationProvider } from '@contexts/LocationContext'

type CheckListType = CheckList & {
  id: string
}

type CheckListDetailsPageProps = {
  checklist: CheckListType | null
}

const CheckListDetailsPage: NextPage<CheckListDetailsPageProps> = ({ checklist }) => {
  const router = useRouter()

  if (!checklist) {
    return (
      <CheckListNotFound />
    )
  }

  return (
    <CheckListDetailsContainer>
      <Head>
        <title>Detalhes {checklist.farmer.name}</title>
      </Head>

      <Breadcrumb />

      <CheckListDetailsHeader>
        <h1>{checklist.farmer.name}</h1>

        <Link href={`${router.asPath}/edit`}>
          <Button type="button">
            <FiEdit size={20} />
            editar
          </Button>
        </Link>
      </CheckListDetailsHeader>

      <CheckListInfoBox>
        <FiMapPin size={28} />
        <span>{checklist.farmer.city}</span>
      </CheckListInfoBox>

      <CheckListInfoBox>
        <GiFarmer size={28} />
        <span>Fazendeiro: {checklist.from.name}</span>
      </CheckListInfoBox>

      <CheckListInfoBox>
        <FiUsers size={28} />
        <span>Supervisor: {checklist.to.name}</span>
      </CheckListInfoBox>

      <CheckListInfoBox>
        <span>{checklist.type}</span>
      </CheckListInfoBox>

      <CheckListInfoBox>
        <FiCalendar size={28} />
        <span>{checklist.formatedDate}</span>
      </CheckListInfoBox>

      <CheckListInfoBox>
        <GiCow size={28} />
        <span>{checklist.number_of_cows_head} cabeças de gado</span>
      </CheckListInfoBox>

      <CheckListInfoBox>
        <GiMilkCarton size={28} />
        <span>{checklist.amount_of_milk_produced}L de leite produzido</span>
      </CheckListInfoBox>

      <LocationProvider>
        <Map checklist={checklist} />
      </LocationProvider>
    </CheckListDetailsContainer>
  )
}

export default CheckListDetailsPage

export const getServerSideProps: GetServerSideProps<CheckListDetailsPageProps, { slug: string }> = async (ctx) => {
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