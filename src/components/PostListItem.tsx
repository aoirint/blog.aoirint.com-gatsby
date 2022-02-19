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
  channel?: string
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

  return (
    <div className='mb-2'>
      <div className=''>
        <Link to={`${pathPrefix}${slug}`} data-label='title'>
          {frontmatter?.title}
        </Link>
        {date || updated ? (
          <div className='is-size-7' data-label='dateString'>
            [
            <span data-label='dateCreated'>{date}</span>
            {date && updated ? ' / ' : ''}
            <span data-label='dateUpdated'>{updated}</span>
            ]
          </div>
        ) : ''}
        <div className='is-size-7' data-label='tags'>
          {frontmatter?.channel != null ? (
            <>
              <Link to={`/channel/${frontmatter?.channel}/`} className='mr-2' data-label='channel'>
                {frontmatter?.channel}
              </Link>
              <span className='mr-2'>
                |
              </span>
            </>
          ) : ''}
          {frontmatter?.category != null ? (
            <>
              <Link to={`/channel/${frontmatter?.channel}/category/${frontmatter?.category}/`} className='mr-2' data-label='category'>
                {frontmatter?.category}
              </Link>
              <span className='mr-2'>
                |
              </span>
            </>
          ) : ''}
          {frontmatter?.tags?.map((tag) => (
            <Link key={tag} to={`/channel/${frontmatter?.channel}/tags/${tag}/`} className='mr-2' data-label='tag'>
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostListItem
