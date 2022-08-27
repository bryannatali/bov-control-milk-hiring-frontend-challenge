import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useState, useCallback, useRef } from 'react'
import { useTheme } from 'styled-components'

import { api } from '@services/api'
import { CheckList } from '@app-types/Checklist'
import { formatDate } from '@utils/formatDate'

import { CheckListItem } from '@components/CheckListItem'
import { Modal, ModalHandles } from '@components/Modal'
import { Button } from '@components/Button'

import { CheckLists, HomeContainer, HomeHeader, RemoveCheckListContainer } from './index.styles'
import { FiPlus } from 'react-icons/fi'
import Link from 'next/link'

type CheckListType = CheckList & { _id: string }

type HomePageProps = {
  checklists: CheckListType[]
}

const HomePage: NextPage<HomePageProps> = ({ checklists }) => {
  const [checklistsState, setCheckListsState] = useState(checklists)
  const [checklistToRemove, setChecklistToRemove] = useState<(CheckList & { _id: string }) | null>(null)
  const [isRemoving, setIsRemoving] = useState(false)

  const removeChecklistModalRef = useRef<ModalHandles>(null)

  const { colors } = useTheme()

  const handleRequestRemoveCheckList = useCallback((checklist: (CheckList & { _id: string })) => {
    setChecklistToRemove(checklist)
    removeChecklistModalRef.current?.open()
  }, [])

  const handleRemoveCheckList = useCallback(async () => {
    if (!checklistToRemove) {
      return
    }

    setIsRemoving(true)

    try {
      await api.delete(`/checklist/${checklistToRemove._id}`)

      setIsRemoving(false)
      removeChecklistModalRef.current?.close()

      setCheckListsState(oldState => oldState.filter(checklist => checklist._id !== checklistToRemove._id))
    } catch (err) {
      alert("Erro ao remover CheckList.")
      setIsRemoving(false)
    }
  }, [checklistToRemove])

  return (
    <HomeContainer>
      <Head>
        <title>CheckLists</title>
      </Head>

      <HomeHeader>
        <h1>CheckLists</h1>

        <Link href="/checklists/new">
          <Button type="button">
            <FiPlus size={20} />
            novo checklist
          </Button>
        </Link>
      </HomeHeader>


      <CheckLists>
        {checklistsState.map(checklist => (
          <li key={checklist._id}>
            <CheckListItem
              checklist={checklist}
              handleRequestRemoveCheckList={handleRequestRemoveCheckList}
            />
          </li>
        ))}
      </CheckLists>

      <Modal
        ref={removeChecklistModalRef}
        title="Remover CheckList"
        onModalClosed={() => setChecklistToRemove(null)}
      >
        {checklistToRemove && (
          <RemoveCheckListContainer>
            <h2>Tem certeza que deseja remover o CheckList?</h2>
            <h3>Esta ação não poderá ser desfeita.</h3>

            <CheckListItem
              checklist={checklistToRemove}
              showActions={false}
              style={{ background: colors.background.primary }}
            />

            <footer>
              <Button
                type="button"
                color="secundary"
                onClick={() => removeChecklistModalRef.current?.close()}
                disabled={isRemoving}
              >
                cancelar
              </Button>
              <Button
                type="button"
                color="danger"
                disabled={isRemoving}
                onClick={handleRemoveCheckList}
              >
                {isRemoving ? 'removendo...' : 'remover'}
              </Button>
            </footer>
          </RemoveCheckListContainer>
        )}
      </Modal>
    </HomeContainer>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const { data } = await api.get<CheckListType[]>('/checklist')

  return {
    props: {
      checklists: data.map(checklist => ({
        ...checklist,
        formatedDate: formatDate(checklist.created_at)
      }))
    }
  }
}