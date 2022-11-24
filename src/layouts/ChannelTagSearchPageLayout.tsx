import React from 'react'
import Helmet from 'react-helmet'
import { graphql, PageProps } from "gatsby"

import icon from '../images/icon.png'
import {
  Navbar,
} from '../components'

import PostListItem from '../components/PostListItem'

const ChannelTagSearchPageLayout: React.FC<PageProps<Queries.GetChannelTagSearchQuery>> = ({
  pageContext,
  data,
}) => {
  const channel = 'channel' in pageContext ? String(pageContext['channel']) : ''
  const tag = 'tag' in pageContext ? String(pageContext['tag']) : ''

  return (
    <>
      <Helmet>
        <title>{channel}/tags/{tag} · えやみぐさ</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <section className='section'>
        <div className='container'>
          <h1 className='title is-6 mb-4'>
            <a href={`/channel/${channel}/`}>
              チャンネル: {channel}
            </a>
          </h1>
          <h2 className='title is-4 mb-4'>
            タグ: {tag}
          </h2>
          <ul>
            {data.posts.edges.map(({ node }) => (
              <div key={node.id}>
                <PostListItem post={node} />
                <hr className='my-1' />
              </div>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export const pageQuery = graphql`
  query GetChannelTagSearch(
    $channel: String!
    $tag: String!
  ) {
    posts: allMdx(
      filter: {
        frontmatter: {
          channel: {eq: $channel}
          tags: {in: [$tag]}
        }
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
    }
  }
`

export default ChannelTagSearchPageLayout
