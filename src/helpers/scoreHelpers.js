const getWindKOMScore = (effort, currentWind) => {
  if (!currentWind) {
    return effort.komScore;
  }

  const factor = Math.abs(effort.direction - currentWind.deg) / 180;

  return effort.komScore * factor;
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

export { getWindKOMScore, getKOMRatings };
