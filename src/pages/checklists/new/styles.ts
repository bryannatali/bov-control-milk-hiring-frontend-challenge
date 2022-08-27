import { Form } from '@unform/web'
import styled from 'styled-components'

export const NewCheckListContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  
  padding: 3rem;

  h1 {
    margin-top: 1rem;
  }
`

export const CreationForm = styled(Form)`
  display: flex;
  flex-direction: column;

  margin-top: 2rem;

  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secundary};
  border-radius: 0.5rem;

  footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
`

export const InputGroup = styled.div`
  margin-top: 1rem;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const Error = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 0.25rem;
`