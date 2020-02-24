import api from '../../lib/api'
import Header from '../../components/header'
import styled, { css } from 'styled-components'
import PostsList from '../../components/PostsList'

const StyledListWrapper = styled.div`
  height: 100%;
`

const Blog = ({ posts }) => {
  return (
    <>
      <Header title="List" />
      <StyledListWrapper>
        {posts.length === 0 && <p>There are no posts yet</p>}
        {posts.length > 0 && <PostsList posts={posts} />}
      </StyledListWrapper>
    </>
  )
}

Blog.getInitialProps = async ({ req }) => {
  const isServer = !!req
  const postsTable = await api.get(`/api/post`, isServer)
  const posts = Object.keys(postsTable).map(key => ({
    ...postsTable[key],
  }))

  return { posts }
}

export default Blog
