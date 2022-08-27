import styled from 'styled-components'

export const CheckListDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  
  padding: 3rem;
`

export const CheckListDetailsHeader = styled.header`
  margin-top: 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      margin-right: 0.25rem;
    }
  }
`

export const CheckListInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;

  margin-top: 1rem;

  background: ${({ theme }) => theme.colors.background.secundary};
  padding: 1rem;
  border-radius: 0.5rem;

  svg {
    margin-right: 0.5rem;
  }

  span {
    font-size: 1.25rem;
  }
`