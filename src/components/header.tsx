import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

const StyledHedaer = styled.header`
  height: 40px;
`

const StyledNavigation = styled.ul`
  list-style: none;
  border-bottom: solid 1px;
  display: flex;
  align-items: center;
  height: 40px;
  li {
    flex: 1;
    font-size: 20px;
    font-weight: bold;
    line-height: 45px;
    padding-left: 10px;
    height: 40px;
  }
  li + li {
    border-left: solid 1px;
  }
  :first-child {
    cursor: pointer;
  }
`

export default ({ titlePre = '' }) => {
  return (
    <StyledHedaer>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Sungjung's Blog</title>
        <meta
          name="description"
          content="An example Next.js site using Notion for the blog"
        />
        <meta name="og:title" content="Sungjung's Blog" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@toysmoon2" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <StyledNavigation>
        <Link href="/">
          <li>SUNGJUNG</li>
        </Link>
      </StyledNavigation>
    </StyledHedaer>
  )
}
