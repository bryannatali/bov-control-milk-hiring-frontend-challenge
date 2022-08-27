import 'styled-components'

declare module 'styled-components' {
  export type Colors = {
    primary: string
    secundary: string
    success: string
    danger: string
    grey: {
      light: string
      medium: string
      dark: string
    }
    background: {
      primary: string
      secundary: string
    }
    text: {
      primary: string
      secundary: string
    }
  }

  export interface DefaultTheme {
    title: "light" | "dark"

    colors: Colors
  }
}