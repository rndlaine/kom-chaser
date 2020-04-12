import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const EffortCard = ({ effort, timeToKom, komTime, effortTime, komRatingColor, komRating }) => {
  const formattedDate = moment(effort.start_date).format('YYYY/MM/DD');

  return (
    <Link className="card" to={`/segment/${effort.segment.id}`}>
      <div className="card__stats --header">
        <span>{formattedDate}</span>

        <div className={`card__rating --${komRatingColor}`}>
          <span className="card__rating-label">KOM Reachability Score</span>
          <span className="card__rating-value">{komRating}</span>
        </div>
      </div>

      <span className="card__title">
        <span>{effort.name}</span>
      </span>
      <hr className="card__separator" />

      <div className="card__stats">
        <span>Distance: {(effort.distance / 1000).toFixed(2)} km</span>
        <span>City: {effort.segment.city}</span>
      </div>
      <div className="card__stats">
        <span>Time: {effortTime}</span>
        <span>Avg. power: {effort.average_watts} watts</span>
      </div>
      <div className="card__stats">
        <span>KOM Time: {komTime}</span>
        <span>Time to KOM: {timeToKom}</span>
      </div>
    </Link>
  );
};

EffortCard.propTypes = {
  activity: PropTypes.object,
  gear: PropTypes.object,
  timeToKom: PropTypes.string,
  komTime: PropTypes.string,
  effortTime: PropTypes.string,
  komScore: PropTypes.number,
  komRatingColor: PropTypes.string,
};

export default EffortCard;
