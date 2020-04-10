import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import Layout from '../components/layout';
import SEO from '../components/seo';
import stravaAgents from '../agents/stravaAgents';
import ActivityList from '../components/Activity/ActivityList';

const IndexPage = () => {
  const [activities, setActivities] = useState([]);
  const [gearsById, setGearsById] = useState({});

  useEffect(() => {
    stravaAgents.listActivities().then(act => setActivities(act));
  }, []);

  useEffect(() => {
    if (activities.length > 0) {
      const activitiesWithGear = activities.filter(activity => !!activity.gear_id);
      const uniqueByGearIds = _.uniqBy(activitiesWithGear, activity => activity.gear_id);

      uniqueByGearIds.forEach(activity => stravaAgents.getEquipment(activity.gear_id).then(gear => setGearsById(gearsByIdFunc => ({ ...gearsByIdFunc, [gear.id]: gear }))));
    }
  }, [activities]);

  return (
    <Layout>
      <SEO title="Home" />
      <ActivityList activities={activities} gearsById={gearsById} />
    </Layout>
  );
};

export default IndexPage;
