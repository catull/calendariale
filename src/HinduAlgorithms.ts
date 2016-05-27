import { angle, binarySearch, mod, next, precession, sinDeg, solarLongitude } from './Astro';
import { hindu, MEAN_SIDEREAL_YEAR } from './Const';

  /**
   * Return elapsed days (Ahargana) to date date since Hindu epoch (KY).
   * @param {float} jdn moment in time
   * @return {float} Hindu day count
   */
  function hinduDayCount (jdn: number) : number {
    return jdn - hindu.EPOCH;
  }

  /**
   * Return sidereal solar longitude at moment tee.
   * @param {float} tee moment in time
   * @return {float} longitude
   */
  function siderealSolarLongitude (tee: number) : number {
    return mod (solarLongitude (tee) - precession (tee) +
        hindu.SIDEREAL_START, 360);
  }

  /**
   * Return the astronomical Hindu solar year KY at given moment tee.
   * @param {float} tee moment in time
   * @return {int} solar year
   */
  function hinduAstroCalendarYear (tee: number) : number {
    return Math.round ((tee - hindu.EPOCH_RD) / MEAN_SIDEREAL_YEAR -
            siderealSolarLongitude (tee) / 360);
  }

  /**
   * Return the sidereal zodiacal sign of the sun in range [ 1 .. 12 ], at moment tee.
   * @param {float} tee moment in time
   * @return {int} zodiacal
   */
  function siderealZodiac (tee: number) : number {
    return Math.floor (siderealSolarLongitude (tee) / 30) + 1;
  }

  /**
   * Return the value for entry in the Hindu sine table.
   * entry is an angle given as a multiplier of 225'.
   * @param {float} entry a multipicant
   * @return {float} sine entry
   */
  function hinduSineTable (entry) {
    const exact = 3438 * sinDeg (entry * angle (0, 225, 0));
    const error = 0.215 * Math.sign (exact) * Math.sign (Math.abs (exact) - 1716);

    return Math.round (exact + error) / 3438;
  }

  /**
   * Return the linear interpolation for angle theta in Hindu table.
   * @param {float} theta angle
   * @return {float} interpolated value
   */
  function hinduSine (theta) {
    const entry    = theta / angle (0, 225, 0);
    const fraction = mod (entry, 1);

    return fraction * hinduSineTable (Math.ceil (entry)) +
            (1 - fraction) * hinduSineTable (Math.floor (entry));
  }

  /**
   * Return the inverse of Hindu sine function of amp.
   * @param {float} amp sine value
   * @return {float} inverse value
   */
  function hinduArcsin (amp) {
    if (amp < 0) {
      return -hinduArcsin (-amp);
    }

    const pos = next (0, function (index) {
      return amp <= hinduSineTable (index);
    });
    const below = hinduSineTable (pos - 1);

    return angle (0, 225, 0) *
                (pos - 1 + (amp - below) / (hinduSineTable (pos) - below));
  }

  /**
   * Return the position in degrees at moment tee in uniform circular orbit of period days.
   * @param {float} tee moment in time
   * @param {float} period time span, such as tropical year
   * @return {float} position in degrees
   */
  function hinduMeanPosition (tee, period) {
    return 360 * mod ((tee - hindu.CREATION) / period, 1);
  }

  /**
   * Return the longitudinal position at moment tee.
   * @param {float} tee moment in time
   * @param {float} period the period of mean motion in days
   * @param {float} size ratio of radii of epicycle and deferent
   * @param {float} anomalistic the period of retrograde revolution about epicycle
   * @param {float} change maximum decrease in epicycle size
   * @return {float} position at tee
   */
  function hinduTruePosition (tee, period, size, anomalistic, change) {
    const lambda      = hinduMeanPosition (tee, period);
    const offset      = hinduSine (hinduMeanPosition (tee, anomalistic));
    const contraction = Math.abs (offset) * change * size;
    const equation    = hinduArcsin (offset * (size - contraction));

    return mod (lambda - equation, 360);
  }

  /**
   * Return the solar longitude at moment tee.
   * @param {float} tee moment in time
   * @return {float} solar longitude
   */
  function hinduSolarLongitude (tee) {
    return hinduTruePosition (tee, hindu.SIDEREAL_YEAR, 14 / 360,
        hindu.ANOMALISTIC_YEAR, 1 / 42);
  }

  /**
   * Return the Hindu tropical longitude on fixed date.
   * Assumes precession with maximum of 27 degrees and period of 7200 sidereal
   * years (= 1577917828 / 600 days).
   * @param {float} jdn moment in time
   * @return {float} tropical longitude at jdn
   */
  function hinduTropicalLongitude (jdn) {
    const days       = Math.floor (jdn - hindu.EPOCH_RD);
    const precession = 27 - Math.abs (54 - mod (27 + 108 * 600 / 1577917828 * days, 108));

    return mod (hinduSolarLongitude (jdn) - precession, 360);
  }

   /**
    * Return the difference between right and oblique ascension of sun on date at location.
    * @param {float} jdn moment in time
    * @param {location} location geo-location
    * @return {float} difference
    */
  function hinduAscensionalDifference (jdn, location) {
    const sinDelta  = 1397 / 3438 * hinduSine (hinduTropicalLongitude (jdn));
    const phi       = location[0];
    const diurnal   = hinduSine (90 + hinduArcsin (sinDelta));
    const tanPhi    = hinduSine (phi) / hinduSine (90 + phi);
    const earthSine = sinDelta * tanPhi;

    return hinduArcsin (-earthSine / diurnal);
  }

  /**
   * Return the tabulated speed of rising of current zodiacal sign on date.
   * @param {float} jdn moment in time
   * @return {float} speed
   */
  function hinduRisingSign (jdn) {
    const index = mod (Math.floor (hinduTropicalLongitude (jdn) / 30), 6);

    return [ 1670, 1795, 1935, 1935, 1795, 1670 ][index] / 1800;
  }

  /**
   * Return the sidereal daily motion of sun on date.
   * @param {float} jdn moment in time
   * @return {float} daily motion
   */
  function hinduDailyMotion (jdn) {
    const motion   = 360 / hindu.SIDEREAL_YEAR;
    const anomaly  = hinduMeanPosition (jdn, hindu.ANOMALISTIC_YEAR);
    const epicycle = 14 / 360 - Math.abs (hinduSine (anomaly)) / 1080;
    const entry    = Math.floor (anomaly / angle (0, 225, 0));
    const step     = hinduSineTable (entry + 1) - hinduSineTable (entry);
    const factor   = -3438 / 225 * step * epicycle;

    return motion * (factor + 1);
  }

  /**
   * Return the time from true to mean midnight of date.
   * @param {float} jdn moment in time
   * @return {float} time
   */
  function hinduEquationOfTime (jdn) {
    const offset = hinduSine (hinduMeanPosition (jdn, hindu.ANOMALISTIC_YEAR));
    const equationSun = offset * angle (57, 18, 0) * (14 / 360 - Math.abs (offset) / 1080);

    return hinduDailyMotion (jdn) / 360 * equationSun / 360 * hindu.SIDEREAL_YEAR;
  }

  /**
   * Return the difference between solar and sidereal day on date.
   * @param {float} jdn moment in time
   * @return {float} difference
   */
  function hinduSolarSiderealDifference (jdn) {
    return hinduDailyMotion (jdn) * hinduRisingSign (jdn);
  }

  /**
   * Return the sunrise at Hindu location on date.
   * @param {float} jdn moment in time
   * @return {float} time
   */
  function hinduSunrise (jdn) {
    return jdn + 0.25 - hinduEquationOfTime (jdn) + 1577917828 / 1582237828 / 360 *
               (hinduAscensionalDifference (jdn, hindu.UJJAIN_LOCATION) +
                hinduSolarSiderealDifference (jdn) / 4);
  }

  /**
   * Return the zodiacal sign of the sun in the range [ 1 .. 12 ] at moment tee.
   * @param {float} tee moment in time
   * @return {int} zodiac
   */
  function hinduZodiac (tee) {
    return Math.floor (hinduSolarLongitude (tee) / 30) + 1;
  }

  /**
   * Return the lunar longitude at moment tee.
   * @param {float} tee moment in time
   * @return {float} longitude
   */
  function hinduLunarLongitude (tee) {
    return hinduTruePosition (tee, hindu.SIDEREAL_MONTH, 32 / 360,
        hindu.ANOMALISTIC_MONTH, 1 / 96);
  }

  /**
   * Return the longitudinal distance between the sun and moon at moment tee
   * @param {float} tee moment in time
   * @return {float} distance
   */
  function hinduLunarPhase (tee) {
    return mod (hinduLunarLongitude (tee) - hinduSolarLongitude (tee), 360);
  }

  /**
   * Return the phase of moon (tithi) at moment tee in the range [ 1 .. 30 ]
   * @param {float} tee moment in time
   * @return {int} day in the Hindu lunar cycle
   */
  function hinduLunarDayFromMoment (tee) {
    return Math.floor (hinduLunarPhase (tee) / 12) + 1;
  }

  /**
   * Return the solar year at moment tee.
   * @param {float} tee moment in time
   * @return {int} solar year
   */
  function hinduCalendarYear (tee) {
    return Math.round ((tee - hindu.EPOCH_RD) / hindu.SIDEREAL_YEAR -
                 hinduSolarLongitude (tee) / 360);
  }

  /**
   * Return the approximate moment of last new moon preceding moment tee,
   * close enough to determine zodiacal sign.
   * @param {float} tee moment in time
   * @return {float} moment of new moon
   */
  function hinduNewMoonBefore (tee) {
    const eps = 7.888609052210118e-31;
    const tau = tee - hinduLunarPhase (tee) * hindu.SYNODIC_MONTH / 360;

    return binarySearch (tau - 1, Math.min (tee, tau + 1),
        function (lower, upper) {
          return hinduZodiac (lower) === hinduZodiac (upper) || upper - lower < eps;
        },
        function (x0) {
          return hinduLunarPhase (x0) < 180;
        });
  }

export {
  hinduArcsin,
  hinduAscensionalDifference,
  hinduAstroCalendarYear,
  hinduCalendarYear,
  hinduDailyMotion,
  hinduDayCount,
  hinduEquationOfTime,
  hinduLunarDayFromMoment,
  hinduLunarLongitude,
  hinduLunarPhase,
  hinduMeanPosition,
  hinduNewMoonBefore,
  hinduRisingSign,
  hinduSine,
  hinduSineTable,
  hinduSolarLongitude,
  hinduSolarSiderealDifference,
  hinduSunrise,
  hinduTropicalLongitude,
  hinduTruePosition,
  hinduZodiac,
  siderealSolarLongitude,
  siderealZodiac
}
