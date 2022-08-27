import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  ForwardRefRenderFunction,
  ReactNode,
  useEffect,
} from 'react'
import { FiX } from 'react-icons/fi'
import { useTransition } from 'react-spring'

import {
  IconButton,
  ModalBackgroundContainer,
  ModalContainer,
  ModalContent,
  ModalHeader,
  NestedModalBackgroundContainer,
} from './styles'

export type ModalHandles = {
  open: () => void
  close: () => void
}

type ModalProps = {
  title: string
  children?: ReactNode
  width?: string | number
  overflowDisabled?: boolean
  nestedModal?: boolean
  onModalClosed?: () => void
}

const ForwardRefModal: ForwardRefRenderFunction<ModalHandles, ModalProps> = ({
  title,
  onModalClosed,
  children,
  width,
  overflowDisabled = false,
  nestedModal = false,
}, modalRef) => {
  const [isShown, setIsShown] = useState(false)

  const backgroundTransitions = useTransition(isShown, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const open = useCallback(() => {
    setIsShown(true)
  }, [])

  const close = useCallback(() => {
    setIsShown(false)

    if (onModalClosed) {
      onModalClosed()
    }
  }, [onModalClosed])

  useImperativeHandle(modalRef, () => ({
    open,
    close,
  }))

  return backgroundTransitions((backgroundStyle, backgroundItem) => backgroundItem && (
    !!nestedModal
      ? (
        <NestedModalBackgroundContainer style={backgroundStyle}>
          {
            isShown && (
              <ModalContentComponent
                title={title}
                handleClose={close}
                isShown={isShown}
                width={width}
                overflowDisabled={overflowDisabled}
              >
                {children}
              </ModalContentComponent>
            )
          }
        </NestedModalBackgroundContainer>
      ) : (
        <ModalBackgroundContainer style={backgroundStyle}>
          {
            isShown && (
              <ModalContentComponent
                title={title}
                handleClose={close}
                isShown={isShown}
                width={width}
                overflowDisabled={overflowDisabled}
              >
                {children}
              </ModalContentComponent>
            )
          }
        </ModalBackgroundContainer>
      )
  ))
}

export const Modal = forwardRef(ForwardRefModal)

type ModalContentProps = {
  isShown: boolean
  title: string
  width?: number | string
  overflowDisabled?: boolean
  handleClose: () => void
  children: ReactNode
}

const ModalContentComponent: React.FC<ModalContentProps> = ({
  title,
  width,
  overflowDisabled,
  handleClose,
  children,
}) => {
  const modalTransition = useTransition(true, {
    from: { opacity: 0, transform: 'translateY(40px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(40px)' },
    reverse: true,
  })

  useEffect(() => {
    function listener(this: Window, e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [handleClose])

  return modalTransition((modalStyle, modalItem) => modalItem && (
    <ModalContainer style={{ ...modalStyle, width }}>
      <ModalHeader>
        <h1>{title}</h1>

        <IconButton onClick={handleClose}>
          <FiX size={28} />
        </IconButton>
      </ModalHeader>
      <ModalContent style={{ overflowY: overflowDisabled ? 'hidden' : 'auto' }}>
        {children}
      </ModalContent>
    </ModalContainer>
  ))
}