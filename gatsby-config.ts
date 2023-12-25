import type { GatsbyConfig } from 'gatsby'
import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'

import { loadChannelInfoList } from './src/node_utility/ChannelInfo'

const contentsDir = 'contents'

const channelListFile = path.join(contentsDir, 'channels.yml')
const channelList = loadChannelInfoList(channelListFile)

const commonFeedNodeSerialzier = (site, node) => {
  const parent = node.parent
  const sourceInstanceName = 'sourceInstanceName' in parent ? parent.sourceInstanceName : 'pages'
  const pathPrefix = sourceInstanceName !== 'pages' ? `/${sourceInstanceName}/` : '/'

  return Object.assign({}, node.frontmatter, {
    description: node.excerpt,
    date: node.frontmatter.date,
    url: site.siteMetadata.siteUrl + pathPrefix + node.fields.slug,
    guid: site.siteMetadata.siteUrl + pathPrefix + node.fields.slug,
    custom_elements: [
      {
        'content:encoded': node.excerpt, // Gatsby 5 removed node.html: https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#v3-to-v4-breaking-changes
      },
      node.frontmatter.updated
        ? {
            'atom:updated': dayjs(node.frontmatter.updated).toString(),
          }
        : {},
    ],
  })
}

const commonFeedNodeFilter = (site, node) => {
  const parent = node.parent
  const sourceInstanceName = 'sourceInstanceName' in parent ? parent.sourceInstanceName : 'pages'
  return sourceInstanceName === 'entry'
}

const articleFeeds = {
  serialize: ({ query: { site, allMdx } }) =>
    allMdx.nodes
      .filter((node) => commonFeedNodeFilter(site, node))
      .filter(
        (node) =>
          node.frontmatter.channel === '技術ノート' || node.frontmatter.channel === 'レポート',
      )
      .map((node) => commonFeedNodeSerialzier(site, node)),
  query: `
    query GetArticleFeedPosts {
      allMdx(
        filter: {fields: {draft: {eq: false}}}
        sort: {frontmatter: {lastModified: DESC}}
        limit: 10
      ) {
        nodes {
          excerpt
          fields {
            slug
          }
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
  output: `/rss.xml`,
  title: `えやみぐさ RSS Feed`,
}

const allFeed = {
  serialize: ({ query: { site, allMdx } }) =>
    allMdx.nodes
      .filter((node) => commonFeedNodeFilter(site, node))
      .map((node) => commonFeedNodeSerialzier(site, node)),
  query: `
    query GetAllFeedPosts {
      allMdx(
        filter: {fields: {draft: {eq: false}}}
        sort: {frontmatter: {lastModified: DESC}}
        limit: 10
      ) {
        nodes {
          excerpt
          fields {
            slug
          }
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
  output: '/rss/all.xml',
  title: 'えやみぐさ All RSS Feed',
}

const channelFeeds = channelList.map((channelInfo) => ({
  serialize: ({ query: { site, allMdx } }) =>
    allMdx.nodes
      .filter((node) => commonFeedNodeFilter(site, node))
      .filter((node) => node.frontmatter.channel === channelInfo.key)
      .map((node) => commonFeedNodeSerialzier(site, node)),
  query: `
    query GetChannelFeedPosts {
      allMdx(
        filter: {fields: {draft: {eq: false}}}
        sort: {frontmatter: {lastModified: DESC}}
        limit: 10
      ) {
        nodes {
          excerpt
          fields {
            slug
          }
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

const contentsPlugin = fs.existsSync(contentsDir)
  ? [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'entry',
          path: contentsDir,
          ignore: [`**/\.*`], // ignore files starting with a dot
        },
        __key: 'entry',
      },
    ]
  : []

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: 'https://blog.aoirint.com',
    title: 'Eyamigusa',
    channelList: channelList,
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'えやみぐさ',
        short_name: 'えやみぐさ',
        start_url: '/',
        background_color: '#9079ad',
        theme_color: '#9079ad',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {},
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        // defaultLayouts: {
        //   default: require.resolve("./src/components/MdxLayout.tsx"),
        // },
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-remark-autolink-headers',
          // "gatsby-remark-relative-images",
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 650,
            },
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-katex',
            options: {
              strict: `ignore`,
            },
          },
        ],
        mdxOptions: {
          remarkPlugins: [require('remark-gfm')],
        },
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'entry',
        path: './src/entry/',
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
      __key: 'entry',
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
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-33TXF7WL2L'],
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    // workaround: fail to auto reload if enabled
    ...(process.env.NODE_ENV !== 'production' ? [] : ['gatsby-plugin-twitter']),
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
        feeds: [articleFeeds, allFeed, ...channelFeeds],
      },
    },
  ],
}

export default config
