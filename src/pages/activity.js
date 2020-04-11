import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';

import { getKOMRating } from '../helpers/KOMRatingHelpers';
import Layout from '../components/layout';
import SEO from '../components/seo';
import useGetRouteId from '../hooks/useGetRouteId';
import stravaAgents from '../agents/stravaAgents';
import EffortList from '../components/Effort/EffortList';
import ActivityContext from '../contexts/ActivityContext';
import LeaderBoardContext from '../contexts/LeaderBoardContext';

const Activity = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useGetRouteId(location.pathname);
  const { storeHydrated: leaderboardStoreHydrated, leaderboardBySegmentId, setLeaderboard } = useContext(LeaderBoardContext);
  const { storeHydrated: activityStoreHydrated, activitiesDetailsById, setActivityDetails } = useContext(ActivityContext);

  const activity = activitiesDetailsById[id] || {};

  useEffect(() => {
    setIsLoading(true);

    if (!activitiesDetailsById[id] && activityStoreHydrated) {
      stravaAgents.getActivity(id).then(async activity => {
        setActivityDetails(activity);
        setIsLoading(false);
      });
    }
  }, [activityStoreHydrated]);

  useEffect(() => {
    if (!_.isEmpty(activity) && leaderboardStoreHydrated) {
      setIsLoading(true);

      activity.segment_efforts.forEach(effort => {
        const segmentId = effort.segment.id;

        if (!leaderboardBySegmentId[segmentId] && leaderboardStoreHydrated) {
          stravaAgents.getSegmentLeaderBoard(segmentId).then(leaderboard => setLeaderboard(segmentId, { leaderboard, komAnalysis: getKOMRating(effort, leaderboard) }));
        }
      });

      setIsLoading(false);
    }
  }, [activity, leaderboardStoreHydrated]);

  return (
    <Layout>
      <SEO title="Home" />
      <EffortList isLoading={isLoading} activity={activity} leaderboardBySegmentId={leaderboardBySegmentId} efforts={activity.segment_efforts} />
    </Layout>
  );
};

export default Activity;
