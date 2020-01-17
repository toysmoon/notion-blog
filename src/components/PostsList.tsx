import React, { FC } from 'react'
import Link from 'next/link'
import { getBlogLink, getDateStr } from '../lib/blog-helpers'
import { textBlock } from '../lib/notion/renderers'

interface PostItemProps {
  post: any
}

interface PostsListProps {
  posts: any
}

const PostItem: FC<PostItemProps> = ({ post }) => (
  <li>
    <h3>
      <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
        <a>{post.Page}</a>
      </Link>
    </h3>
    {post.Date && <div className="posted">Posted: {getDateStr(post.Date)}</div>}
    <p>
      {(post.preview || []).map((block, idx) =>
        textBlock(block, true, `${post.Slug}${idx}`)
      )}
    </p>
  </li>
)

const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => (
        <PostItem post={post} key={post.Slug} />
      ))}
    </ul>
  )
}

export default PostsList
