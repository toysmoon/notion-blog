import Link from 'next/link'
import { NextPage } from 'next'
import Header from '../components/header'
import styled from 'styled-components'
import api from '../lib/api'
import PostsList from '../components/PostsList'

interface IndexProps {
  posts: any
}

const StyledNavigation = styled.ul`
  display: flex;
  border-top: solid 1px black;
  border-bottom: solid 1px black;
`

const StyledList = styled.li`
  padding: 0.5rem;
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
  border-right: solid 1px black;
  :last-of-type {
    border-right: solid 0.5px white;
  }
`

const Index: NextPage<IndexProps> = ({ posts }) => {
  return (
    <>
      <Header />
      <StyledNavigation>
        <Link href="/about">
          <StyledList>about</StyledList>
        </Link>
        <Link href="/contact">
          <StyledList>contact</StyledList>
        </Link>
      </StyledNavigation>
      {posts.length === 0 && <p>There are no posts yet</p>}
      {posts.length > 0 && <PostsList posts={posts} />}
    </>
  )
}

Index.getInitialProps = async ({ req }) => {
  const isServer = !!req
  const postsTable = await api.get(`/api/post`, isServer)
  const posts = Object.keys(postsTable).map(key => ({
    ...postsTable[key],
  }))

  return { posts }
}

export default Index
