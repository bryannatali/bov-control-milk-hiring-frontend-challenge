import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 3rem;
`

export const HomeHeader = styled.header`
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

export const CheckLists = styled.ul`
  list-style: none;

  margin-top: 2rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`

export const RemoveCheckListContainer = styled.div`
  display: flex;
  flex-direction: column;

  >h3 {
    margin: 0.25rem 0 2rem;
  }

  footer {
    margin-top: 2rem;
    
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button+button {
      margin-left: 1rem;
    }
  }
`