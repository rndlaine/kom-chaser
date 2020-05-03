import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import SegmentEffortList from '../components/Segment/SegmentEffortList';
import backendAgents from '../agents/backendAgents';
import AthleteContext from '../contexts/AthleteContext';

const BestSegmentEfforts = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [segmentEfforts, setSegmentEfforts] = useState([]);
  const [leaderboardBySegmentId, setLeaderboard] = useState({});
  const { storeHydrated, athlete } = useContext(AthleteContext);

  useEffect(() => {
    if (athlete && athlete.id) {
      // setIsLoading(true);

      backendAgents.getBestSegmentEffortsByUser(athlete.id).then(efforts => {
        const sliced = efforts.slice(0, 100);
        setSegmentEfforts(sliced);

        sliced.forEach(effort => {
          backendAgents.getSegmentLeaderBoard(effort.segmentid).then(leaderboard => {
            setLeaderboard(state => ({ ...state, [effort.segmentid]: leaderboard }));
            setIsLoading(false);
          });
        });
        setIsLoading(false);
      });
    }
  }, [storeHydrated]);

  return (
    <Layout>
      <SEO title="Home" />
      <SegmentEffortList title="All Segments Efforts" isLoading={isLoading} efforts={segmentEfforts} leaderboardBySegmentId={leaderboardBySegmentId} />
    </Layout>
  );
};

export default BestSegmentEfforts;
