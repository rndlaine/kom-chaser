import React from 'react';
import PropTypes from 'prop-types';

import ActivityCard from './ActivityCard';

const ActivityList = ({ activities, gearsById }) => (
  <>
    <h1 className="activity-list__header">My Activities</h1>

    <section className="activity-list">
      {activities.map(activity => {
        const gear = activity.gear_id ? gearsById[activity.gear_id] : null;

        return <ActivityCard activity={activity} gear={gear} />;
      })}
    </section>
  </>
);

ActivityCard.propTypes = {
  activities: PropTypes.array,
  gearsById: PropTypes.object,
};

export default ActivityList;
