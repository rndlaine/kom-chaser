import React, { useEffect, useState, useContext } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import SegmentEffortList from '../components/Segment/SegmentEffortList';
import backendAgents from '../agents/backendAgents';
import AthleteContext from '../contexts/AthleteContext';

const BestSegmentEfforts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [segmentEfforts, setSegmentEfforts] = useState([]);
  const { storeHydrated, athlete } = useContext(AthleteContext);

  useEffect(() => {
    if (athlete && athlete.id) {
      setIsLoading(true);

      backendAgents.getBestSegmentEffortsByUser(athlete.id).then(efforts => {
        setSegmentEfforts(efforts.slice(0, 100));
        setIsLoading(false);
      });
    }
  }, [storeHydrated]);

  return (
    <Layout>
      <SEO title="Home" />
      <SegmentEffortList noClick={false} title="All Segments Efforts" isLoading={isLoading} efforts={segmentEfforts} />
    </Layout>
  );
};

export default BestSegmentEfforts;
