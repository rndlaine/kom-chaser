import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';

import { getKOMRating } from '../helpers/KOMRatingHelpers';
import Layout from '../components/layout';
import SEO from '../components/seo';
import useGetRouteId from '../hooks/useGetRouteId';
import stravaAgents from '../agents/stravaAgents';
import EffortCard from '../components/Effort/EffortCard';
import LoadingCard from '../components/Activity/LoadingCard';
import ActivityContext from '../contexts/ActivityContext';
import LeaderBoardContext from '../contexts/LeaderBoardContext';
import EmptyCard from '../components/Activity/EmptyCard';

const Activity = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useGetRouteId(location.pathname);
  const { leaderboardBySegmentId, setLeaderboard } = useContext(LeaderBoardContext);
  const { activitiesDetailsById, setActivityDetails } = useContext(ActivityContext);

  const activity = activitiesDetailsById[id] || {};

  useEffect(() => {
    setIsLoading(true);

    if (!activitiesDetailsById[id]) {
      stravaAgents.getActivity(id).then(async activity => {
        setActivityDetails(activity);
        setIsLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(activity)) {
      setIsLoading(true);

      for (let i = 0; i < activity.segment_efforts.length; i++) {
        const effort = activity.segment_efforts[i];
        const segmentId = effort.segment.id;

        if (!leaderboardBySegmentId[segmentId]) {
          stravaAgents.getSegmentLeaderBoard(segmentId).then(leaderboard => setLeaderboard(segmentId, leaderboard));
        }
      }

      setIsLoading(false);
    }
  }, [activity]);

  return (
    <Layout>
      <SEO title="Home" />
      <h1 className="label__header">{activity.name || 'Activity'} - Segments</h1>
      <section className="activity-list">
        {!isLoading &&
          activity.segment_efforts &&
          activity.segment_efforts.map(effort => {
            const leaderboard = leaderboardBySegmentId[effort.segment.id];

            if (leaderboard) {
              const KOMRatingObject = getKOMRating(effort, leaderboard);

              return <EffortCard key={effort.segment.id} effort={effort} {...KOMRatingObject} />;
            }

            return <LoadingCard key={effort.segment.id} />;
          })}

        {isLoading && _.times(50, index => <LoadingCard key={index} />)}
        {!isLoading && _.isEmpty(activity.segment_efforts) && <EmptyCard text="Nothing to show..." />}
      </section>
    </Layout>
  );
};

export default Activity;
