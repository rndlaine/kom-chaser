const getWindFactor = (effort, currentWind) => {
  if (!currentWind) {
    return effort.komScore;
  }

  const factor = 1 - Math.abs(effort.direction - currentWind.deg) / 180;

  const color = factor > 0 ? 'green' : 'red';

  return { factor, color };
};

const getKOMRatings = komScore => {
  let komRatingColor = 'red';
  if (komScore > 0.6 && komScore < 0.7) {
    komRatingColor = 'orange';
  } else if (komScore > 0.7 && komScore < 0.85) {
    komRatingColor = 'yellow';
  } else if (komScore > 0.85) {
    komRatingColor = 'green';
  }

  return komRatingColor;
};

export { getWindFactor, getKOMRatings };
