import moment from 'moment';

export const getKOMRating = effort => {
  const effortTime = moment('2015-01-01')
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
  let komRatingColor = 'red';
  if (komScore > 0.7 && komScore < 0.85) {
    komRating = 'C';
    komRatingColor = 'orange';
  } else if (komScore > 0.85 && komScore < 0.95) {
    komRating = 'B';
    komRatingColor = 'yellow';
  } else if (komScore > 0.95 && komScore < 1) {
    komRating = 'A';
    komRatingColor = 'green';
  }

  return { timeToKom, komTime, effortTime, komScore, komRatingColor, komRating };
};
