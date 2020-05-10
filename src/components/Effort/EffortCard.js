import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { getKOMRatings } from '../../helpers/scoreHelpers';

const EffortCard = ({ effort, noClick }) => {
  const formattedDate = effort.start_date ? moment(effort.start_date).format('YYYY/MM/DD') : null;

  const cardWrapper = children =>
    noClick ? (
      <a className="card" href={`https://www.strava.com/segments/${effort.segmentid}?filter=overall`} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    ) : (
      <Link className="card" to={`/segment/${effort.segmentid}`}>
        {children}
      </Link>
    );

  const komScore = (effort.komScore * 100).toFixed(0);

  return cardWrapper(
    <>
      <div className="card__stats --header">
        {formattedDate && <span>{formattedDate}</span>}

        {effort.windFactor && (
          <div className="card__rating">
            <span className="card__rating-label">Current Wind Factor</span>
            <span className={`card__rating-value --${effort.windFactor.color}`}>{((effort.windFactor.factor || 0) * 100).toFixed(0)} %</span>
          </div>
        )}

        <div className="card__rating">
          <span className="card__rating-label">KOM Reachability Score</span>
          <span className={`card__rating-value --${getKOMRatings(effort.komScore)}`}>{komScore} %</span>
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
