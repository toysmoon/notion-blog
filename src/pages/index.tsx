import Link from 'next/link'
import { NextPage } from 'next'
import Header from '../components/header'
import styled from 'styled-components'
import { useDeviceDetect } from '../lib/hooks'
import api from '../lib/api'

interface IndexProps {
  firstPost: any
}

const navItems: { label: string; page: string }[] = [
  { label: 'about', page: '/about' },
  { label: 'blog', page: '/blog' },
  { label: 'contact', page: '/contact' },
]

const StyledNavigation = styled.ul`
  display: flex;
  height: calc(100% - 3rem);
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const StyledList = styled.li`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: large;
  text-align: center;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    border-bottom: solid 1px;
    :last-child {
      border-bottom: solid 1px white;
    }
  }
  @media (min-width: 769px) {
    border-left: solid 1px;
    :first-child {
      border-left: solid 1px white;
    }
  }
`

const Index: NextPage<IndexProps> = ({ firstPost }) => {
  const device = useDeviceDetect()
  const blogHref =
    firstPost && device.isDesktop ? `/blog/${firstPost}` : `/blog`
  return (
    <>
      <Header />
      <StyledNavigation>
        <Link href="/about">
          <StyledList>about</StyledList>
        </Link>
        <Link href={blogHref}>
          <StyledList>blog</StyledList>
        </Link>
        <Link href="/contact">
          <StyledList>contact</StyledList>
        </Link>
      </StyledNavigation>
    </>
  )
}

Index.getInitialProps = async ({ req }) => {
  const isServer = !!req
  const postsTable = await api.get(`/api/post`, isServer)
  const firstPost = Object.keys(postsTable)[0]
  return { firstPost }
}

export default Index
