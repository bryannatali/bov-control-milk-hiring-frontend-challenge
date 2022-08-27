import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%; // 15px
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%; // 14px
    }
  }

  @media (max-width: 360px) {
    html {
      font-size: 81.25%; // 13px
    }
  }

  body {
    background: ${({ theme }) => theme.colors.background.primary};
  }

  body, input, textarea, button {
    font: 500 1rem Inter, sans-serif;
    color: ${({ theme }) => theme.colors.text.secundary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    font-family: Lexend, sans-serif;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;