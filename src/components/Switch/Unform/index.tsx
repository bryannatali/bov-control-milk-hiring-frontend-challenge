import { useField } from "@unform/core"
import { useEffect, useRef } from "react"
import ReactSwitch from "react-switch"

import { DefaultSwitch, DefaultSwitchProps } from "../Default"

type Props = DefaultSwitchProps & {
  name: string
}

export const UnformSwitch: React.FC<Props> = ({
  name,
  onChange,
  ...rest
}) => {

  const switchRef = useRef<ReactSwitch>(null)

  const { fieldName, error, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: switchRef.current,
      getValue: (ref: ReactSwitch) => ref.props.checked,
      setValue: (ref: ReactSwitch, value?: boolean) => {
        if (!value) {
          return
        }

        ref.setState({ checked: value })
        onChange?.()
      },
    })
  }, [fieldName, registerField, onChange])

  return (
    <DefaultSwitch
      ref={switchRef}
      {...rest}
    />
  )
}