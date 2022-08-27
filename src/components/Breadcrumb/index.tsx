import { Button } from '@components/Button'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'

import { BreadcrumbContainer } from './styles'

export const Breadcrumb: React.FC = () => {
  const router = useRouter()

  return (
    <BreadcrumbContainer>
      <Button type="button" onClick={router.back}>
        <FiArrowLeft size={20} />
        voltar
      </Button>
    </BreadcrumbContainer>
  )
}