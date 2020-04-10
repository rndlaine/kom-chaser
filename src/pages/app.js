import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import stravaAgents from '../agents/stravaAgents';
import ActivityList from '../components/Activity/ActivityList';
import ActivityContext from '../contexts/ActivityContext';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gearsById, setGearsById] = useState({});
  const { activitiesById, setActivities } = useContext(ActivityContext);

  useEffect(() => {
    if (_.isEmpty(activitiesById)) {
      setIsLoading(true);
      stravaAgents.listActivities().then(act => {
        setActivities(act);
        setIsLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    const activities = _.values(activitiesById);

    if (activities.length > 0) {
      const activitiesWithGear = activities.filter(activity => !!activity.gear_id);
      const uniqueByGearIds = _.uniqBy(activitiesWithGear, activity => activity.gear_id);

      uniqueByGearIds.forEach(activity => stravaAgents.getEquipment(activity.gear_id).then(gear => setGearsById(gearsByIdFunc => ({ ...gearsByIdFunc, [gear.id]: gear }))));
    }
  }, [activitiesById]);

  const sortedActivities = _.orderBy(_.values(activitiesById), 'id', 'desc');

  return (
    <Layout>
      <SEO title="App" />
      <ActivityList isLoading={isLoading} activities={sortedActivities} gearsById={gearsById} />
    </Layout>
  );
};

export default IndexPage;
