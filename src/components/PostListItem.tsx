import React from 'react'
import dayjs from 'dayjs'

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
      id,
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
        <li key={id} className='mb-2'>
          <div className=''>
            <a href={`${pathPrefix}${slug}`}>
              {frontmatter?.title}
            </a>
            <div className='is-size-7'>
              {dateString}
            </div>
            <div className='is-size-7'>
              {frontmatter?.category != null ? (
                <>
                  <a href={`/category/${frontmatter?.category}/`} className='mr-2'>
                    {frontmatter?.category}
                  </a>
                  <span className='mr-2'>
                    |
                  </span>
                </>
              ) : ''}
              {frontmatter?.tags?.map((tag) => (
                <a href={`/tags/${tag}/`} className='mr-2'>
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </li>
    )
}

export default PostListItem
