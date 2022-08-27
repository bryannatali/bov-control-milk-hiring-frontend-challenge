import React, { useRef, useEffect, useState, CSSProperties } from 'react'
import ReactSelect, { Props as ReactSelectProps, SelectInstance } from 'react-select'
import { useField } from '@unform/core'
import { useTheme } from 'styled-components'
import { lighten } from 'polished'

import { Error, Label, Container } from './styles'

export type UnformSelectOption<V = string> = {
  value: V
  label: string
}


export type UnformSelectRef<V = string, M extends boolean = false>
  = SelectInstance<UnformSelectOption<V>, M>

type UnformSelectProps = ReactSelectProps<UnformSelectOption, false> & {
  name: string
  label?: string
  containerStyle?: CSSProperties
}

export const UnformSelect: React.FC<UnformSelectProps> = ({ name, label, containerStyle, ...rest }) => {
  const selectRef = useRef<UnformSelectRef>(null)

  const { fieldName, defaultValue, registerField, error, clearError } = useField(name)

  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(null)

  const styledTheme = useTheme()

  useEffect(() => {
    setMenuPortalTarget(document.body)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.selectValue) {
            return []
          }
          return ref.state.selectValue.map((option: UnformSelectOption) => option.value)
        }
        if (!ref.state.selectValue[0]) {
          return ''
        }

        return ref.state.selectValue[0].value
      },
      setValue: (ref: UnformSelectRef, value: UnformSelectOption) => {
        ref.setValue(value, 'select-option')
      },
      clearValue: (ref: UnformSelectRef, value: UnformSelectOption) => {
        ref.setValue(value, 'select-option')
      }
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <Container style={containerStyle}>
      {label && <Label>{label}</Label>}

      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        menuPortalTarget={menuPortalTarget}
        onFocus={clearError}
        styles={{
          control: (provided) => ({
            ...provided,
            background: styledTheme.colors.background.primary,
            borderColor: error ? styledTheme.colors.danger : styledTheme.colors.text.secundary,
            borderWidth: error ? 2 : 1,
            ":hover": {
              ...provided[':hover'],
              borderColor: error ? styledTheme.colors.danger : styledTheme.colors.text.secundary,
              borderWidth: error ? 2 : 1,
            }

          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 12,
            background: styledTheme.colors.background.primary,
          }),
          menuPortal: (provided) => ({ ...provided, zIndex: 12 }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "#fff" : styledTheme.colors.text.primary,
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: lighten(0.1, styledTheme.colors.primary),
            primary25: (() => {
              let colorSplit = styledTheme.colors.primary.substring(1).split("")
              let c = Number("0x" + colorSplit.join(""))
              const newColor =
                "rgba(" +
                [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
                ", 0.5)"
              return newColor
            })(),
            neutral80: styledTheme.colors.text.primary,
          },
        })}
        {...rest}
      />

      {error && <Error>{error}</Error>}
    </Container>
  )
}