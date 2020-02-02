import api from '../../lib/api'
import Router from 'next/router'
import Header from '../../components/header'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useMobileDetect } from '../../lib/hooks'

const StyledNoPostWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

const Blog = ({ posts }) => {
  const device = useMobileDetect()
  useEffect(() => {
    if (posts.length > 0 && device.isDesktop) {
      const slug = posts[0]
      Router.push(`/blog/${slug}`)
    }
  }, [posts])

  return (
    <>
      <Header titlePre="Blog" />
      <StyledNoPostWrapper>
        <p>Loading...</p>
      </StyledNoPostWrapper>
    </>
  )
}

Blog.getInitialProps = async ({ req }) => {
  const isServer = !!req
  const postsTable = await api.get(`/api/post`, isServer)
  const posts = Object.keys(postsTable)

  return { posts }
}

export default Blog
