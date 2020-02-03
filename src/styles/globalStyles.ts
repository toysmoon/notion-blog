import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    div#__next {
      height: 100%;
    }
  }
`
export default GlobalStyle
