import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import useGetRouteId from '../hooks/useGetRouteId';
import EffortList from '../components/Effort/EffortList';
import backendAgents from '../agents/backendAgents';

const Activity = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = useState({});
  const [efforts, setEfforts] = useState([]);

  const { id } = useGetRouteId(location.pathname);

  useEffect(() => {
    setIsLoading(true);
    backendAgents.getActivity(id).then(activity => {
      setActivity(activity, 0);
      setIsLoading(false);
    });

    backendAgents.getSegmentEffortsByActivity(id).then(efforts => {
      setEfforts(efforts);
      setIsLoading(false);
    });
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <EffortList isLoading={isLoading} activity={activity} efforts={efforts} />
    </Layout>
  );
};

export default Activity;
