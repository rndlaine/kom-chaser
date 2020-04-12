import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import LeaderBoardContext from '../contexts/LeaderBoardContext';
import stravaAgents from '../agents/stravaAgents';
import SegmentEffortContext from '../contexts/SegmentEffortContext';
import SegmentEffortList from '../components/Segment/SegmentEffortList';
import ActivityContext from '../contexts/ActivityContext';

const SegmentEfforts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { storeHydrated: leaderboardStoreHydrated, leaderboardBySegmentId, setLeaderboard } = useContext(LeaderBoardContext);
  const { activitiesById, activitiesDetailsById, setActivities, setActivityDetails } = useContext(ActivityContext);
  const { segmentEffortsBySegmentId } = useContext(SegmentEffortContext);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      let activities = _.values(activitiesById);

      if (_.isEmpty(activitiesById)) {
        activities = await stravaAgents.listActivities();
        setActivities(activities);
      }

      const promises = [];
      for (var i = 0; i < activities.length; i++) {
        if (!activitiesDetailsById[activities[i].id]) {
          promises.push(stravaAgents.getActivity(activities[i].id));
        }
      }

      Promise.all(promises).then(activityDetails => {
        for (var i = 0; i < activityDetails.length; i++) {
          setActivityDetails(activityDetails[i]);
        }
      });
    } catch (error) {
      console.error(error);
    }

    setIsSyncing(false);
  };

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
      <SegmentEffortList
        isSyncing={isSyncing}
        onSync={handleSync}
        title="My Viewed Segments"
        isLoading={isLoading}
        efforts={uniqueSegmentEfforts}
        leaderboardBySegmentId={leaderboardBySegmentId}
      />
    </Layout>
  );
};

export default SegmentEfforts;
