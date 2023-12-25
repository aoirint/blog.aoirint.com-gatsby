import { graphql, PageProps } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import { Navbar } from '../components'
import PostListItem from '../components/PostListItem'
import icon from '../images/icon.png'

const ChannelCategorySearchPageLayout: React.FC<
  PageProps<Queries.GetChannelCategorySearchQuery>
> = ({ pageContext, data }) => {
  const channel = 'channel' in pageContext ? String(pageContext['channel']) : ''
  const category = 'category' in pageContext ? String(pageContext['category']) : ''

  return (
    <>
      <Helmet>
        <title>
          {channel}/category/{category} · えやみぐさ
        </title>
        <meta name='robots' content='noindex' />
      </Helmet>
      <Navbar />
      <section className='section'>
        <div className='container'>
          <h1 className='title is-6 mb-4'>
            <a href={`/channel/${channel}/`}>チャンネル: {channel}</a>
          </h1>
          <h2 className='title is-4 mb-4'>カテゴリ: {category}</h2>
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
  query GetChannelCategorySearch($channel: String!, $category: String!) {
    posts: allMdx(
      filter: {
        frontmatter: { channel: { eq: $channel }, category: { eq: $category } }
        fields: { draft: { eq: false } }
      }
      sort: { frontmatter: { lastModified: DESC } }
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

export default ChannelCategorySearchPageLayout
