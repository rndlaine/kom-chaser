import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const EffortCard = ({ effort }) => {
  const date = moment(effort.start_date);
  const time = moment('2015-01-01')
    .startOf('day')
    .seconds(effort.elapsed_time)
    .format('mm:ss');

  const komTime = moment('2015-01-01')
    .startOf('day')
    .seconds(effort.leaderboard.entries[0].elapsed_time)
    .format('mm:ss');

  const timeToKom = moment('2015-01-01')
    .startOf('day')
    .seconds(effort.elapsed_time - effort.leaderboard.entries[0].elapsed_time)
    .format('mm:ss');

  const komScore = effort.leaderboard.entries[0].elapsed_time / effort.elapsed_time;
  let komRating = 'D';
  let color = 'red';
  if (komScore > 0.7 && komScore < 0.8) {
    komRating = 'C';
    color = 'orange';
  } else if (komScore > 0.8 && komScore < 0.9) {
    komRating = 'B';
    color = 'yellow';
  } else if (komScore > 0.9 && komScore < 1) {
    komRating = 'A';
    color = 'green';
  }

  return (
    <div className="card">
      <div className="card__stats --header">
        <span>{date.format('YYYY/MM/DD')}</span>
        <div className={`card__rating --${color}`}>
          <span className="card__rating-label">{komRating}</span>
        </div>
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
      <div className="card__stats">
        <span>KOM Time: {komTime}</span>
        <span>Time to KOM: {timeToKom}</span>
      </div>
      <div className="card__stats">
        <span>KOM Score: {komScore}</span>
        <span>KOM Rating: {komRating}</span>
      </div>
    </div>
  );
};

EffortCard.propTypes = {
  activity: PropTypes.object,
  gear: PropTypes.object,
};

export default EffortCard;
