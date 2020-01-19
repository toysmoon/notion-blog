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
}

const StyledWrapper = styled.ul`
  li {
    height: 150px;
    border-bottom: solid 1px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding-left: 40px;
  }
`

const PostItem: FC<PostItemProps> = ({ post }) => (
  <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
    <li>{post.Page}</li>
  </Link>
)

const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <StyledWrapper>
      {posts.map(post => (
        <PostItem post={post} key={post.Slug} />
      ))}
    </StyledWrapper>
  )
}

export default PostsList
