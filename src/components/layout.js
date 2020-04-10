import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './Header/header';
import '../styles/index.scss';
import stravaAgents from '../agents/stravaAgents';

const Layout = ({ children }) => {
  const [profile, setProfile] = useState({});

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const expiresAtLocal = typeof window !== 'undefined' ? localStorage.getItem('expires_at') : null;

  useEffect(() => {
    const expiresAt = typeof window !== 'undefined' ? localStorage.getItem('expires_at') : null;
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
    const currentTime = new Date().getTime() / 1000;

    if (currentTime > expiresAt) {
      stravaAgents
        .refreshToken(refreshToken)
        .then(({ expires_at, refresh_token, access_token }) => {
          typeof window !== 'undefined' && localStorage.setItem('expires_at', expires_at);
          typeof window !== 'undefined' && localStorage.setItem('refresh_token', refresh_token);
          typeof window !== 'undefined' && localStorage.setItem('access_token', access_token);
        })
        .catch(() => {
          window.location.replace(process.env.GATSBY_AUTHORIZE_URL);
        });
    } else if (!expiresAt) {
      window.location.replace(process.env.GATSBY_AUTHORIZE_URL);
    }
  });

  useEffect(() => {
    const currentTime = new Date().getTime() / 1000;
    if (currentTime < expiresAtLocal) {
      stravaAgents.getProfile().then(profile => setProfile(profile));
    }
  }, [expiresAtLocal]);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} profile={profile} />

      <main className="layout">{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
