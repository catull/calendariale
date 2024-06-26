import { angle, binarySearch, mod, mod3, next, precession, sinDeg, solarLongitude } from '../Astro'
import { MEAN_SIDEREAL_YEAR, hindu } from '../Const'
import type { Location } from '../Location'

/**
 * Return elapsed days (Ahargana) to date date since Hindu epoch (KY).
 * @param jdn moment in time
 * @returns Hindu day count
 */
function hinduDayCount (jdn: number): number {
  return jdn - hindu.EPOCH
}

/**
 * Return sidereal solar longitude at moment tee.
 * @param tee moment in time
 * @returns longitude
 */
function siderealSolarLongitude (tee: number): number {
  return mod(solarLongitude(tee) - precession(tee) + hindu.SIDEREAL_START, 360)
}

/**
 * Return the astronomical Hindu solar year KY at given moment tee.
 * @param tee moment in time
 * @returns solar year
 */
function hinduAstroDateYear (tee: number): number {
  return Math.round((tee - hindu.EPOCH_RD) / MEAN_SIDEREAL_YEAR - siderealSolarLongitude(tee) / 360)
}

/**
 * Return the sidereal zodiacal sign of the sun in range [ 1 .. 12 ], at moment tee.
 * @param tee moment in time
 * @returns zodiacal
 */
function siderealZodiac (tee: number): number {
  return Math.floor(siderealSolarLongitude(tee) / 30) + 1
}

/**
 * Return the value for entry in the Hindu sine table.
 * entry is an angle given as a multiplier of 225'.
 * @param entry a multipicant
 * @returns sine entry
 */
function hinduSineTable (entry: number): number {
  const exact: number = 3438 * sinDeg(entry * angle(0, 225, 0))
  const error: number = 0.215 * Math.sign(exact) * Math.sign(Math.abs(exact) - 1716)

  return Math.round(exact + error) / 3438
}

/**
 * Return the linear interpolation for angle theta in Hindu table.
 * @param theta angle
 * @returns interpolated value
 */
function hinduSine (theta: number): number {
  const entry: number = theta / angle(0, 225, 0)
  const fraction = mod(entry, 1)

  return fraction * hinduSineTable(Math.ceil(entry)) + (1 - fraction) * hinduSineTable(Math.floor(entry))
}

/**
 * Return the inverse of Hindu sine function of amp.
 * @param amp sine value
 * @returns inverse value
 */
function hinduArcsin (amp: number): number {
  if (amp < 0) {
    return -hinduArcsin(-amp)
  }

  const pos: number = next(0, (index: number): boolean => amp <= hinduSineTable(index))
  const below: number = hinduSineTable(pos - 1)

  return angle(0, 225, 0) * (pos - 1 + (amp - below) / (hinduSineTable(pos) - below))
}

/**
 * Return the position in degrees at moment tee in uniform circular orbit of period days.
 * @param tee moment in time
 * @param period time span, such as tropical year
 * @returns position in degrees
 */
function hinduMeanPosition (tee: number, period: number): number {
  return 360 * mod((tee - hindu.CREATION) / period, 1)
}

/**
 * Return the longitudinal position at moment tee.
 * @param tee moment in time
 * @param period the period of mean motion in days
 * @param size ratio of radii of epicycle and deferent
 * @param anomalistic the period of retrograde revolution about epicycle
 * @param change maximum decrease in epicycle size
 * @returns position at tee
 */
function hinduTruePosition (tee: number, period: number, size: number, anomalistic: number, change: number): number {
  const lambda: number = hinduMeanPosition(tee, period)
  const offset: number = hinduSine(hinduMeanPosition(tee, anomalistic))
  const contraction: number = Math.abs(offset) * change * size
  const equation: number = hinduArcsin(offset * (size - contraction))

  return mod(lambda - equation, 360)
}

/**
 * Return the solar longitude at moment tee.
 * @param tee moment in time
 * @returns solar longitude
 */
function hinduSolarLongitude (tee: number): number {
  return hinduTruePosition(tee, hindu.SIDEREAL_YEAR, 14 / 360, hindu.ANOMALISTIC_YEAR, 1 / 42)
}

/**
 * Return the Hindu tropical longitude on fixed date.
 * Assumes precession with maximum of 27 degrees and period of 7200 sidereal
 * years (= 1577917828 / 600 days).
 * @param jdn moment in time
 * @returns tropical longitude at jdn
 */
function hinduTropicalLongitude (jdn: number): number {
  const days: number = Math.floor(jdn - hindu.EPOCH_RD)
  const precession2: number = 27 - Math.abs(108 * mod3((600 / 1577917828) * days - 0.25, -0.5, 0.5))

  return mod(hinduSolarLongitude(jdn) - precession2, 360)
}

/**
 * Return the difference between right and oblique ascension of sun on date at location.
 * @param jdn moment in time
 * @param location geo-location
 * @returns difference
 */
function hinduAscensionalDifference (jdn: number, location: Location): number {
  const sinDelta: number = (1397 / 3438) * hinduSine(hinduTropicalLongitude(jdn))
  const phi: number = location.getLatitude()
  const diurnal: number = hinduSine(90 + hinduArcsin(sinDelta))
  const tanPhi: number = hinduSine(phi) / hinduSine(90 + phi)
  const earthSine: number = sinDelta * tanPhi

  return hinduArcsin(-earthSine / diurnal)
}

/**
 * Return the tabulated speed of rising of current zodiacal sign on date.
 * @param jdn moment in time
 * @returns speed
 */
function hinduRisingSign (jdn: number): number {
  const index: number = mod(Math.floor(hinduTropicalLongitude(jdn) / 30), 6)

  return [1670, 1795, 1935, 1935, 1795, 1670][index] / 1800
}

/**
 * Return the sidereal daily motion of sun on date.
 * @param jdn moment in time
 * @returns daily motion
 */
function hinduDailyMotion (jdn: number): number {
  const motion: number = 360 / hindu.SIDEREAL_YEAR
  const anomaly: number = hinduMeanPosition(jdn, hindu.ANOMALISTIC_YEAR)
  const epicycle: number = 14 / 360 - Math.abs(hinduSine(anomaly)) / 1080
  const entry: number = Math.floor(anomaly / angle(0, 225, 0))
  const step: number = hinduSineTable(entry + 1) - hinduSineTable(entry)
  const factor: number = (-3438 / 225) * step * epicycle

  return motion * (factor + 1)
}

/**
 * Return the time from true to mean midnight of date.
 * @param jdn moment in time
 * @returns time
 */
function hinduEquationOfTime (jdn: number): number {
  const offset: number = hinduSine(hinduMeanPosition(jdn, hindu.ANOMALISTIC_YEAR))
  const equationSun: number = offset * angle(57, 18, 0) * (14 / 360 - Math.abs(offset) / 1080)

  return (((hinduDailyMotion(jdn) / 360) * equationSun) / 360) * hindu.SIDEREAL_YEAR
}

/**
 * Return the difference between solar and sidereal day on date.
 * @param jdn moment in time
 * @returns difference
 */
function hinduSolarSiderealDifference (jdn: number): number {
  return hinduDailyMotion(jdn) * hinduRisingSign(jdn)
}

/**
 * Return the sunrise at Hindu location on date.
 * @param jdn moment in time
 * @returns time
 */
function hinduSunrise (jdn: number): number {
  return (
    jdn +
    0.25 -
    hinduEquationOfTime(jdn) +
    (1577917828 / 1582237828 / 360) *
      (hinduAscensionalDifference(jdn, hindu.LOCATION_UJJAIN) + hinduSolarSiderealDifference(jdn) / 4)
  )
}

/**
 * Return the zodiacal sign of the sun in the range [ 1 .. 12 ] at moment tee.
 * @param tee moment in time
 * @returns zodiac
 */
function hinduZodiac (tee: number): number {
  return Math.floor(hinduSolarLongitude(tee) / 30) + 1
}

/**
 * Return the lunar longitude at moment tee.
 * @param tee moment in time
 * @returns longitude
 */
function hinduLunarLongitude (tee: number): number {
  return hinduTruePosition(tee, hindu.SIDEREAL_MONTH, 32 / 360, hindu.ANOMALISTIC_MONTH, 1 / 96)
}

/**
 * Return the longitudinal distance between the sun and moon at moment tee
 * @param tee moment in time
 * @returns distance
 */
function hinduLunarPhase (tee: number): number {
  return mod(hinduLunarLongitude(tee) - hinduSolarLongitude(tee), 360)
}

/**
 * Return the phase of moon (tithi) at moment tee in the range [ 1 .. 30 ]
 * @param tee moment in time
 * @returns day in the Hindu lunar cycle
 */
function hinduLunarDayFromMoment (tee: number): number {
  return Math.floor(hinduLunarPhase(tee) / 12) + 1
}

/**
 * Return the solar year at moment tee.
 * @param tee moment in time
 * @returns solar year
 */
function hinduDateYear (tee: number): number {
  return Math.round((tee - hindu.EPOCH_RD) / hindu.SIDEREAL_YEAR - hinduSolarLongitude(tee) / 360)
}

/**
 * Return the approximate moment of last new moon preceding moment tee,
 * close enough to determine zodiacal sign.
 * @param tee moment in time
 * @returns moment of new moon
 */
function hinduNewMoonBefore (tee: number): number {
  const eps = 7.888609052210118e-31
  const tau: number = tee - (hinduLunarPhase(tee) * hindu.SYNODIC_MONTH) / 360

  return binarySearch(
    tau - 1,
    Math.min(tee, tau + 1),
    (lower: number, upper: number): boolean => hinduZodiac(lower) === hinduZodiac(upper) || upper - lower < eps,
    (lo: number, hi: number): boolean => hinduLunarPhase((lo + hi) / 2) < 180
  )
}

export {
  hinduArcsin,
  hinduAscensionalDifference,
  hinduAstroDateYear,
  hinduDateYear,
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
