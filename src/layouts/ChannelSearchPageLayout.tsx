import React from 'react'
import Helmet from 'react-helmet'
import { graphql, PageProps } from "gatsby"

import icon from '../images/icon.png'
import {
  Navbar,
} from '../components'

import PostListItem from '../components/PostListItem'
import { ChannelInfos } from '../data'

const ChannelSearchPageLayout: React.FC<PageProps<Queries.GetChannelSearchQuery>> = ({
  pageContext,
  data,
}) => {
  const channel = 'channel' in pageContext ? String(pageContext['channel']) : ''
  const channelInfo = ChannelInfos.filter((channeInfo) => channeInfo.key === channel)?.[0]

  return (
    <>
      <Helmet>
        <title>チャンネル: {channel} · えやみぐさ</title>
        {channelInfo?.indexNoIndex ? (
          <meta name="robots" content="noindex" />
        ) : ''}
      </Helmet>
      <Navbar />
      <section className='section'>
        <div className='container'>
          <h1 className='title is-4 mb-4'>
            チャンネル: {channel}
          </h1>
          <div className='content'>
            <p>
              {channelInfo?.description}
            </p>
          </div>
          {channelInfo?.indexCategoryIndex ? (
            <>
              <h2 className='title is-5 mb-3'>
                最近の投稿
              </h2>
              <div className='mt-4 mb-5'>
                {data.recentPosts.edges.map(({ node }) => (
                  <div key={node.id}>
                    <PostListItem post={node} />
                    <hr className='my-1' />
                  </div>
                ))}
              </div>
              <h2 className='title is-5 mb-3'>
                カテゴリ一覧
              </h2>
              <div className='columns is-multiline'>
                {data.posts.categories.map((category) => (
                  <div key={category.fieldValue} className='column is-one-quarter'>
                    <div className='m-1'>
                      <h3 className='title is-5 my-2'>
                        <a href={`/channel/${channel}/category/${category.fieldValue}/`}>
                          {category.fieldValue}
                        </a>
                      </h3>
                      <div>
                        {category.edges.map(({ node }) => (
                          <div key={node.id}>
                            <PostListItem post={node} />
                            <hr className='my-1' />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <ul>
                {data.posts.edges.map(({ node }) => (
                  <div key={node.id}>
                    <PostListItem post={node} />
                    <hr className='my-1' />
                  </div>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export const pageQuery = graphql`
  query GetChannelSearch(
    $channel: String!
  ) {
    recentPosts: allMdx(
      filter: {
        frontmatter: {channel: {eq: $channel}}
        fields: {draft: {eq: false}}
      }
      sort: {
        frontmatter: {lastModified: DESC}
      }
      limit: 10
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date
            updated
            channel
            category
            tags
          }
        }
      }
    }
    posts: allMdx(
      filter: {
        frontmatter: {channel: {eq: $channel}}
        fields: {draft: {eq: false}}
      }
      sort: {
        frontmatter: {lastModified: DESC}
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date
            updated
            channel
            category
            tags
          }
        }
      }
      categories: group(field: {frontmatter: {category: SELECT}}) {
        fieldValue
        edges {
          node {
            id
            fields {
              slug
            }
            parent {
              ... on File {
                sourceInstanceName
              }
            }
            frontmatter {
              title
              date
              updated
              channel
              category
              tags
            }
          }
        }
      }
    }
  }
`

export default ChannelSearchPageLayout
