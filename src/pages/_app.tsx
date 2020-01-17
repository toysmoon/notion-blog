import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/globalStyles'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
    <footer></footer>
  </>
)
