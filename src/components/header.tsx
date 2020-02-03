import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

const StyledHeader1 = styled.h1`
  border-bottom: solid 1px;
  font-size: large;
  height: 3rem;
  line-height: 3rem;
  padding-left: 0.5rem;
  overflow: hidden;
  box-sizing: border-box;
`

export default ({ title = null }) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} | Sungjung's Blog` : "Sungjung's Blog"}
        </title>
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
      <Link href="/">
        <StyledHeader1>
          {title ? `${title} | Sungjung's Blog` : "Sungjung's Blog"}
        </StyledHeader1>
      </Link>
    </>
  )
}
