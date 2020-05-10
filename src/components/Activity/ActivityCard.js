import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import running from '../../images/icons/running.svg';
import cycling from '../../images/icons/cycling.svg';
import { getFormattedDate } from '../../helpers/dateHelpers';

const ActivityCard = ({ activity, gear }) => {
  const date = moment(activity.start_date);

  return (
    <Link className="card" to={`/activity/${activity.id}`}>
      <div className="card__stats --header">
        <span>{date.format('YYYY/MM/DD')}</span>
        <img className="card__icon" src={activity.type === 'Run' ? running : cycling} />
      </div>

      <span className="card__title">
        <span>{activity.name}</span>
      </span>
      <hr className="card__separator" />

      {activity.average_watts && (
        <div className="card__stats">
          <span>{gear && gear.name}</span>
          <span>Avg. power: {activity.average_watts.toFixed(1)} watts</span>
        </div>
      )}

      <div className="card__stats">
        <span>Distance: {(activity.distance / 1000).toFixed(2)} km</span>
        <span>Avg. speed: {(activity.average_speed * 3.6).toFixed(1)}km/h</span>
      </div>

      <div className="card__stats">
        <span>Elevation: {activity.total_elevation_gain.toFixed(0)}m</span>
        <span>Elapsed Time: {getFormattedDate(activity.elapsed_time)}</span>
      </div>

      {!activity.average_watts && <div className="card__stats"></div>}
    </Link>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object,
  gear: PropTypes.object,
};

export default ActivityCard;
