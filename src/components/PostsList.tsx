import React, { FC } from 'react'
import Link from 'next/link'
import { getBlogLink } from '../lib/blog-helpers'
import styled from 'styled-components'

interface PostItemProps {
  label: any
  url: string
}

interface PostsListProps {
  posts: any
  back?: {
    label: string
    url: string
  }
}

const StyledWrapper = styled.ul`
  height: 100%;
`

const StyledListItem = styled.li`
  cursor: pointer;
  height: 10rem;
  border-bottom: solid 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: medium;
`

const PostItem: FC<PostItemProps> = ({ label, url }) => (
  <Link href={url} as={url}>
    <StyledListItem>{label}</StyledListItem>
  </Link>
)

const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <StyledWrapper>
      {posts.map(post => (
        <PostItem
          key={post.Slug}
          label={post.Page}
          url={getBlogLink(post.Slug)}
        />
      ))}
    </StyledWrapper>
  )
}

export default PostsList
