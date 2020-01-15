import axios from 'axios'
import { NextPage } from 'next'
import Header from '../components/header'
import { postIsReady } from '../lib/blog-helpers'
import { useMemo } from 'react'
import PostsList from '../components/PostsList'

interface IndexProps {
  postsTable: [any]
}

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

const Index: NextPage<IndexProps> = ({ postsTable = [] }) => {
  const posts = useMemo(() => getPostsDisplay(postsTable), [postsTable])
  console.log(posts)
  return (
    <>
      <Header />
      <div>
        <h1>My Notion Blog</h1>
        {posts.length === 0 && <p>There are no posts yet</p>}
        {posts.length > 0 && <PostsList posts={posts} />}
      </div>
    </>
  )
}

Index.getInitialProps = async () => {
  const response = await axios.get('http://localhost:3000/api/post')
  return {
    postsTable: response.data,
  }
}

export default Index
