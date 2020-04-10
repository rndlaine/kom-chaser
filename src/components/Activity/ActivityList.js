import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import ActivityCard from './ActivityCard';
import LoadingCard from './LoadingCard';

const ActivityList = ({ activities, gearsById, isLoading }) => {
  const filteredActivities = activities.filter(activity => activity.type === 'Ride');

  return (
    <>
      <h1 className="label__header">My Activities</h1>

      <section className="activity-list">
        {!isLoading &&
          filteredActivities.map(activity => {
            const gear = activity.gear_id ? gearsById[activity.gear_id] : null;

            return <ActivityCard key={activity.id} activity={activity} gear={gear} />;
          })}

        {isLoading && _.times(50, index => <LoadingCard key={index} />)}
      </section>
    </>
  );
};

ActivityCard.propTypes = {
  activities: PropTypes.array,
  gearsById: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default ActivityList;
