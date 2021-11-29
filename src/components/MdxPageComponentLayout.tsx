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
  PageProps,
} from 'gatsby'

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
          <a href={item.url}>
            {item.title}
          </a>
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

  return (
    <>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <Navbar />
      <section className='section'>
        <div className='container'>
          <div className='content'>
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
        category
        tags
      }
    }
  }
`

export default MdxPageComponentLayout
