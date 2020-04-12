import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import useGetRouteId from '../hooks/useGetRouteId';
import LeaderBoardContext from '../contexts/LeaderBoardContext';
import stravaAgents from '../agents/stravaAgents';
import SegmentEffortContext from '../contexts/SegmentEffortContext';
import SegmentContext from '../contexts/SegmentContext';

const Segment = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useGetRouteId(location.pathname);

  // const { storeHydrated: leaderboardStoreHydrated, leaderboardBySegmentId, setLeaderboard } = useContext(LeaderBoardContext);
  const { storeHydrated: segmentEffortStoreHydrated, segmentEffortsBySegmentId, setSegmentEffortsBySegmentId } = useContext(SegmentEffortContext);
  const { storeHydrated: segmentStoreHydrated, segmentsById, setSegment } = useContext(SegmentContext);

  const segment = segmentsById[id] || {};
  const segmentEfforts = segmentEffortsBySegmentId[id] || [];

  useEffect(() => {
    if (!segmentsById[id] && segmentStoreHydrated) {
      stravaAgents.getSegment(id).then(segment => {
        setSegment(segment);
        setIsLoading(false);
      });
    }

    if (!segmentEffortsBySegmentId[id] && segmentStoreHydrated) {
      stravaAgents.getSegmentEfforts(id).then(efforts => {
        setSegmentEffortsBySegmentId(id, efforts);
        setIsLoading(false);
      });
    }
  }, [segmentStoreHydrated, segmentEffortStoreHydrated]);

  return (
    <Layout>
      <SEO title="Home" />
      <p>Segment Id: {segment.id}</p>
      <p>Segment Name: {segment.name}</p>
      <p>---</p>
      {segmentEfforts.map(effort => (
        <>
          <p>
            Segment Name: {effort.name} - {effort.start_date}
          </p>
        </>
      ))}
    </Layout>
  );
};

export default Segment;
