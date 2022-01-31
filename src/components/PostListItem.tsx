import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'gatsby'

export interface Parent {
    sourceInstanceName: string
}

export interface Frontmatter {
    title: string
    date?: string
    updated?: string
    category?: string
    tags?: string[]
}

export interface Post {
  id: string
  slug?: string
  parent?: {} | Parent
  frontmatter?: Frontmatter
}

export interface PostListItemProps {
  post: Post
}

const PostListItem: React.FC<PostListItemProps> = ({
    post: {
      slug,
      parent,
      frontmatter,
    },
}) => {
    const sourceInstanceName = 'sourceInstanceName' in parent ? parent.sourceInstanceName : 'pages'
    const pathPrefix = sourceInstanceName !== 'pages' ? `/${sourceInstanceName}/` : '/'

    const date = frontmatter?.date != null ? dayjs(frontmatter?.date).format('YYYY-MM-DD') : ''
    const updated = frontmatter?.updated != null ? dayjs(frontmatter?.updated).format('YYYY-MM-DD') : ''
    const dateString = (date !== '' || updated !== '' ? '[' : '') + date + (date !== '' && updated !== '' ? ' / ' : '') + updated + (date !== '' || updated !== '' ? ']' : '')

    return (
        <div className='mb-2'>
          <div className=''>
            <Link to={`${pathPrefix}${slug}`}>
              {frontmatter?.title}
            </Link>
            <div className='is-size-7'>
              {dateString}
            </div>
            <div className='is-size-7'>
              {frontmatter?.category != null ? (
                <>
                  <Link to={`/category/${frontmatter?.category}/`} className='mr-2'>
                    {frontmatter?.category}
                  </Link>
                  <span className='mr-2'>
                    |
                  </span>
                </>
              ) : ''}
              {frontmatter?.tags?.map((tag) => (
                <Link key={tag} to={`/tags/${tag}/`} className='mr-2'>
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
    )
}

export default PostListItem
