import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Error = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 0.5rem;
  margin-left: 0.15rem;
`

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.25rem;

  margin-bottom: 0.25rem;
`