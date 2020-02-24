import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { FC } from 'react'

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

const StyledTitle = styled.h1`
  border-top: solid 1px;
  font-size: large;
  height: 3rem;
  line-height: 3rem;
  padding-left: 1.5rem;
  overflow: hidden;
  box-sizing: border-box;
`

interface HeaderProps {
  title?: string
  description?: string
}

const Header: FC<HeaderProps> = ({
  title = null,
  description = "Sungjung's Blog",
}) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} | Sungjung's Blog` : "Sungjung's Blog"}
        </title>
        <meta name="description" content={`${description}`} />
        <meta name="og:title" content="Sungjung's Blog" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@toysmoon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <Link href="/">
        <StyledTitle>
          {title ? `${title} | Sungjung's Blog` : "Sungjung's Blog"}
        </StyledTitle>
      </Link>
    </>
  )
}

export default Header
