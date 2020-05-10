export function getCardinal(angle) {
  /**
   * Customize by changing the number of directions you have
   * We have 8
   */
  const degreePerDirection = 360 / 8;

  /**
   * Offset the angle by half of the degrees per direction
   * Example: in 4 direction system North (320-45) becomes (0-90)
   */
  const offsetAngle = angle + degreePerDirection / 2;

  return offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection
    ? 'N'
    : offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection
    ? 'NE'
    : offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection
    ? 'E'
    : offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection
    ? 'SE'
    : offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection
    ? 'S'
    : offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection
    ? 'SW'
    : offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection
    ? 'W'
    : 'NW';
}
