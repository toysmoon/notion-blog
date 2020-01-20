import axios from 'axios'
import Router from 'next/router'
import Header from '../../components/header'
import { useEffect } from 'react'
import styled from 'styled-components'

const StyledNoPostWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

const Blog = ({ posts }) => {
  useEffect(() => {
    if (posts.length > 0) {
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

Blog.getInitialProps = async () => {
  const postsTable = (await axios.get('http://localhost:3000/api/post')).data
  const posts = Object.keys(postsTable)

  return { posts }
}

export default Blog
