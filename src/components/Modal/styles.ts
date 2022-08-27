import { shade } from 'polished'
import { animated } from 'react-spring'
import styled from 'styled-components'

export const ModalBackgroundContainer = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.2);
`

export const NestedModalBackgroundContainer = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  /* z-index: 10; */

  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
`

export const ModalContainer = styled(animated.div)`
  max-height: 100vh;

  background: ${({ theme }) => theme.colors.background.secundary};
  /* padding: 1rem; */
  border-radius: 0.5rem;
`

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
`

export const ModalContent = styled.div`
  margin-top: 1rem;

  max-height: 80vh;

  padding: 1rem;
`

export const IconButton = styled.button.attrs({ type: 'button' })`
  font-size: 0;
  outline: 0;
  border: 0;

  cursor: pointer;

  margin-left: 1rem;

  background: transparent;
  padding: 0.25rem;
  border-radius: 0.5rem;

  transition: background 200ms ease;

  &:hover {
    background: ${({ theme }) => shade(0.1, theme.colors.background.secundary)};
  }
`