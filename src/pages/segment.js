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
  const [leaderboardBySegmentId, setLeaderboard] = useState({});
  const { id } = useGetRouteId(location.pathname);

  useEffect(() => {
    setIsLoading(true);

    backendAgents.getSegmentEffortsBySegment(id).then(efforts => {
      setSegmentEfforts(efforts);

      efforts.forEach(effort => {
        backendAgents.getSegmentLeaderBoard(effort.segmentid).then(leaderboard => {
          setLeaderboard(state => ({ ...state, [effort.segmentid]: leaderboard }));
          setIsLoading(false);
        });
      });
      setIsLoading(false);
    });
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <SegmentEffortList isLoading={isLoading} efforts={segmentEfforts} leaderboardBySegmentId={leaderboardBySegmentId} />
    </Layout>
  );
};

export default Segment;
