import React from 'react'
import Helmet from 'react-helmet'
import '../styles/main.scss'

// import Prism from 'prismjs'
// import 'prismjs/plugins/custom-class/prism-custom-class'
// Prism.plugins.customClass.prefix('prism--')
// Prism.plugins.customClass.map({
//   number: 'prism--number',
// })

import Highlight, { defaultProps } from "prism-react-renderer"
import vsDark from 'prism-react-renderer/themes/vsDark'
import {
  MDXProvider,
} from '@mdx-js/react'
import {
  MDXRenderer,
  MDXRendererProps,
} from 'gatsby-plugin-mdx'
import {
  graphql,
  Link,
  PageProps,
} from 'gatsby'
import dayjs from 'dayjs'

import {
  GetMdxQuery,
} from '../../generated/graphql-types'

import {
  Navbar,
} from '../components'

const CodeBlock: React.FC<MDXRendererProps> = (props) => {
  const codeProps = props.children.props
  const codeString = codeProps.children.trim()
  const language = /language-(\w+)/.exec(codeProps.className)?.[1]
  return (
    <Highlight {...defaultProps} code={codeString} language={language} theme={vsDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

interface TableOfContentsItem {
  url: string
  title: string
  items?: TableOfContentsItem[]
}
interface TableOfContentsProps {
  items: TableOfContentsItem[]
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  items
}) => {
  return (
    <ul>
      {items?.map((item, index) => (
        <li key={index}>
          <Link to={item.url}>
            {item.title}
          </Link>
          {item.items != null ? (
            <TableOfContents
              items={item.items}
            />
          ) : ''}
        </li>
      ))}
    </ul>
  )
}

const MdxPageComponentLayout: React.FC<PageProps<GetMdxQuery>> = ({
  data,
  ...props
}) => {
  const mdx = data.mdx
  const frontmatter = mdx.frontmatter
  const rawBody = mdx.body
  const tableOfContents = mdx.tableOfContents

  const date = frontmatter?.date != null ? dayjs(frontmatter?.date).format('YYYY-MM-DD') : ''
  const updated = frontmatter?.updated != null ? dayjs(frontmatter?.updated).format('YYYY-MM-DD') : ''
  const dateString = (date !== '' || updated !== '' ? '[' : '') + date + (date !== '' && updated !== '' ? ' / ' : '') + updated + (date !== '' || updated !== '' ? ']' : '')

  const slug = mdx.slug.charAt(-1) === '/' ? mdx.slug.slice(0, -1) : mdx.slug

  return (
    <>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <Navbar />
      <section className='section'>
        <div className='container'>
          <div className='content'>
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
                <Link to={`/tags/${tag}/`} className='mr-2'>
                  {tag}
                </Link>
              ))}
            </div>
            <div className='is-size-7'>
              <a href={`https://github.com/aoirint/blog.aoirint.com-contents/edit/main/${slug}/index.md`}>編集</a>
              {' '}
              <a href={`https://github.com/aoirint/blog.aoirint.com-contents/tree/main/${slug}/index.md`}>ソース</a>
              {' '}
              <a href={`https://github.com/aoirint/blog.aoirint.com-contents/commits/main/${slug}/index.md`}>履歴</a>
            </div>
            <TableOfContents
              items={tableOfContents.items}
            />
            <MDXProvider
              components={{
                pre: CodeBlock,
              }}
            >
              <MDXRenderer
                frontmatter={frontmatter}
              >
                {rawBody}
              </MDXRenderer>
            </MDXProvider>
          </div>
        </div>
      </section>
    </>
  )
}

export const pageQuery = graphql`
  query GetMdx(
    $id: String
  ) {
    mdx(
      id: {
        eq: $id
      }
    ) {
      id
      slug
      body
      tableOfContents
      frontmatter {
        title
        date
        updated
        category
        tags
      }
    }
  }
`

export default MdxPageComponentLayout
