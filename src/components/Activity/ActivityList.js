import React, { useState, useContext } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Select from 'react-select';

import ActivityCard from './ActivityCard';
import LoadingCard from './LoadingCard';
import GearContext from '../../contexts/GearContext';

const options = [
  { value: '', label: 'Date' },
  { value: 'average_watts', label: 'Average Power' },
  { value: 'average_speed', label: 'Average Speed' },
  { value: 'distance', label: 'Distance' },
  { value: 'elapsed_time', label: 'Elapsed Time' },
  { value: 'total_elevation_gain', label: 'Elevation' },
];

const ActivityList = ({ activities, isLoading }) => {
  const [sortBy, setSortBy] = useState();
  const [showVirtualRides, setShowVirtualRides] = useState(false);

  const filteredActivities = showVirtualRides ? activities : activities.filter(activity => activity.type !== 'VirtualRide');
  const sortedActivities = _.orderBy(filteredActivities, activity => activity[sortBy] || 0, 'desc');
  const { gearsById } = useContext(GearContext);

  return (
    <>
      <section className="activity-list__header">
        <h1 className="label__header">My Activities</h1>
        <div className="activity-list__filter">
          <div className="activity-list__switch" onClick={() => setShowVirtualRides(!showVirtualRides)}>
            <h1 className="label__subheader --cursor">Include Virtual Rides?</h1>
            <label class="switch" onChange={() => setShowVirtualRides(!showVirtualRides)}>
              <input checked={showVirtualRides} type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>

          <h1 className="label__subheader">Sort by</h1>
          <Select className="activity-list__select" options={options} onChange={select => setSortBy(select.value)} />
        </div>
      </section>

      <section className="activity-list">
        {!isLoading &&
          sortedActivities.map(activity => {
            const gear = _.get(gearsById, _.get(activity, 'gear_id'), null);

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
