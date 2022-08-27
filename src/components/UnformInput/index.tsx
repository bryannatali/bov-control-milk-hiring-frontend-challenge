import React, { CSSProperties, InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

import { Container, Error, Label, StyledInput } from './styles'

interface Props {
  name: string
  label?: string
  containerStyle?: CSSProperties
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props

export function UnformInput({ name, label, containerStyle, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, registerField, error, clearError } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: ref => {
        if (rest.type === 'number') {
          const value = Number(ref.value)

          return Number.isNaN(value) ? undefined : value
        }

        return ref.value
      },
      setValue: (ref, value) => {
        ref.value = value
      },
      clearValue: ref => {
        ref.value = ''
      },
    })
  }, [fieldName, registerField, rest.type])

  return (
    <Container style={containerStyle}>
      {label && <Label htmlFor={fieldName}>{label}</Label>}

      <StyledInput
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        onFocus={clearError}
        onChange={clearError}
        className={error ? 'error' : undefined}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </Container>
  )
}