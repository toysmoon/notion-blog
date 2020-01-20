import { postIsReady } from '../../lib/blog-helpers'
import { useMemo } from 'react'
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

const Blog = ({ postsTable, slug, children }) => {
  const posts = useMemo(() => getPostsDisplay(postsTable), [postsTable])

  return (
    <StyledWrapper>
      <StyledListWrapper>
        {posts.length === 0 && <p>There are no posts yet</p>}
        {posts.length > 0 && <PostsList posts={posts} slug={slug} />}
      </StyledListWrapper>
      <StyledContent>{children}</StyledContent>
    </StyledWrapper>
  )
}

export default Blog
