import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import useGetRouteId from '../hooks/useGetRouteId';
import stravaAgents from '../agents/stravaAgents';
import EffortList from '../components/Effort/EffortList';
import LeaderBoardContext from '../contexts/LeaderBoardContext';
import backendAgents from '../agents/backendAgents';

const Activity = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = useState({});
  const [efforts, setEfforts] = useState([]);

  const { id } = useGetRouteId(location.pathname);
  const { storeHydrated: leaderboardStoreHydrated, leaderboardBySegmentId, setLeaderboard } = useContext(LeaderBoardContext);

  useEffect(() => {
    setIsLoading(true);
    backendAgents.getActivity(id).then(activity => {
      setActivity(_.get(activity, 0));
      setIsLoading(false);
    });

    backendAgents.getSegmentEffortsByActivity(id).then(efforts => {
      console.log('efforts: ', efforts);
      setEfforts(efforts);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(activity) && !_.isEmpty(efforts) && leaderboardStoreHydrated) {
      setIsLoading(true);

      efforts.forEach(effort => {
        if (!leaderboardBySegmentId[effort.segmentid] && leaderboardStoreHydrated) {
          stravaAgents.getSegmentLeaderBoard(effort.segmentid).then(leaderboard => setLeaderboard(effort.segmentid, leaderboard));
        }
      });

      setIsLoading(false);
    }
  }, [efforts, activity, leaderboardStoreHydrated]);

  return (
    <Layout>
      <SEO title="Home" />
      <EffortList isLoading={isLoading} activity={activity} leaderboardBySegmentId={leaderboardBySegmentId} efforts={efforts} />
    </Layout>
  );
};

export default Activity;
