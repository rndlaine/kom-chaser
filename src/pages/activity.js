import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import useGetRouteId from '../hooks/useGetRouteId';
import stravaAgents from '../agents/stravaAgents';
import EffortCard from '../components/Effort/EffortCard';
import LoadingCard from '../components/Activity/LoadingCard';

const Activity = ({ location }) => {
  const [leaderboard, setLeaderboard] = useState({});
  const [activity, setActivity] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useGetRouteId(location.pathname);

  useEffect(() => {
    stravaAgents.getActivity(id).then(async activity => {
      for (let i = 0; i < activity.segment_efforts.length; i++) {
        const leaderboard = await stravaAgents.getSegmentLeaderBoard(activity.segment_efforts[i].segment.id);
        activity.segment_efforts[i] = { ...activity.segment_efforts[i], leaderboard };
      }

      setActivity(activity);
      setIsLoading(false);
    });
  }, []);

  console.log('activity: ', activity);

  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="label__header">{activity.name || 'Activity'} - Segments</h1>
      <section className="activity-list">
        {!isLoading && activity.segment_efforts && activity.segment_efforts.map(effort => <EffortCard effort={effort} />)}
        {isLoading && _.times(50, index => <LoadingCard key={index} />)}
      </section>
    </Layout>
  );
};

export default Activity;
