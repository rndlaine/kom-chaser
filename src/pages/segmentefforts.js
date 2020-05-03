import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LeaderBoardContext from '../contexts/LeaderBoardContext';
import stravaAgents from '../agents/stravaAgents';
import SegmentEffortContext from '../contexts/SegmentEffortContext';
import SegmentEffortList from '../components/Segment/SegmentEffortList';

const SegmentEfforts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { storeHydrated: leaderboardStoreHydrated, leaderboardBySegmentId, setLeaderboard } = useContext(LeaderBoardContext);
  const { segmentEffortsBySegmentId } = useContext(SegmentEffortContext);

  const segmentEfforts = _.flatten(_.values(segmentEffortsBySegmentId));

  const orderedSegmentEfforts = _.orderBy(segmentEfforts, 'elapsed_time');
  const uniqueSegmentEfforts = _.uniqBy(orderedSegmentEfforts, 'segment.id');

  useEffect(() => {
    segmentEfforts.forEach(effort => {
      if (!leaderboardBySegmentId[effort.segment.id] && leaderboardStoreHydrated) {
        setIsLoading(true);
        stravaAgents.getSegmentLeaderBoard(effort.segment.id).then(leaderboard => {
          setLeaderboard(leaderboard);
          setIsLoading(false);
        });
      }
    });
  }, [leaderboardStoreHydrated]);

  return (
    <Layout>
      <SEO title="Home" />
      <SegmentEffortList title="My Viewed Segments" isLoading={isLoading} efforts={uniqueSegmentEfforts} leaderboardBySegmentId={leaderboardBySegmentId} />
    </Layout>
  );
};

export default SegmentEfforts;
