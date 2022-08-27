import Head from 'next/head'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

import { Button } from "../Button"

import { CheckListNotFoundContainer } from "./styles"

export const CheckListNotFound: React.FC = () => {
  return (
    <CheckListNotFoundContainer>
      <Head>
        <title>CheckList não encontrado</title>
      </Head>

      <h2>CheckList não encontrado! 😕</h2>

      <Link href="/">
        <Button type="button">
          <FiArrowLeft size={20} />
          voltar
        </Button>
      </Link>
    </CheckListNotFoundContainer>
  )
}