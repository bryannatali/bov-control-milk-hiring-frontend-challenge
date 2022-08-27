import styled, { css, DefaultTheme } from 'styled-components';
import { ButtonColor } from '.';

type PrimaryColorKey = "primary" | "secundary" | "danger" | "success" | "grey"

type SecundaryColorKey = "light" | "medium" | "dark"

type StyledButtonProps = {
  color: ButtonColor
  outline: boolean
}

function getButtonColor(color: ButtonColor, theme: DefaultTheme) {
  const [primaryKey, secundaryKey] = color.split(".")

  if (primaryKey === 'grey') {
    return theme.colors[primaryKey][secundaryKey as SecundaryColorKey]
  }

  return theme.colors[primaryKey as PrimaryColorKey]
}

export const StyledButton = styled.button<StyledButtonProps>`
  outline: 0;
  border: 0;
  cursor: pointer;

  ${({ theme, color, outline }) => {
    const buttonColor = getButtonColor(color, theme)

    if (outline) {
      return css`
        background: transparent;
        border: 2px solid ${buttonColor};
        color: ${buttonColor};

        transition: background .2s ease, color .2s ease;

        &:not(:disabled):hover {
          background: ${buttonColor};
          color: #fff;
        }
      `
    }

    return css`
      background: ${buttonColor};
      color: #fff;

      transition: filter .2s ease;

      &:not(:disabled):hover {
        filter: brightness(0.9);
      }
    `
  }};

  font: 600 0.875rem Lexend, sans-serif;
  text-transform: uppercase;
  padding: 0.675rem;
  border-radius: 4px;

  &:disabled {
    opacity: 0.8;

    cursor: not-allowed;
  }
`;
