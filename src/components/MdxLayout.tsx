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
    MDXProvider
} from '@mdx-js/react'
import {
    MDXRendererProps,
} from 'gatsby-plugin-mdx'

import {
  Navbar,
} from '../components'

const CodeBlock: React.FC<MDXRendererProps> = (props) => {
  const codeProps = props.children.props
  const codeString = codeProps.children.trim()
  const language = /language-(\w+)/.exec(codeProps.className)[1]
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

const MdxLayout: React.FC<MDXRendererProps> = (props) => {
    return (
        <>
            <Helmet>
                <title>{props.pageContext.frontmatter.title}</title>
            </Helmet>
            <Navbar />
            <section className='section'>
                <div className='container'>
                  <div className='content'>
                    <MDXProvider
                      components={{
                        pre: CodeBlock,
                      }}
                    >
                        {props.children}
                    </MDXProvider>
                  </div>
                </div>
            </section>
        </>
    )
}

export default MdxLayout
