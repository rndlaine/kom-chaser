import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import useGetRouteId from '../hooks/useGetRouteId';
import LeaderBoardContext from '../contexts/LeaderBoardContext';
import stravaAgents from '../agents/stravaAgents';
import SegmentEffortContext from '../contexts/SegmentEffortContext';
import SegmentContext from '../contexts/SegmentContext';
import SegmentEffortList from '../components/Segment/SegmentEffortList';

const Segment = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useGetRouteId(location.pathname);

  const { storeHydrated: leaderboardStoreHydrated, leaderboardBySegmentId, setLeaderboard } = useContext(LeaderBoardContext);
  const { storeHydrated: segmentEffortStoreHydrated, segmentEffortsBySegmentId, setSegmentEffortsBySegmentId } = useContext(SegmentEffortContext);
  const { storeHydrated: segmentStoreHydrated, segmentsById, setSegment } = useContext(SegmentContext);

  const segmentEfforts = _.get(segmentEffortsBySegmentId, id, []);

  useEffect(() => {
    if (!segmentsById[id] && segmentStoreHydrated) {
      setIsLoading(true);
      stravaAgents.getSegment(id).then(segment => {
        setSegment(segment);
        setIsLoading(false);
      });
    }

    if (!segmentEffortsBySegmentId[id] && segmentStoreHydrated) {
      setIsLoading(true);
      stravaAgents.getSegmentEfforts(id).then(efforts => {
        setSegmentEffortsBySegmentId(id, efforts);
        setIsLoading(false);
      });
    }

    if (!segmentsById[id] && segmentStoreHydrated) {
      setIsLoading(true);
      stravaAgents.getSegment(id).then(segment => {
        setSegment(segment);
        setIsLoading(false);
      });
    }

    if (!leaderboardBySegmentId[id] && leaderboardStoreHydrated) {
      setIsLoading(true);
      stravaAgents.getSegmentLeaderBoard(id).then(leaderboard => {
        setLeaderboard(leaderboard);
        setIsLoading(false);
      });
    }
  }, [segmentStoreHydrated, segmentEffortStoreHydrated, leaderboardStoreHydrated]);

  return (
    <Layout>
      <SEO title="Home" />
      <SegmentEffortList isLoading={isLoading} efforts={segmentEfforts} leaderboardBySegmentId={leaderboardBySegmentId} />
    </Layout>
  );
};

export default Segment;
