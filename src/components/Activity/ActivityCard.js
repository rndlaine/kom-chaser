import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import running from '../../images/icons/running.svg';
import cycling from '../../images/icons/cycling.svg';
import { Link } from 'gatsby';

const ActivityCard = ({ activity, gear }) => {
  const date = moment(activity.start_date);

  return (
    <Link className="activity-card" to={`/activity/${activity.id}`}>
      <div className="activity-card__stats --header">
        <span className="activity-card__date">{date.format('YYYY/MM/DD')}</span>
        <img className="activity-card__icon" src={activity.type === 'Run' ? running : cycling} />
      </div>

      <span className="activity-card__title">{activity.name}</span>
      <hr className="activity-card__separator" />

      <div className="activity-card__stats">
        <span>{gear && gear.name}</span>
        <span>Elevation: {activity.total_elevation_gain.toFixed(0)}m</span>
      </div>

      <div className="activity-card__stats">
        <span>Distance: {(activity.distance / 1000).toFixed(2)} km</span>
        <span>Avg. speed: {(activity.average_speed * 3.6).toFixed(1)}km/h</span>
      </div>
    </Link>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object,
  gear: PropTypes.object,
};

export default ActivityCard;
