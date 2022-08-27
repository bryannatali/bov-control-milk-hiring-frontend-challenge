import { CSSProperties, forwardRef, useCallback, useState } from "react"
import ReactSwitch, { ReactSwitchProps } from "react-switch"

import { Container, Label } from "./styles"

type Props = {
  defaultChecked?: boolean
  label?: string
  containerStyle?: CSSProperties
  onChange?: () => void
}

export type DefaultSwitchProps = Omit<Omit<ReactSwitchProps, 'checked'>, 'onChange'> & Props

const DefaultSwitchWithRef: React.ForwardRefRenderFunction<ReactSwitch, DefaultSwitchProps> = ({
  defaultChecked,
  label,
  containerStyle,
  onChange,
  ...rest
},
  switchRef
) => {
  const [checked, setChecked] = useState(!!defaultChecked)

  const handleChange = useCallback(() => {
    setChecked(oldChecked => !oldChecked)

    onChange?.()
  }, [onChange])

  return (
    <Container style={containerStyle}>
      {label && <Label>{label}</Label>}

      <ReactSwitch
        ref={switchRef}
        checked={checked}
        onChange={handleChange}
        {...rest}
      />
    </Container>
  )
}

export const DefaultSwitch = forwardRef(DefaultSwitchWithRef)