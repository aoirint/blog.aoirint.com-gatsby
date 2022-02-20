import { GatsbyConfig } from 'gatsby'
import fs from 'fs'
import dayjs from 'dayjs'

import { ChannelInfos } from './src/data'

const commonFeedNodeSerialzier = (site, node) => {
  const parent = node.parent
  const sourceInstanceName = 'sourceInstanceName' in parent ? parent.sourceInstanceName : 'pages'
  const pathPrefix = sourceInstanceName !== 'pages' ? `/${sourceInstanceName}/` : '/'

  return Object.assign({}, node.frontmatter, {
    description: node.excerpt,
    date: node.frontmatter.date,
    url: site.siteMetadata.siteUrl + pathPrefix + node.slug,
    guid: site.siteMetadata.siteUrl + pathPrefix + node.slug,
    custom_elements: [
      {
        "content:encoded": node.html,
      },
      node.frontmatter.updated ? {
        "atom:updated": dayjs(node.frontmatter.updated).toString(),
      } : {},
    ],
  })
}

const commonFeedNodeFilter = (site, node) => {
  const parent = node.parent
  const sourceInstanceName = 'sourceInstanceName' in parent ? parent.sourceInstanceName : 'pages'
  return sourceInstanceName === 'entry'
}

const globalFeed = {
  serialize: ({ query: { site, allMdx} }) => (
    allMdx.nodes
      .filter(node => commonFeedNodeFilter(site, node))
      .map(node => commonFeedNodeSerialzier(site, node))
  ),
  query: `
    {
      allMdx(
        filter: {fields: {draft: {eq: false}}}
        sort: { order: DESC, fields: [frontmatter___lastModified] }
        limit: 10
      ) {
        nodes {
          excerpt
          html
          slug
          frontmatter {
            title
            date
            updated
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
        }
      }
    }
  `,
  output: "/rss.xml",
  title: "えやみぐさ RSS Feed",
}

const channelFeeds = ChannelInfos.map((channelInfo) => ({
  serialize: ({ query: { site, allMdx} }) => (
    allMdx.nodes
      .filter(node => commonFeedNodeFilter(site, node))
      .filter(node => node.frontmatter.channel === channelInfo.key)
      .map(node => commonFeedNodeSerialzier(site, node))
  ),
  query: `
    {
      allMdx(
        filter: {fields: {draft: {eq: false}}}
        sort: { order: DESC, fields: [frontmatter___lastModified] }
        limit: 10
      ) {
        nodes {
          excerpt
          html
          slug
          frontmatter {
            channel
            title
            date
            updated
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
        }
      }
    }
  `,
  output: `/channel/${channelInfo.key}/rss.xml`,
  title: `えやみぐさ ${channelInfo.key} RSS Feed`,
  description: channelInfo.description,
}))

const contentsPlugin = fs.existsSync('./contents/') ? [
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "entry",
      path: "./contents/",
    },
    __key: "entry",
  }
] : []

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: "https://blog.aoirint.com",
    title: "Eyamigusa",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: 'えやみぐさ',
        short_name: 'えやみぐさ',
        start_url: '/',
        background_color: '#9079ad',
        theme_color: '#9079ad',
        display: 'standalone',
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        // defaultLayouts: {
        //   default: require.resolve("./src/components/MdxLayout.tsx"),
        // },
        extensions: [
          '.mdx',
          '.md',
        ],
        gatsbyRemarkPlugins: [
          "gatsby-remark-autolink-headers",
          // "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 650,
            },
          },
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "entry",
        path: "./src/entry/",
      },
      __key: "entry",
    },
    ...contentsPlugin,
    {
      resolve: 'gatsby-plugin-draft',
      options: {
        nodeType: 'Mdx',
        timezone: 'Asia/Tokyo',
        publishDraft: process.env.NODE_ENV !== 'production',
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-157155944-5",
        head: true,
      },
    },
    // workaround: fail to auto reload if enabled
    ...(process.env.NODE_ENV !== 'production' ? (
      [
      ]
    ) : (
      [
        "gatsby-plugin-twitter",
      ]
    )),
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: "generated/graphql-types.ts",
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          globalFeed,
          ...channelFeeds,
        ],
      },
    },
  ],
}

export default config
