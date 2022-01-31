const path = require("path")
const dayjs = require("dayjs")
const utc = require("dayjs/plugin/utc")
const timezone = require("dayjs/plugin/timezone")
dayjs.extend(utc)
dayjs.extend(timezone)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      posts: allMdx(
        filter: {fields: {draft: {eq: false}}}
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
          }
        }

        categories: group(field: frontmatter___category) {
          fieldValue
        }

        tags: group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  result.data.posts.edges
    .filter(({ node }) => node.parent.sourceInstanceName !== 'pages')
    .forEach(({ node }, index) => {
      const sourceInstanceName = node.parent.sourceInstanceName
      const pathPrefix = `/${sourceInstanceName}/`
      createPage({
        path: `${pathPrefix}${node.slug}`,
        component: path.resolve(`./src/components/MdxPageComponentLayout.tsx`),
        context: {
          id: node.id,
        },
      })
  })

  result.data.posts.categories.forEach(({
    fieldValue,
  }) => {
    createPage({
      path: `category/${fieldValue}`,
      component: path.resolve(`./src/components/CategorySearch.tsx`),
      context: {
        category: fieldValue,
      },
    })
  })

  result.data.posts.tags.forEach(({
    fieldValue,
  }) => {
    createPage({
      path: `tags/${fieldValue}`,
      component: path.resolve(`./src/components/TagSearch.tsx`),
      context: {
        tag: fieldValue,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MdxFrontmatter {
      date: String
      updated: String
      lastModified: String
    }
  `)
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    MdxFrontmatter: {
      date: {
        type: 'String',
        resolve: (source) => source.date ? dayjs(source.date).tz('Asia/Tokyo').toISOString() : null
      },
      updated: {
        type: 'String',
        resolve: (source) => source.updated ? dayjs(source.updated).tz('Asia/Tokyo').toISOString() : null
      },
      lastModified: {
        type: 'String',
        resolve: (source) => source.updated ? dayjs(source.updated).tz('Asia/Tokyo').toISOString() : (source.date ? dayjs(source.date).tz('Asia/Tokyo').toISOString() : null)
      }
    }
  }
  createResolvers(resolvers)
}
