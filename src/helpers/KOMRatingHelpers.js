import moment from 'moment';
import _ from 'lodash';

export const getFormattedDate = seconds =>
  moment('2015-01-01')
    .startOf('day')
    .seconds(seconds)
    .format('H:mm:ss');

export const getKOMRating = (effort, leaderboard) => {
  const sortedLeaderBoard = _.sortBy(leaderboard, item => item.rank);
  const komSeconds = sortedLeaderBoard[0] ? sortedLeaderBoard[0].elapsed_time : 0;

  const effortTime = getFormattedDate(effort.elapsed_time);
  const komTime = getFormattedDate(komSeconds);
  const timeToKom = getFormattedDate(effort.elapsed_time - komSeconds);
  const komScore = komSeconds / effort.elapsed_time;

  let komRating = 'D';
  let komRatingColor = 'red';
  if (komScore > 0.6 && komScore < 0.7) {
    komRating = 'C';
    komRatingColor = 'orange';
  } else if (komScore > 0.7 && komScore < 0.85) {
    komRating = 'B';
    komRatingColor = 'yellow';
  } else if (komScore > 0.85 && komScore < 1) {
    komRating = 'A';
    komRatingColor = 'green';
  }

  if (komSeconds === 0) {
    komRating = 'NA';
  }

  return { timeToKom, komTime, effortTime, komScore, komRatingColor, komRating };
};
