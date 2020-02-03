import React, { FC } from 'react'
import Link from 'next/link'
import { getBlogLink } from '../lib/blog-helpers'
import styled, { FlattenSimpleInterpolation, css } from 'styled-components'

interface PostItemProps extends styledPostProps {
  label: any
  url: string
}

interface PostsListProps extends styledPostProps {
  posts: any
  back?: {
    label: string
    url: string
  }
}

interface styledPostProps {
  grid?: boolean
}

const styleWrapperByGridType = ({ grid }: styledPostProps) =>
  grid &&
  css`
    @media (min-width: 789px) {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-start;
    }
  `

const styleItemByGridType = ({ grid }: styledPostProps) =>
  grid &&
  css`
    @media (min-width: 789px) {
      width: 33.33333333%;
      height: 30%;
      box-sizing: border-box;
      border-right: solid 1px black;
      font-size: large;
      :nth-child(3n) {
        border-right: solid 1px white;
      }
    }
  `

const StyledWrapper = styled.ul<styledPostProps>`
  height: 100%;
  ${styleWrapperByGridType};
`

const StyledListItem = styled.li<styledPostProps>`
  cursor: pointer;
  height: calc(20% - 10px);
  border-bottom: solid 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: medium;
  ${styleItemByGridType}
`

const PostItem: FC<PostItemProps> = ({ label, url, grid }) => (
  <Link href={url} as={url}>
    <StyledListItem grid={grid}>{label}</StyledListItem>
  </Link>
)

const PostsList: FC<PostsListProps> = ({
  posts,
  grid = false,
  back = { label: '👈🏻', url: '/blog' },
}) => {
  return (
    <StyledWrapper grid={grid}>
      <PostItem grid={grid} key="Back" {...back} />
      {posts.map(post => (
        <PostItem
          grid={grid}
          key={post.Slug}
          label={post.Page}
          url={getBlogLink(post.Slug)}
        />
      ))}
    </StyledWrapper>
  )
}

export default PostsList
