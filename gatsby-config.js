module.exports = {
  siteMetadata: {
    title: `KOM Chaser`,
    description: `Chase your next (or first) KOM`,
    author: `@fredbegin11`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#fc4c02`,
        theme_color: `#fc4c02`,
        display: `minimal-ui`,
        icon: `src/images/crown.png`, // This path is relative to the root of the site.
      },
    },
  ],
};

require('dotenv').config({
  path: `.env`,
});
