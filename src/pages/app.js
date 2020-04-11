import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import stravaAgents from '../agents/stravaAgents';
import ActivityList from '../components/Activity/ActivityList';
import ActivityContext from '../contexts/ActivityContext';
import GearContext from '../contexts/GearContext';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { storeHydrated: activityStoreHydrated, activitiesById, setActivities } = useContext(ActivityContext);
  const { storeHydrated: gearStoreHydrated, gearsById, setGear } = useContext(GearContext);

  useEffect(() => {
    if (_.isEmpty(activitiesById) && activityStoreHydrated) {
      setIsLoading(true);
      stravaAgents.listActivities().then(act => {
        setActivities(act);
        setIsLoading(false);
      });
    }
  }, [activityStoreHydrated]);

  useEffect(() => {
    const activities = _.values(activitiesById);

    if (activities.length > 0 && gearStoreHydrated) {
      const activitiesWithGear = activities.filter(activity => !!activity.gear_id);
      const uniqueByGearIds = _.uniqBy(activitiesWithGear, activity => activity.gear_id);

      uniqueByGearIds.forEach(activity => {
        if (!gearsById[activity.gear_id]) {
          stravaAgents.getEquipment(activity.gear_id).then(gear => setGear(gear));
        }
      });
    }
  }, [activitiesById, gearStoreHydrated]);

  const sortedActivities = _.orderBy(_.values(activitiesById), 'id', 'desc');

  return (
    <Layout>
      <SEO title="App" />
      <ActivityList isLoading={isLoading} activities={sortedActivities} gearsById={gearsById} />
    </Layout>
  );
};

export default IndexPage;
