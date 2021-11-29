import React from 'react'
import Helmet from 'react-helmet'
import { graphql, PageProps } from "gatsby"

import icon from '../images/icon.png'
import {
    Navbar,
  } from '../components'

import {
    GetCategorySearchQuery
} from '../../generated/graphql-types'
import PostListItem from './PostListItem'

const CategorySearch: React.FC<PageProps<GetCategorySearchQuery>> = ({
    pageContext,
    data,
}) => {
    const category = 'category' in pageContext ? String(pageContext['category']) : ''

    return (
        <>
            <Helmet>
                <title>Category: {category} · えやみぐさ</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <Navbar />
            <section className='section'>
                <div className='container'>
                    <h2 className='title is-4 mb-4'>
                        Category: {category}
                    </h2>
                    <ul>
                        {data.posts.edges.map(({ node }) => (
                            <PostListItem post={node} />
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}

export const pageQuery = graphql`
    query GetCategorySearch(
        $category: String!
    ) {
        posts: allMdx(
            filter: {
                frontmatter: {
                    category: {
                        eq: $category
                    }
                }
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
                        category
                        tags
                    }
                }
            }
        }
    }
`

export default CategorySearch
