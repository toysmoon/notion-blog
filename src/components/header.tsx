import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

const StyledNavigation = styled.ul`
  list-style: none;
  border-bottom: solid 1px;
  height: 45px;
  display: flex;
  align-items: center;
  li {
    flex: 1;
    font-size: 20px;
    font-weight: bold;
    line-height: 45px;
    height: 45px;
    padding-left: 10px;
  }
  li + li {
    border-left: solid 1px;
  }
`

export default ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <header>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Sungjung's Blog</title>
        <meta
          name="description"
          content="An example Next.js site using Notion for the blog"
        />
        <meta name="og:title" content="Sungjung's Blog" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@_ijjk" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <StyledNavigation>
        <li>SUNGJUNG BLOG</li>
        <li></li>
        <li></li>
      </StyledNavigation>
    </header>
  )
}
