import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import stravaAgents from '../agents/stravaAgents';
import ActivityList from '../components/Activity/ActivityList';
import GearContext from '../contexts/GearContext';
import backendAgents from '../agents/backendAgents';
import AthleteContext from '../contexts/AthleteContext';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { storeHydrated: athleteStoreHydrated, athlete } = useContext(AthleteContext);
  const [activities, setActivities] = useState([]);
  const { storeHydrated: gearStoreHydrated, gearsById, setGear } = useContext(GearContext);

  useEffect(() => {
    if (athleteStoreHydrated) {
      setIsLoading(true);
      backendAgents.getActivities(athlete.id).then(activities => {
        setActivities(activities);
        setIsLoading(false);
      });
    }
  }, [athleteStoreHydrated]);

  useEffect(() => {
    if (activities.length > 0 && gearStoreHydrated) {
      const activitiesWithGear = activities.filter(activity => !!activity.gear_id);
      const uniqueByGearIds = _.uniqBy(activitiesWithGear, activity => activity.gear_id);

      uniqueByGearIds.forEach(activity => {
        if (!gearsById[activity.gear_id]) {
          stravaAgents.getEquipment(activity.gear_id).then(gear => setGear(gear));
        }
      });
    }
  }, [activities, gearStoreHydrated]);

  const sortedActivities = _.orderBy(activities, 'id', 'desc');

  return (
    <Layout>
      <SEO title="App" />
      <ActivityList isLoading={isLoading} activities={sortedActivities} gearsById={gearsById} />
    </Layout>
  );
};

export default IndexPage;
