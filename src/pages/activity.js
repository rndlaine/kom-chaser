import React, { useEffect, useState } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import useGetRouteId from '../hooks/useGetRouteId';
import stravaAgents from '../agents/stravaAgents';

const Activity = ({ location }) => {
  const [activity, setActivity] = useState({});
  const { id } = useGetRouteId(location.pathname);

  useEffect(() => {
    stravaAgents.getActivity(id).then(activity => setActivity(activity));
  }, []);

  console.log('activity: ', activity);

  return (
    <Layout>
      <SEO title="Home" />
      <p>{activity.name}</p>
      <p>SEGMENTS</p>
      <div>
        {activity.segment_efforts &&
          activity.segment_efforts.map(effort => (
            <p>
              {effort.name}: {(effort.distance / 1000).toFixed(2)} km - {effort.elapsed_time} seconds
            </p>
          ))}
      </div>
    </Layout>
  );
};

export default Activity;
