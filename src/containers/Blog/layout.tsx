import { postIsReady } from '../../lib/blog-helpers'
import axios from 'axios'
import { useMemo, useEffect, useState } from 'react'
import PostsList from '../../components/PostsList'
import { StyledWrapper, StyledListWrapper, StyledContent } from './style'

function getPostsDisplay(postsTable) {
  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!postIsReady(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  return posts
}

const Blog = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [postsTable, setPostsTable] = useState([])
  const posts = useMemo(() => getPostsDisplay(postsTable), [postsTable])
  const getPostsTable = async () => {
    const response = await axios.get('/api/post')
    setPostsTable(response.data)
    setIsLoading(false)
  }
  useEffect(() => {
    getPostsTable()
  }, [])

  return (
    <StyledWrapper>
      <StyledListWrapper>
        {isLoading && <p>loading...</p>}
        {!isLoading && posts.length === 0 && <p>There are no posts yet</p>}
        {posts.length > 0 && <PostsList posts={posts} />}
      </StyledListWrapper>
      <StyledContent>{children}</StyledContent>
    </StyledWrapper>
  )
}

export default Blog
