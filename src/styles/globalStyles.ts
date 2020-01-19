import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    height: 100vh;
    div#__next {
      height: 100vh;
    }
  }
`
export default GlobalStyle
