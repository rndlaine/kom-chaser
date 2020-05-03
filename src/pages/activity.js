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
  const [leaderboardBySegmentId, setLeaderboard] = useState({});
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

  useEffect(() => {
    if (!_.isEmpty(efforts)) {
      setIsLoading(true);

      efforts.forEach(effort => {
        backendAgents.getSegmentLeaderBoard(effort.segmentid).then(leaderboard => {
          setLeaderboard(state => ({ ...state, [effort.segmentid]: leaderboard }));
        });
      });

      setIsLoading(false);
    }
  }, [efforts, activity]);

  return (
    <Layout>
      <SEO title="Home" />
      <EffortList isLoading={isLoading} activity={activity} leaderboardBySegmentId={leaderboardBySegmentId} efforts={efforts} />
    </Layout>
  );
};

export default Activity;
