import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/globalStyles'
import styled from 'styled-components'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

const GlobalLayout = styled.div`
  min-height: 100%;
  max-width: 50rem;
  margin: 0 auto;
  border-left: solid 1px black;
  border-right: solid 1px black;
`

export default ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </ThemeProvider>
    <footer></footer>
  </>
)
