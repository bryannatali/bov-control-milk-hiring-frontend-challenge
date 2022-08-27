import styled from 'styled-components'
import { shade } from 'polished'
import { Button } from '../Button'

export const CheckListItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.secundary};
  border-radius: 0.5rem;
`

export const CheckListHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ToggleOptionsButton = styled.button.attrs({ type: 'button' })`
  font-size: 0;
  outline: 0;
  border: 0;

  cursor: pointer;

  background: transparent;
  padding: 0.25rem;
  border-radius: 0.5rem;

  transition: background 200ms ease;

  &:hover {
    background: ${({ theme }) => shade(0.1, theme.colors.background.secundary)};
  }
`

export const CheckListOptions = styled.div`
  position: absolute;
  top: 2.75rem;
  right: 1rem;

  display: flex;
  flex-direction: column;

  border-radius: 0.25rem;
  background: ${({ theme }) => theme.colors.background.primary};
`

export const OptionButton = styled(Button).attrs({ type: 'button' })`
  padding: 0.5rem;
  border-radius: inherit;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.75rem;

  &:hover {
    background: ${({ theme }) => shade(0.1, theme.colors.background.primary)}
  }

  &+button {
    border-top: 1px solid ${({ theme }) => theme.colors.grey.medium};
    border-radius: inherit;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`

export const InfoBox = styled.div`
  margin-top: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  span {
    margin-left: 0.25rem;
  }
`

export const SeeDetailsButton = styled(Button).attrs({ type: 'button' })`
  margin-top: 2rem;

  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-left: 0.25rem;
  }
`