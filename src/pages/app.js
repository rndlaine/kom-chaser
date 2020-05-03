import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ActivityList from '../components/Activity/ActivityList';
import backendAgents from '../agents/backendAgents';
import AthleteContext from '../contexts/AthleteContext';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { storeHydrated: athleteStoreHydrated, athlete } = useContext(AthleteContext);
  const [activities, setActivities] = useState([]);
  const [gearsById, setGearById] = useState({});

  useEffect(() => {
    if (athleteStoreHydrated && athlete.id) {
      setIsLoading(true);
      backendAgents.getActivities(athlete.id).then(activities => {
        setActivities(activities);

        const activitiesWithGear = activities.filter(activity => !!activity.gear_id);
        const uniqueByGearIds = _.uniqBy(activitiesWithGear, activity => activity.gear_id);

        uniqueByGearIds.forEach(activity => {
          backendAgents.getGear(activity.gear_id).then(gear => setGearById(state => ({ ...state, [gear.id]: gear })));
        });

        setIsLoading(false);
      });
    }
  }, [athleteStoreHydrated]);

  const sortedActivities = _.orderBy(activities, 'id', 'desc');

  return (
    <Layout>
      <SEO title="App" />
      <ActivityList isLoading={isLoading} activities={sortedActivities} gearsById={gearsById} />
    </Layout>
  );
};

export default IndexPage;
