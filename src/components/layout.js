import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import '../styles/index.scss';
import stravaAgents from '../agents/stravaAgents';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  useEffect(() => {
    const expiresAt = localStorage.getItem('expires_at');
    const refreshToken = localStorage.getItem('refresh_token');
    const currentTime = new Date().getTime() / 1000;

    if (!expiresAt) {
      window.location.replace(process.env.GATSBY_AUTHORIZE_URL);
    }

    if (currentTime > expiresAt) {
      stravaAgents
        .refreshToken(refreshToken)
        .then(({ expires_at, refresh_token, access_token }) => {
          localStorage.setItem('expires_at', expires_at);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('access_token', access_token);
        })
        .catch(() => {
          window.location.replace(process.env.GATSBY_AUTHORIZE_URL);
        });
    }
  });

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
