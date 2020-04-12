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
  const [isActivityDetailsSynced, setIsActivityDetailsSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { storeHydrated: leaderboardStoreHydrated, leaderboardBySegmentId, setLeaderboard } = useContext(LeaderBoardContext);
  const { activitiesById, activitiesDetailsById, setActivities, setActivityDetails } = useContext(ActivityContext);
  const { segmentEffortsBySegmentId, setSegmentEffort } = useContext(SegmentEffortContext);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      let activities = _.values(activitiesById);

      if (_.isEmpty(activitiesById)) {
        console.log('Fetching activity summary list ');
        activities = await stravaAgents.listActivities();
        setActivities(activities);
      }

      const promises = [];
      for (var i = 0; i < activities.length; i++) {
        if (!activitiesDetailsById[activities[i].id]) {
          promises.push(stravaAgents.getActivity(activities[i].id));
        } else {
          console.log('Activity ', activities[i].id, ' already loaded');
        }
      }

      Promise.all(promises)
        .then(activityDetails => {
          for (var i = 0; i < activityDetails.length; i++) {
            console.log('Fetched activity ', activityDetails[i].id);
            setActivityDetails(activityDetails[i]);
          }
        })
        .finally(() => setIsActivityDetailsSynced(true));
    } catch (error) {
      console.error(error);
    }

    setIsSyncing(false);
  };

  useEffect(() => {
    if (isActivityDetailsSynced) {
      const activityDetails = _.values(activitiesDetailsById);

      const flattenSegmentEfforts = _.flatMap(activityDetails, details => details.segment_efforts);
      const uniqueSegmentEfforts = _.uniqBy(flattenSegmentEfforts, 'segment.id');

      for (var i = 0; i < uniqueSegmentEfforts.length; i++) {
        const segId = uniqueSegmentEfforts[i].segment.id;

        if (!leaderboardBySegmentId[segId]) {
          stravaAgents.getSegmentLeaderBoard(segId).then(leaderboard => {
            console.log('Fetched leaderboard ', leaderboard.id);
            setLeaderboard(leaderboard);
          });
        }
      }
    }
  }, [isActivityDetailsSynced]);

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
