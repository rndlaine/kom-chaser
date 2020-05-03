import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import useGetRouteId from '../hooks/useGetRouteId';
import SegmentEffortList from '../components/Segment/SegmentEffortList';
import backendAgents from '../agents/backendAgents';

const Segment = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [segmentEfforts, setSegmentEfforts] = useState([]);
  const [segment, setSegment] = useState({});
  const { id } = useGetRouteId(location.pathname);

  useEffect(() => {
    setIsLoading(true);

    backendAgents.getSegment(id).then(item => setSegment(item));

    backendAgents.getSegmentEffortsBySegment(id).then(efforts => {
      setSegmentEfforts(efforts);
      setIsLoading(false);
    });
  }, []);

  return (
    <Layout>
      <SEO title="Segment" />
      <SegmentEffortList isLoading={isLoading} segment={segment} efforts={segmentEfforts} />
    </Layout>
  );
};

export default Segment;
