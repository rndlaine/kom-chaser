import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const EffortCard = ({ effort, noClick }) => {
  const formattedDate = moment(effort.start_date).format('YYYY/MM/DD');

  const cardWrapper = children =>
    noClick ? (
      <div className="card --noClick">{children}</div>
    ) : (
      <Link className="card" to={`/segment/${effort.segmentid}`}>
        {children}
      </Link>
    );

  return cardWrapper(
    <>
      <div className="card__stats --header">
        <span>{formattedDate}</span>

        <div className={`card__rating --${effort.komRatingColor}`}>
          <span className="card__rating-label">KOM Reachability Score</span>
          <span className="card__rating-value">{effort.komRating}</span>
        </div>
      </div>

      <span className="card__title">
        <span>{effort.name}</span>
      </span>
      <hr className="card__separator" />

      <div className="card__stats">
        <span>Distance: {(effort.distance / 1000).toFixed(2)} km</span>
        <span>{effort.city && `City: ${effort.city}`}</span>
      </div>
      <div className="card__stats">
        <span>Time: {effort.effortTime}</span>
        <span>Avg. power: {effort.average_watts} watts</span>
      </div>
      <div className="card__stats">
        <span>KOM Time: {effort.komTime}</span>
        <span>Time to KOM: {effort.timeToKom}</span>
      </div>
    </>,
  );
};

EffortCard.propTypes = {
  activity: PropTypes.object,
  gear: PropTypes.object,
  effort: PropTypes.object,
  segment: PropTypes.object,
};

EffortCard.defaultProps = {
  activity: {},
  gear: {},
  effort: {},
  segment: {},
};

export default EffortCard;
