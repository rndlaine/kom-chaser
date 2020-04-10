import React, { useContext, useEffect, useState } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import stravaAgents from '../agents/stravaAgents';

const IndexPage = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    stravaAgents.getProfile().then(profile => setProfile(profile));
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      Mon Profil
      {Object.keys(profile).map(key => (
        <p>
          {key}: {profile[key]}
        </p>
      ))}
    </Layout>
  );
};

export default IndexPage;
