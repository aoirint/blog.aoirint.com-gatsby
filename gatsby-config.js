module.exports = {
  siteMetadata: {
    siteUrl: "https://blog.aoirint.com",
    title: "Eyamigusa",
  },
  plugins: [
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
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: "generated/graphql-types.ts",
      },
    },
  ],
};
