import moment from 'moment';

const getFormattedDate = seconds =>
  moment('2015-01-01')
    .startOf('day')
    .seconds(seconds)
    .format('mm:ss');

export const getKOMRating = (effort, leaderboard) => {
  const komSeconds = leaderboard.entries[0].elapsed_time;

  const effortTime = getFormattedDate(effort.elapsed_time);
  const komTime = getFormattedDate(komSeconds);
  const timeToKom = getFormattedDate(effort.elapsed_time - komSeconds);
  const komScore = leaderboard.entries[0].elapsed_time / effort.elapsed_time;

  let komRating = 'D';
  let komRatingColor = 'red';
  if (komScore > 0.7 && komScore < 0.8) {
    komRating = 'C';
    komRatingColor = 'orange';
  } else if (komScore > 0.8 && komScore < 0.9) {
    komRating = 'B';
    komRatingColor = 'yellow';
  } else if (komScore > 0.9 && komScore < 1) {
    komRating = 'A';
    komRatingColor = 'green';
  }

  return { timeToKom, komTime, effortTime, komScore, komRatingColor, komRating };
};
