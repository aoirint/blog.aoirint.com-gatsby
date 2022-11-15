import React from 'react'
import { graphql, PageProps } from "gatsby"

import {
    GetTagSearchQuery
} from '../../generated/graphql-types'
import { Helmet } from 'react-helmet'
import { Navbar } from '../components'
import PostListItem from '../components/PostListItem'

const TagSearchPageLayout: React.FC<PageProps<GetTagSearchQuery>> = ({
    pageContext,
    data,
}) => {
    const tag = 'tag' in pageContext ? String(pageContext['tag']) : ''

    return (
        <>
            <Helmet>
                <title>Tag: {tag} · えやみぐさ</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <Navbar />
            <section className='section'>
                <div className='container'>
                    <h2 className='title is-4 mb-4'>
                        Tag: {tag}
                    </h2>
                    <div>
                        {data.posts.edges.map(({ node }) => (
                            <div key={node.id}>
                                <PostListItem post={node} />
                                <hr className='my-1' />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export const pageQuery = graphql`
  query GetTagSearch(
    $tag: String!
  ) {
    posts: allMdx(
        filter: {
            frontmatter: {
                tags: {
                    in: [$tag]
                }
            }
            fields: {draft: {eq: false}}
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

export default TagSearchPageLayout
