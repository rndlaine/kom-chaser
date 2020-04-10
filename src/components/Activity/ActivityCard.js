import React from 'react';
import PropTypes from 'prop-types';
import running from '../../images/icons/running.svg';
import cycling from '../../images/icons/cycling.svg';

const ActivityCard = ({ activity, gear }) => {
  return (
    <div className="activity-card">
      <span className="activity-card__title">{activity.name}</span>
      <span className="activity-card__date">{activity.start_date}</span>
      <div className="activity-card__stats">
        <img className="activity-card__icon" src={activity.type === 'Run' ? running : cycling} />
        <p>{gear && gear.name}</p>
        <p>{(activity.distance / 1000).toFixed(2)} km</p>
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object,
  gear: PropTypes.object,
};

export default ActivityCard;
