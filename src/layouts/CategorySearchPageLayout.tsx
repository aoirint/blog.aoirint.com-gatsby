import { graphql, PageProps } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import { Navbar } from '../components'
import PostListItem from '../components/PostListItem'
import icon from '../images/icon.png'

const CategorySearchPageLayout: React.FC<PageProps<Queries.GetCategorySearchQuery>> = ({
  pageContext,
  data,
}) => {
  const category = 'category' in pageContext ? String(pageContext['category']) : ''

  return (
    <>
      <Helmet>
        <title>Category: {category} · えやみぐさ</title>
        <meta name='robots' content='noindex' />
      </Helmet>
      <Navbar />
      <section className='section'>
        <div className='container'>
          <h2 className='title is-4 mb-4'>Category: {category}</h2>
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
  query GetCategorySearch($category: String!) {
    posts: allMdx(
      filter: { frontmatter: { category: { eq: $category } }, fields: { draft: { eq: false } } }
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

export default CategorySearchPageLayout
