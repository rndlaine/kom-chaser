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
  const { segmentEffortsBySegmentId, setSegmentEffort } = useContext(SegmentEffortContext);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      let activities = _.values(activitiesById);
      let activityDetails = _.values(activitiesDetailsById);
      let leaderboards = _.values(leaderboardBySegmentId);

      if (_.isEmpty(activitiesById)) {
        console.log('Fetching activity summary list ');
        activities = await stravaAgents.listActivities();
        setActivities(activities);
      }

      for (var i = 0; i < activities.length; i++) {
        if (!activitiesDetailsById[activities[i].id]) {
          console.log('Fetching activity ', activities[i].id);
          setActivityDetails(await stravaAgents.getActivity(activities[i].id));
        } else {
          console.log('Activity ', activities[i].id, ' already loaded');
        }
      }

      // for (var j = 0; j < activityDetails.length; j++) {
      //   const segmentEfforts = activityDetails[j].segment_efforts;

      //   for (var k = 0; k < segmentEfforts.length; k++) {
      //     const segmentId = segmentEfforts[k].segment.id;

      //     if (!leaderboardBySegmentId[segmentId]) {
      //       console.log('Fetching Leaderboard ', segmentId);
      //       setLeaderboard(segmentId, await stravaAgents.getSegmentLeaderBoard(segmentId));
      //     } else {
      //       console.log('Leaderboard ', segmentId, ' already loaded ');
      //     }
      //   }
      // }
    } catch (error) {
      console.error(error);
    }

    console.log('Syncing done!');

    setIsSyncing(false);
  };

  const segmentEfforts = _.flatten(_.values(segmentEffortsBySegmentId));
  console.log(segmentEfforts);

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
      <SegmentEffortList isSyncing={isSyncing} onSync={handleSync} title="My Viewed Segments" isLoading={isLoading} efforts={uniqueSegmentEfforts} leaderboardBySegmentId={leaderboardBySegmentId} />
    </Layout>
  );
};

export default SegmentEfforts;
