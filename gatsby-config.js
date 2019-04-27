module.exports = {
  siteMetadata: {
    title: 'My Blog Site',
    description: 'This is my blog site.',
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
  ],
};
