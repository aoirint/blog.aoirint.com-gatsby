import * as React from "react"
import Helmet from 'react-helmet'
import '../styles/main.scss'

import dayjs from 'dayjs'

import {
  graphql,
  PageProps,
} from 'gatsby'

import icon from '../images/icon.png'
import {
  Navbar,
} from '../components'

import {
  GetPostsQuery
} from '../../generated/graphql-types'

// markup
const IndexPage: React.FC<PageProps<GetPostsQuery>> = (props) => {
  const data = props.data
  return (
    <>
      <Helmet>
        <title>えやみぐさ</title>
        <script async src="https://cse.google.com/cse.js?cx=4b57e8a4ef2a8c489"></script>
      </Helmet>
      <Navbar />
      <section className='section'>
        <div className='container'>
          <div className='columns is-vcentered'>
            <div className='column is-narrow'>
              <img src={icon} alt="Logo image" className='image is-64x64 mr-4' />
            </div>
            <div className='column'>
              <h1 className='title is-2'>
                えやみぐさ
              </h1>
              <p className='subtitle is-5'>
                技術ノートとか
              </p>
            </div>
          </div>
          <h2 className='title is-5 mb-3'>
            Search
          </h2>
          <div className="gcse-search"></div>
          <h2 className='title is-5 mb-3'>
            Recent Notes
          </h2>
          <ul className='mt-4 mb-5'>
            {data.posts.edges.slice(0, 10).map(({ node }) => {
              const sourceInstanceName = 'sourceInstanceName' in node.parent ? node.parent.sourceInstanceName : 'pages'
              const pathPrefix = sourceInstanceName !== 'pages' ? `/${sourceInstanceName}/` : '/'
              return (
                <li key={node.id}>
                  <a href={`${pathPrefix}${node.slug}`}>
                    {node.frontmatter?.title}
                  </a>
                  {' '}
                  <small>
                    ({dayjs(node.frontmatter?.date).format('YYYY-MM-DD')})
                  </small>
                </li>
              )
            })}
          </ul>
          <h2 className='title is-5 mb-3'>
            Category Index
          </h2>
          <div className='columns is-multiline'>
            {data.posts.categories.map((category) => (
              <div key={category.fieldValue} className='column is-one-quarter'>
                <div className='m-1'>
                  <h2 className='title is-5 my-1'>{category.fieldValue}</h2>
                  {category.edges.map(({ node }) => {
                    const sourceInstanceName = 'sourceInstanceName' in node.parent ? node.parent.sourceInstanceName : 'pages'
                    const pathPrefix = sourceInstanceName !== 'pages' ? `/${sourceInstanceName}/` : '/'
                    return (
                      <li key={node.id}>
                        <a href={`${pathPrefix}${node.slug}`}>
                          {node.frontmatter?.title}
                        </a>
                        {' '}
                        <small>
                          ({dayjs(node.frontmatter?.date).format('YYYY-MM-DD')})
                        </small>
                      </li>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const pageQuery = graphql`
  query GetPosts {
    posts: allMdx(
      filter: {
        frontmatter: {
          draft: {
            eq: false
          }
        }
      }
      sort: {
        fields: frontmatter___date
        order: DESC
      }
    ) {
      edges {
        node {
          id
          slug
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date
            updated
          }
        }
      }

      categories: group(field: frontmatter___category) {
        fieldValue
        edges {
          node {
            id
            slug
            parent {
              ... on File {
                sourceInstanceName
              }
            }
            frontmatter {
              title
              date
              updated
            }
          }
        }
      }

      tags: group(field: frontmatter___tags) {
        fieldValue
        edges {
          node {
            id
            slug
            parent {
              ... on File {
                sourceInstanceName
              }
            }
            frontmatter {
              title
              date
              updated
            }
          }
        }
      }
    }
  }
`

export default IndexPage
