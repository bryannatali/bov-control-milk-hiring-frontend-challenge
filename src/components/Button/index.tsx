import { ButtonHTMLAttributes, forwardRef, ForwardRefRenderFunction } from 'react'

import { StyledButton } from './styles'

export type ButtonColor = "primary" | "secundary" | "danger" | "success" | "gray.light" | "gray.medium" | "gray.dark"

type ButtonProps = {
  color?: ButtonColor
  outline?: boolean
}

type Props = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>

const ButtonWithRef: ForwardRefRenderFunction<HTMLButtonElement, Props> = ({ color, outline, children, ...rest }, ref) => {
  return (
    <StyledButton
      ref={ref}
      color={color || "primary"}
      outline={!!outline}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}

export const Button = forwardRef(ButtonWithRef)