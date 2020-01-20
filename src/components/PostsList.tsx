import React, { FC } from 'react'
import Link from 'next/link'
import { getBlogLink, getDateStr } from '../lib/blog-helpers'
import { textBlock } from '../lib/notion/renderers'
import styled from 'styled-components'

interface PostItemProps {
  post: any
}

interface PostsListProps {
  posts: any
  slug: string
}

const StyledWrapper = styled.ul`
  height: 100%;
  li {
    height: calc(20% - 10px);
    border-bottom: solid 1px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
`

const PostItem: FC<PostItemProps> = ({ post }) => (
  <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
    <li>{post.Page}</li>
  </Link>
)

const PostsList: FC<PostsListProps> = ({ posts, slug }) => {
  return (
    <StyledWrapper>
      {posts.map(post => (
        <PostItem post={post} key={post.Slug} />
      ))}
    </StyledWrapper>
  )
}

export default PostsList
