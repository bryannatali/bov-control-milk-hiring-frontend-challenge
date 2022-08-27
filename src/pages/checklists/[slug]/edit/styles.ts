import { Form } from '@unform/web'
import styled from 'styled-components'

export const EditCheckListContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  
  padding: 3rem;

  h1 {
    margin-top: 1rem;
  }
`

export const InputGroup = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const EditForm = styled(Form)`
  display: flex;
  flex-direction: column;

  margin-top: 2rem;

  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secundary};
  border-radius: 0.5rem;

  ${InputGroup} + ${InputGroup} {
    margin-top: 1rem;
  }

  button {
    align-self: flex-end;
    margin-top: 2rem;
  }
`