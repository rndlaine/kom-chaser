import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import cycling from '../../images/icons/cycling.svg';

const EffortCard = ({ effort }) => {
  const date = moment(effort.start_date);
  const time = moment('2015-01-01')
    .startOf('day')
    .seconds(effort.elapsed_time)
    .format('mm:ss');

  return (
    <div className="card">
      <div className="card__stats --header">
        <span className="card__date">{date.format('YYYY/MM/DD')}</span>
        <img className="card__icon" src={cycling} />
      </div>

      <span className="card__title">{effort.name}</span>
      <hr className="card__separator" />

      <div className="card__stats">
        <span>Distance: {(effort.distance / 1000).toFixed(2)} km</span>
        <span>City: {effort.segment.city}</span>
      </div>
      <div className="card__stats">
        <span>Time: {time}</span>
        <span>Avg. power: {effort.average_watts} watts</span>
      </div>
    </div>
  );
};

EffortCard.propTypes = {
  activity: PropTypes.object,
  gear: PropTypes.object,
};

export default EffortCard;
