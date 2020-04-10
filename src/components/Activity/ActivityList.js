import React from 'react';
import PropTypes from 'prop-types';

import ActivityCard from './ActivityCard';

const ActivityList = ({ activities, gearsById }) => {
  const filteredActivities = activities.filter(activity => activity.type === 'Ride');

  return (
    <>
      <h1 className="label__header">My Activities</h1>

      <section className="activity-list">
        {filteredActivities.map(activity => {
          const gear = activity.gear_id ? gearsById[activity.gear_id] : null;

          return <ActivityCard key={activity.id} activity={activity} gear={gear} />;
        })}
      </section>
    </>
  );
};
ActivityCard.propTypes = {
  activities: PropTypes.array,
  gearsById: PropTypes.object,
};

export default ActivityList;
