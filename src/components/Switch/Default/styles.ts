import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`