import React from 'react'
import Helmet from 'react-helmet'
import '../styles/main.scss'

import {
    MDXProvider
} from '@mdx-js/react'
import {
    MDXRendererProps,
} from 'gatsby-plugin-mdx'

import {
  Navbar,
} from '../components'

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
