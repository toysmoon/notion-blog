import Header from '../../components/header'
import { postIsReady } from '../../lib/blog-helpers'
import axios from 'axios'
import { useMemo } from 'react'
import PostsList from '../../components/PostsList'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'

// export async function unstable_getStaticProps() {
//   const postsTable = await getBlogIndex()
//   const authorsToGet: Set<string> = new Set()
//   const posts: any[] = Object.keys(postsTable)
//     .map(slug => {
//       const post = postsTable[slug]
//       // remove draft posts in production
//       if (!postIsReady(post)) {
//         return null
//       }
//       post.Authors = post.Authors || []
//       for (const author of post.Authors) {
//         authorsToGet.add(author)
//       }
//       return post
//     })
//     .filter(Boolean)

//   const { users } = await getNotionUsers([...authorsToGet])

//   posts.map(post => {
//     post.Authors = post.Authors.map(id => users[id].full_name)
//   })

//   return {
//     props: {
//       posts,
//     },
//     revalidate: 10,
//   }
// }

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

const Blog = ({ postsTable = [] }) => {
  const posts = useMemo(() => getPostsDisplay(postsTable), [postsTable])

  return (
    <>
      <Header titlePre="Blog" />
      <div>
        {posts.length === 0 && <p>There are no posts yet</p>}
        {posts.length > 0 && <PostsList posts={posts} />}
      </div>
    </>
  )
}

Blog.getInitialProps = async () => {
  const response = await axios.get('http://localhost:3000/api/post')
  return {
    postsTable: response.data,
  }
}

export default Blog
