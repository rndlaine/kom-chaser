import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import useGetRouteId from '../hooks/useGetRouteId';

const Segment = ({ location }) => {
  const { id } = useGetRouteId(location.pathname);

  return (
    <Layout>
      <SEO title="Home" />
      <span>Segment Id: {id}</span>
    </Layout>
  );
};

export default Segment;
