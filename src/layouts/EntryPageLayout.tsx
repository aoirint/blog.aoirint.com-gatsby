import React from 'react'
import Helmet from 'react-helmet'
import '../styles/main.scss'

// import Prism from 'prismjs'
// import 'prismjs/plugins/custom-class/prism-custom-class'
// Prism.plugins.customClass.prefix('prism--')
// Prism.plugins.customClass.map({
//   number: 'prism--number',
// })

import '../components/PrismCustom'
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

import icon from '../images/icon.png'
import Ogp from '../components/Ogp'

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
    <ul className='menu-list' data-label='tableOfContents'>
      {items?.map((item, index) => (
        <li key={index} data-label='tableOfContentsItem'>
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

const EntryPageLayout: React.FC<PageProps<GetMdxQuery>> = ({
  data,
  ...props
}) => {
  const mdx = data.mdx
  const frontmatter = mdx.frontmatter
  const rawBody = mdx.body
  const tableOfContents = mdx.tableOfContents

  const date = frontmatter?.date != null ? dayjs(frontmatter?.date).format('YYYY-MM-DD') : ''
  const updated = frontmatter?.updated != null ? dayjs(frontmatter?.updated).format('YYYY-MM-DD') : ''

  return (
    <>
      <Helmet>
        <title>{frontmatter.title} · えやみぐさ</title>
      </Helmet>
      <Ogp post={mdx} />
      <Navbar />
      <div className='section'>
        <main className='container'>
          <aside data-label='meta'>
            <div className='columns m-0'>
              <div className='column m-0 p-0 is-size-7' data-label='dateString'>
                {date || updated ? (
                    <>
                      [
                      <span data-label='dateCreated'>{date}</span>
                      {date && updated ? ' / ' : ''}
                      <span data-label='dateUpdated'>{updated}</span>
                      ]
                    </>
                ) : ''}
              </div>
              <div className='column m-0 p-0 is-size-7 has-text-right'>
                <a href={`https://github.com/aoirint/blog.aoirint.com-contents/edit/main/${mdx.slug}index.md`} className='mx-1'>編集</a>
                <a href={`https://github.com/aoirint/blog.aoirint.com-contents/tree/main/${mdx.slug}index.md`} className='mx-1'>ソース</a>
                <a href={`https://github.com/aoirint/blog.aoirint.com-contents/commits/main/${mdx.slug}index.md`} className='mx-1'>履歴</a>
              </div>
            </div>
            <div className='is-size-7' data-label='tags'>
              {frontmatter?.category != null ? (
                <>
                  <Link to={`/category/${frontmatter?.category}/`} className='mr-2' data-label='category'>
                    {frontmatter?.category}
                  </Link>
                  <span className='mr-2'>
                    |
                  </span>
                </>
              ) : ''}
              {frontmatter?.tags?.map((tag) => (
                <Link key={tag} to={`/tags/${tag}/`} className='mr-2' data-label='tag'>
                  {tag}
                </Link>
              ))}
            </div>
          </aside>
          <hr className='my-2' />
          <div className='mt-2'>
            <nav className='is-hidden-desktop menu'>
              <TableOfContents
                items={tableOfContents.items}
              />
            </nav>
            <div className='is-flex-desktop mt-4'>
              <article className='content is-rest-w300-desktop' data-label='article'>
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
              </article>
              <nav className='is-hidden-touch is-w300-desktop menu'>
                <TableOfContents
                  items={tableOfContents.items}
                />
              </nav>
            </div>
          </div>
        </main>
      </div>
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
      excerpt
      tableOfContents
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
`

export default EntryPageLayout
