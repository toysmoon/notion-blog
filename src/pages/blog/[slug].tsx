import React from 'react'
import Head from 'next/head'
import api from '../../lib/api'
import Header from '../../components/header'
import Heading from '../../components/heading'
import components from '../../components/dynamic'
import ReactJSXParser from '@zeit/react-jsx-parser'
import { textBlock } from '../../lib/notion/renderers'
import { getDateStr } from '../../lib/blog-helpers'
import BlogLayout from '../../containers/Blog/layout'

const listTypes = new Set(['bulleted_list', 'numbered_list'])

const RenderPost = ({ post, postsTable, slug, redirect }) => {
  let listTagName: string | null = null
  let listLastId: string | null = null
  let listChildren: React.ReactElement[] = []

  if (redirect) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta httpEquiv="refresh" content={`0;url=${redirect}`} />
        </Head>
      </>
    )
  }

  return (
    <>
      <Header title={post.Page} />
      <BlogLayout postsTable={postsTable} slug={slug}>
        <div>
          <h1>{post.Page || ''}</h1>
          {post.Date && <div>Posted: {getDateStr(post.Date)}</div>}

          <hr />

          {(!post.content || post.content.length === 0) && (
            <p>This post has no content</p>
          )}

          {(post.content || []).map((block, blockIdx) => {
            const { value } = block
            const { type, properties, id } = value
            const isLast = blockIdx === post.content.length - 1
            const isList = listTypes.has(type)
            let toRender = []

            if (isList) {
              listTagName = components[type === 'bulleted_list' ? 'ul' : 'ol']
              listLastId = `list${id}`
              listChildren.push(
                React.createElement(
                  components.li || 'li',
                  { key: id } as any,
                  textBlock(properties.title, true, id)
                )
              )
            }

            if (listTagName && (isLast || !isList)) {
              toRender.push(
                React.createElement(
                  listTagName,
                  { key: listLastId! },
                  ...listChildren
                )
              )
              listChildren = []
              listLastId = null
              listTagName = null
            }

            const renderHeading = (Type: string | React.ComponentType) => {
              toRender.push(
                <Heading key={id}>
                  <Type key={id}>{textBlock(properties.title, true, id)}</Type>
                </Heading>
              )
            }

            switch (type) {
              case 'page':
              case 'divider':
                break
              case 'text':
                if (properties) {
                  toRender.push(textBlock(properties.title, false, id))
                }
                break
              case 'image':
              case 'video': {
                const { format = {} } = value
                const { block_width } = format
                const baseBlockWidth = 768
                const roundFactor = Math.pow(10, 2)
                // calculate percentages
                const width = block_width
                  ? `${Math.round(
                      (block_width / baseBlockWidth) * 100 * roundFactor
                    ) / roundFactor}%`
                  : '100%'

                const isImage = type === 'image'
                const Comp = isImage ? 'img' : 'video'

                toRender.push(
                  <Comp
                    key={id}
                    src={`/api/asset?assetUrl=${encodeURIComponent(
                      format.display_source as any
                    )}&blockId=${id}`}
                    controls={!isImage}
                    alt={isImage ? 'An image from Notion' : undefined}
                    loop={!isImage}
                    muted={!isImage}
                    autoPlay={!isImage}
                    style={{ width }}
                  />
                )
                break
              }
              case 'header':
                renderHeading('h1')
                break
              case 'sub_header':
                renderHeading('h2')
                break
              case 'sub_sub_header':
                renderHeading('h3')
                break
              case 'code': {
                if (properties.title) {
                  const content = properties.title[0][0]
                  const language = properties.language[0][0]

                  if (language === 'LiveScript') {
                    // this requires the DOM for now
                    toRender.push(
                      <ReactJSXParser
                        key={id}
                        jsx={content}
                        components={components}
                        componentsOnly={false}
                        renderInpost={false}
                        allowUnknownElements={true}
                        blacklistedTags={['script', 'style']}
                      />
                    )
                  } else {
                    toRender.push(
                      <components.Code key={id}>{content}</components.Code>
                    )
                  }
                }
                break
              }
              case 'quote':
                if (properties.title) {
                  toRender.push(
                    React.createElement(
                      components.blockquote,
                      { key: id },
                      properties.title
                    )
                  )
                }
                break
              default:
                if (
                  process.env.NODE_ENV !== 'production' &&
                  !listTypes.has(type)
                ) {
                  break
                }
            }
            return toRender
          })}
        </div>
      </BlogLayout>
    </>
  )
}

RenderPost.getInitialProps = async ({ query, req }) => {
  const isServer = !!req
  const slug = query.slug
  const postsTable = await api.get(`/api/post`, isServer)
  const post = postsTable[slug]

  if (!post) {
    return {
      redirect: '/blog',
    }
  }
  const postData = await api.get(`/api/post/${post.id}`, isServer)
  post.content = postData.blocks

  return {
    post,
    slug,
    postsTable,
  }
}

export default RenderPost
