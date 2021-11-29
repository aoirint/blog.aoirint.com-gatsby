module.exports = {
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
        icon: "src/images/icon.png",
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
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-157155944-5",
        head: true,
      },
    },
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
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.slug,
                  guid: site.siteMetadata.siteUrl + node.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    slug
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/atom.xml",
            title: "えやみぐさ's Atom Feed",
            match: "^/entry/",
          },
        ],
      },
    },
  ],
};
