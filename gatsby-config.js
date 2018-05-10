module.exports = {
  siteMetadata: {
    title: `Sektor909`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-emotion',
    // {
    //   resolve: `gatsby-source-strapi`,
    //   options: {
    //     apiURL: `http://localhost:1337`,
    //     contentTypes: [
    //       // List of the Content Types you want to be able to request from Gatsby.
    //       `blog`,
    //       `user`,
    //       `programa`,
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `config/typography.js`,
      },
    },
  ],
}
