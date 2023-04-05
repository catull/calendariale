import {
  J0000,
  J2000,
  JULIAN_CENTURY,
  MEAN_SYNODIC_MONTH,
  MEAN_TROPICAL_YEAR,
  Month,
  MoonPhase,
  WeekDay,
  gregorian,
} from './Const';
import type { Location } from './Location';
import { GregorianCalendar } from './calendar/GregorianCalendar';

type Matrix = number[][];

/**
 * Modulus function which works for non-integers
 * @param {float} amount dividend
 * @param {float} numerator numerator
 * @return {float} modulo value
 */
function mod(amount: number, numerator: number): number {
  return amount - numerator * Math.floor(amount / numerator);
}

/**
 * Modulus function which returns value in range [1, N] instead of [0, N-1]
 * @param {float} amount dividend
 * @param {float} numerator numerator
 * @return {float} modulo value
 */
function amod(amount: number, numerator: number): number {
  return mod(amount - 1, numerator) + 1;
}

/**
 * Modulus function which returns value in range [a, a + b]
 * @param {number} x dividend
 * @param {number} a numerator
 * @param {number} b numerator
 * @return {number} the value of x shifted into the range [a..b). Returns x if a==b.
 */
function mod3(x: number, a: number, b: number): number {
  if (a === b) {
    return x;
  }

  return a + mod(x - a, b - a);
}

/**
 * Return day of the week from a Julian day number (JDN)
 * @param {float} jdn Julian day number (JDN)
 * @return {float} day of week
 */
function jdnToWeekDay(jdn: number): WeekDay {
  return mod(jdn - J0000, 7);
}

/**
 * Return the Julian day number (JDN) of the k-day on or before a given Julian day number (JDN)
 * k=0 means Sunday, k=1 means Monday, and so on.
 * @param {WeekDay} k a wek day
 * @param {number} jdn Julian day number (JDN)
 * @return {number} resulting Julian day number (JDN)
 */
function kdayOnOrBefore(k: WeekDay, jdn: number): number {
  return jdn - jdnToWeekDay(jdn - k);
}

/**
 * Return the Julian day number (JDN) of the k-day on or after a given Julian day number (JDN)
 * k=0 means Sunday, k=1 means Monday, and so on.
 * @param {WeekDay} k a wek day
 * @param {number} jdn Julian day number (JDN)
 * @return {number} resulting Julian day number (JDN)
 */
function kdayOnOrAfter(k: WeekDay, jdn: number): number {
  return kdayOnOrBefore(k, jdn + 6);
}

/**
 * Return the Julian day number (JDN) of the k-day nearest the given Julian day number (JDN).
 * k=0 means Sunday, k=1 means Monday, and so on.
 * @param {WeekDay} k a wek day
 * @param {number} jdn Julian day number (JDN)
 * @return {number} resulting Julian day number (JDN)
 */
/*
function kdayNearest(k: WeekDay, jdn: number): number {
  return kdayOnOrBefore(k, jdn + 3);
}
*/

/**
 * Return the Julian day number (JDN) of the k-day after the given Julian day number (JDN).
 * k=0 means Sunday, k=1 means Monday, and so on.
 * @param {WeekDay} k a wek day
 * @param {number} jdn Julian day number (JDN)
 * @return {number} resulting Julian day number (JDN)
 */
function kdayAfter(k: WeekDay, jdn: number): number {
  return kdayOnOrBefore(k, jdn + 7);
}

/**
 * Return the Julian day number (JDN) of the k-day before the given Julian day number (JDN).
 * k=0 means Sunday, k=1 means Monday, and so on.
 * @param {WeekDay} k a wek day
 * @param {number} jdn Julian day number (JDN)
 * @return {number} resulting Julian day number (JDN)
 */
function kdayBefore(k: WeekDay, jdn: number): number {
  return kdayOnOrBefore(k, jdn - 1);
}

/**
 * Return the fixed date of n-th k-day after Julian day number (JDN).
 * If n > 0, return the n-th k-day on or after  jdn.
 * If n < 0, return the n-th k-day on or before jdn.
 * If n = 0, return -1.
 * A k-day of 0 means Sunday, 1 means Monday, and so on.
 * @param {WeekDay} k a wek day
 * @param {number} jdn Julian day number (JDN)
 * @return {number} resulting Julian day number (JDN)
 */
function nthKday(n: number, k: WeekDay, jdn: number): number {
  if (n === 0) {
    return -1;
  }

  if (n > 0) {
    return 7 * n + kdayBefore(k, jdn);
  }

  return 7 * n + kdayAfter(k, jdn);
}

/**
 * arc seconds to radians
 * @param {float} arcs arc seconds
 * @return {float} radians value
 */
// astor = function (arcs: number): number {
//    return arcs * Math.PI / (180.0 * 3600.0);
// };

/**
 * degrees to radians
 * @param {float} degree angle in degrees
 * @return {float} radians value
 */
function degreesToRadians(degree: number): number {
  return (degree * Math.PI) / 180.0;
}

/**
 * radians to degrees
 * @param {float} radians angle in radians
 * @return {float} degrees value
 */
function radiansToDegrees(radians: number): number {
  return (radians * 180.0) / Math.PI;
}

/**
 * angle from degrees:minutes:seconds
 * @param {float} degree angle integral portion
 * @param {float} minute angle minutes fraction
 * @param {float} second angle seconds fraction
 * @return {float} angle
 */
function angle(degree: number, minute: number, second: number): number {
  return degree + (minute + second / 60) / 60;
}

/**
 * Return a normalized angle theta to range [ 0, 360 ] degrees.
 * @param {float} theta angle in degrees
 * @return {float} normalized angle in degrees
 */
function degrees(theta: number): number {
  return mod(theta, 360);
}

/**
 * Range reduce angle in degrees
 * @param {float} alpha angle
 * @return {float} degrees
 */
// fixAngle = function (alpha: number): number {
//    return alpha - 360.0 * Math.floor (alpha / 360.0);
// };

/**
 * Range reduce angle in radians
 * @param {float} alpha angle
 * @return {float} radians
 */
// fixAngleRadians = function (alpha: number): number {
//    return alpha - 2 * Math.PI * Math.floor (alpha / (2 * Math.PI));
// };

/**
 * Sine of an angle in degrees
 * @param {float} theta angle
 * @return {float} degrees
 */
function sinDeg(theta: number): number {
  return Math.sin(degreesToRadians(theta));
}

/**
 * Cosine of an angle in degrees
 * @param {float} theta angle
 * @return {float} degrees
 */
function cosDeg(theta: number): number {
  return Math.cos(degreesToRadians(theta));
}

/**
 * Tangens of an angle in degrees
 * @param {float} theta angle
 * @return {float} degrees
 */
function tanDeg(theta: number): number {
  return Math.tan(degreesToRadians(theta));
}

/**
 * Arc-tangent of y0 / x0 in degrees
 * @param {float} y0 y-value
 * @param {float} x0 x-value
 * @return {float} arc tangent
 */
function arcTanDeg(y0: number, x0: number): number {
  if (x0 === 0 && y0 !== 0) {
    return mod(Math.sign(y0) * 90, 360);
  }

  const alpha: number = radiansToDegrees(Math.atan(y0 / x0));

  if (x0 >= 0) {
    return alpha;
  }

  return mod(alpha + 180, 360);
}

/**
 * Calculate arc sine in degrees
 * @param {float} alpha angle
 * @return {float} value
 */
function arcSinDeg(alpha: number): number {
  return radiansToDegrees(Math.asin(alpha));
}

/**
 * Calculate arc cosine in degrees
 * @param {float} alpha angle
 * @return {float} value
 */
function arcCosDeg(alpha: number): number {
  return radiansToDegrees(Math.acos(alpha));
}

/**
 * Return first integer greater or equal to initial index iter,
 * such that condition predicate holds.
 * @param {int} iter iterator
 * @param {function} predicate boolean function applied to each iter until true
 * @return {int} iterator satisfying the predicate
 */
function next(iter: number, predicate: (n: number) => boolean): number {
  return predicate(iter) ? iter : next(iter + 1, predicate);
}

/**
 * Return last integer greater or equal to initial index iter,
 * such that condition predicate holds.
 * @param {int} iter iterator
 * @param {function} predicate boolean function applied to each iter until false
 * @return {int} iterator satisfying the predicate
 */
function final(iter: number, predicate: (n: number) => boolean): number {
  return predicate(iter) ? final(iter + 1, predicate) : iter - 1;
}

/**
 * Calculate polynomial with coefficients 'a' at point x.
 * The polynomial is  a[0] + a[1] * x + a[2] * x^2 + ...a[n-1]x^(n-1)
 * @param {float} term denotes x in the formula above
 * @param {float[]} array denotes a[] in the formula above
 * @return {float} polynomial value
 */
function poly(term: number, array: number[]): number {
  const len: number = array.length;
  let result: number = array[len - 1];
  let index: number = len - 2;

  while (index >= 0) {
    result = result * term + array[index];
    index -= 1;
  }

  return result;
}

/**
 * Zip up matrix element-wise
 * @param {float[]} matrix multi-dimensional array
 * @return {float} zipped array
 */
function zip(matrix: Matrix): Matrix {
  return matrix.length === 0
    ? []
    : matrix[0].map((ignore: number, index: number): number[] => matrix.map((array: number[]): number => array[index]));
}

/**
 * Return the sum of applying the function func for indices i [ 1 .. n ]
 * running simultaneously thru columns c [ 1 .. n ].
 * Matrix matrix is of the form [ [i1 c1] [i1 c2] .. [ in cn ] ].
 * @param {float[]} matrix 2-dimensional array of floats
 * @param {function} func application function
 * @return {float} sum of products
 */
function sigma(matrix: Matrix, func: (...n: number[]) => number): number {
  return zip(matrix)
    .map((v: number[]): number => func(...v))
    .reduce((memo: number, n: number): number => memo + n, 0);
}

/**
 * Bisection search for x in [low, high] such that condition 'predicate' holds.
 * 'discriminator' determines when to go left.
 * @param {floa} low low end of the range
 * @param {float} high high end of the range
 * @param {function} predicate selection function
 * @param {function} discriminator partitioning function
 * @return {float} sorted value
 */
function binarySearch(
  low: number,
  high: number,
  predicate: (l: number, h: number) => boolean,
  discriminator: (lo: number, hi: number) => boolean,
): number {
  const x: number = (low + high) / 2;

  if (predicate(low, high)) {
    return x;
  }

  if (discriminator(low, high)) {
    return binarySearch(low, x, predicate, discriminator);
  }

  return binarySearch(x, high, predicate, discriminator);
}

/**
 * Find inverse of angular function 'f' at 'y' within interval [ low, high ].
 * Default precision is 0.00001.
 */
function invertAngular(f: (n: number) => number, y: number, low: number, high: number): number {
  return binarySearch(
    low,
    high,
    (l: number, h: number): boolean => h - l <= 1e-5,
    (lo: number, hi: number): boolean => mod(f((lo + hi) / 2) - y, 360) < 180,
  );
}

/**
 * Return fixed momentToRd
 * @param {float} tee moment in time
 * @return {int} fixed momentToRd
 */
function momentToRd(tee: number): number {
  return Math.floor(tee);
}

/**
 * Return standard time from teeRomU in universal time at location
 * @param {float} teeRomU moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */
function universalToStandard(teeRomU: number, location: Location): number {
  return teeRomU + location.getZone();
}

/**
 * Return universal time from teeRomU in standard time at location
 * @param {float} teeRomS moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */
function standardToUniversal(teeRomS: number, location: Location): number {
  return teeRomS - location.getZone();
}

/**
 * Return the difference between UT and local mean time at longitude
 * 'phi' as a fraction of a day
 * @param {float} phi geo-location
 * @return {float} fraction of a day
 */
function longitudeToZone(phi: number): number {
  return phi / 360;
}

/**
 * Return local time from teeRomU in universal time at location
 * @param {float} teeRomU moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */
function universalToLocal(teeRomU: number, location: Location): number {
  return teeRomU + longitudeToZone(location.getLongitude());
}

/**
 * Return universal time from teeEll in local time at location
 * @param {float} teeEll moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */
function localToUniversal(teeEll: number, location: Location): number {
  return teeEll - longitudeToZone(location.getLongitude());
}

/**
 * Return standard time from teeEll in local time at location
 * @param {float} teeEll moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */
function localToStandard(teeEll: number, location: Location): number {
  return universalToStandard(localToUniversal(teeEll, location), location);
}

/**
 * Return local time from teeRomS in standard time at location
 * @param {float} teeRomS moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */
// function standardToLocal (teeRomS: number, location: Location): number {
//    return universalToLocal (standardToUniversal (teeRomS, location), location);
// }

/**
 * Return Dynamical Time minus Universal Time (in days) for moment, tee.
 * Adapted from 'Astronomical Algorithms' by Jean Meeus, Willmann_Bell, Inc., 1991.
 * @param {float} tee moment in time
 * @return {float} converted time
 */
function ephemerisCorrection(tee: number): number {
  const year = GregorianCalendar.jdnToYear(Math.floor(tee + gregorian.EPOCH));

  if (year >= 1988 && year <= 2019) {
    return (year - 1933) / 86400;
  }

  const centuries: number =
    (GregorianCalendar.toJdn(year, Month.JULY, 1) - GregorianCalendar.toJdn(1900, Month.JANUARY, 1)) / JULIAN_CENTURY;

  if (year >= 1900 && year <= 1987) {
    return poly(centuries, [-0.00002, 0.000297, 0.025184, -0.181133, 0.55304, -0.861938, 0.677066, -0.212591]);
  }

  if (year >= 1800 && year <= 1899) {
    return poly(
      centuries,
      [
        -0.000009, 0.003844, 0.083563, 0.865736, 4.867575, 15.845535, 31.332267, 38.291999, 28.316289, 11.636204,
        2.043794,
      ],
    );
  }

  if (year >= 1700 && year <= 1799) {
    return poly(year - 1700, [8.118780842, -0.005092142, 0.003336121, -0.0000266484]) / 86400;
  }

  if (year >= 1620 && year <= 1699) {
    return poly(year - 1600, [196.58333, -4.0675, 0.0219167]) / 86400;
  }

  const result: number =
    0.5 + GregorianCalendar.toJdn(year, Month.JANUARY, 1) - GregorianCalendar.toJdn(1810, Month.JANUARY, 1);

  return ((result * result) / 41048480 - 15) / 86400;
}

/**
 * Return Dynamical Time at Universal moment tee
 * @param {float} tee moment in time
 * @return {float} converted time
 */
function universalToDynamical(tee: number): number {
  return tee + ephemerisCorrection(tee);
}

/**
 * Return Universal moment from Dynamical time, tee
 * @param {float} tee moment in time
 * @return {float} converted time
 */
function dynamicalToUniversal(tee: number): number {
  return tee - ephemerisCorrection(tee);
}

/**
 * Return Julian centuries since 2000 at moment tee.
 * @param {float} tee moment in time
 * @return {int} number of centuries relative to 2000-01-01
 */
function julianCenturies(tee: number): number {
  return (universalToDynamical(tee) - J2000) / JULIAN_CENTURY;
}

/**
 * Calculate the obliquity of the ecliptic for a given Julian day number (JDN).
 * This uses Laskar's tenth-degree polynomial fit (*J.
 * Laskar, **Astronomy and Astrophysics**, Vol. 157, page 68 [1986]*) which is
 * accurate to within 0.01 arc second between AD 1000 and AD 3000, and within
 * a few seconds of arc for +/-10000 years around AD 2000. If we're outside the
 * range in which this fit is valid (deep time) we simply return the J2000
 * value of the obliquity, which happens to be almost precisely the mean.
 * @param {float} jdn Julian day number (JDN)
 * @return {float} obliquity at moment jd
 */
function obliquity(jdn: number): number {
  const centuries: number = julianCenturies(jdn);

  return (
    angle(23, 26, 21.448) + poly(centuries, [0, angle(0, 0, -46.815), angle(0, 0, -0.00059), angle(0, 0, 0.001813)])
  );
}

/**
 * Compute equation of time for a given moment.
 * Return the equation of time (as fraction of day) for moment, tee.
 * Adapted from 'Astronomical Algorithms' by Jean Meeus, Willmann_Bell, Inc., 1991.
 * @param {float} tee moment in time
 * @return {float} equation of time
 */
function equationOfTime(tee: number): number {
  const centuries: number = julianCenturies(tee);
  const lambda: number = poly(centuries, [280.46645, 36000.76983, 0.0003032]);
  const anomaly: number = poly(centuries, [357.5291, 35999.0503, -0.0001559, -0.00000048]);
  const eccentricity: number = poly(centuries, [0.016708617, -0.000042037, -0.0000001236]);
  const epsilon: number = obliquity(tee);
  const y0: number = Math.pow(tanDeg(epsilon / 2), 2);
  const equation: number =
    (0.5 / Math.PI) *
    (y0 * sinDeg(2 * lambda) +
      -2 * eccentricity * sinDeg(anomaly) +
      4 * eccentricity * y0 * sinDeg(anomaly) * cosDeg(2 * lambda) +
      -0.5 * y0 * y0 * sinDeg(4 * lambda) +
      -1.25 * eccentricity * eccentricity * sinDeg(2 * anomaly));

  return Math.sign(equation) * Math.min(Math.abs(equation), 0.5);
}

/**
 * Return sundial time at local time tee at given location
 * @param {float} tee moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */
function localToApparent(tee: number, location: Location): number {
  return tee + equationOfTime(localToUniversal(tee, location));
}

/**
 * Return local time from sundial time tee at given location
 * @param {float} tee moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */
function apparentToLocal(tee: number, location: Location): number {
  return tee - equationOfTime(localToUniversal(tee, location));
}

/**
 * Return apparent time from universal time tee at given location
 * @param {float} tee moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */
function universalToApparent(tee: number, location: Location): number {
  return localToApparent(universalToLocal(tee, location), location);
}
/**
 * Return local time from sundial time tee at given location
 * @param {float} tee moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */

/**
 * Return apparent time from universal time tee at given location
 * @param {float} tee moment in time
 * @param {Location} location geographic location
 * @return {float} converted time
 */
// function apparentToUniversal(tee: number, location: Location): number {
//   return localToUniversal(apparentToLocal(tee, location), location);
// }

/**
 * Return standard time on fixed date date, of midday at given location
 * @param {float} date fixed
 * @param {Location} location geographic location
 * @return {float} converted time
 */
function midDay(date: number, location: Location): number {
  return localToStandard(apparentToLocal(date + 0.5, location), location);
}

/**
 * Convert Julian time to hour, minutes, and seconds, returned as a three-element array
 * @param {float} jdn Julian day number (JDN)
 * @return {float[]} day portion of Julian day number (JDN), as array [ hours, minutes, seconds ]
 */
/*
function jhms(jdn: number): number[] {
  // Astronomical to civil
  const j2: number = jdn + 0.5;
  const ij: number = (j2 - Math.floor(j2)) * 86400.0 + 0.5;

  return [
    Math.floor(ij / 3600),
    Math.floor(ij / 60 % 60),
    Math.floor(ij % 60)
  ];
}
*/

/**
 * Calculate day of week from rata die
 * @param {number} rataDie the rata die number
 * @return {WeekDay} week day
 */
/*
function jwday(rataDie: number): WeekDay {
  return mod(rataDie, 7);
}
*/

/**
 * Return the longitudinal nutation at moment tee
 * @param {float} tee moment in time
 * @return {float} nutation at tee
 */
function nutation(tee: number): number {
  const centuries: number = julianCenturies(tee);
  const capA: number = poly(centuries, [124.9, -1934.134, 0.002063]);
  const capB: number = poly(centuries, [201.11, 72001.5377, 0.00057]);

  return -0.004778 * sinDeg(capA) + -0.0003667 * sinDeg(capB);
}

// *Table of observed Delta T values at the beginning of
// even numbered years from 1620 through 2002.*
const DELTA_T_TAB: number[] = [
  121, 112, 103, 95, 88, 82, 77, 72, 68, 63, 60, 56, 53, 51, 48, 46, 44, 42, 40, 38, 35, 33, 31, 29, 26, 24, 22, 20, 18,
  16, 14, 12, 11, 10, 9, 8, 7, 7, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11,
  12, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 14, 13, 13.1,
  12.5, 12.2, 12, 12, 12, 12, 12, 12, 11.9, 11.6, 11, 10.2, 9.2, 8.2, 7.1, 6.2, 5.6, 5.4, 5.3, 5.4, 5.6, 5.9, 6.2, 6.5,
  6.8, 7.1, 7.3, 7.5, 7.6, 7.7, 7.3, 6.2, 5.2, 2.7, 1.4, -1.2, -2.8, -3.8, -4.8, -5.5, -5.3, -5.6, -5.7, -5.9, -6, -6.3,
  -6.5, -6.2, -4.7, -2.8, -0.1, 2.6, 5.3, 7.7, 10.4, 13.3, 16, 18.2, 20.2, 21.1, 22.4, 23.5, 23.8, 24.3, 24, 23.9, 23.9,
  23.7, 24, 24.3, 25.3, 26.2, 27.3, 28.2, 29.1, 30, 30.7, 31.4, 32.2, 33.1, 34, 35, 36.5, 38.3, 40.2, 42.2, 44.5, 46.5,
  48.5, 50.5, 52.2, 53.8, 54.9, 55.8, 56.9, 58.3, 60, 61.6, 63, 65, 66.6,
];

/**
 * Determine the difference, in seconds, between Dynamical time and Universal time.
 * @param {int} year Gregorian year
 * @return {float} time difference
 */
function deltaT(year: number): number {
  if (year >= 1620 && year <= 2000) {
    const index: number = Math.floor((year - 1620) / 2);
    // Fractional part of year
    const fraction: number = (year - 1620) / 2 - index;

    return DELTA_T_TAB[index] + (DELTA_T_TAB[index + 1] - DELTA_T_TAB[index]) * fraction;
  }

  const t: number = (year - 2000) / 100;

  if (year < 948) {
    return 2177 + 497 * t + 44.1 * t * t;
  }

  let dt: number = 102 + 102 * t + 25.3 * t * t;

  if (year > 2000 && year < 2100) {
    dt += 0.37 * (year - 2100);
  }

  return dt;
}

const JDE0_TAB_1000: Matrix = [
  [1721139.29189, 365242.1374, 0.06134, 0.00111, -0.00071],
  [1721233.25401, 365241.72562, -0.05323, 0.00907, 0.00025],
  [1721325.70455, 365242.49558, -0.11677, -0.00297, 0.00074],
  [1721414.39987, 365242.88257, -0.00769, -0.00933, -0.00006],
];

const JDE0_TAB_2000: Matrix = [
  [2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057],
  [2451716.56767, 365241.62603, 0.00325, 0.00888, -0.0003],
  [2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078],
  [2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032],
];

// *Periodic terms to obtain true time*
const EQUINOX_P_TERMS: number[] = [
  485, 324.96, 1934.136, 203, 337.23, 32964.467, 199, 342.08, 20.186, 182, 27.85, 445267.112, 156, 73.14, 45036.886,
  136, 171.52, 22518.443, 77, 222.54, 65928.934, 74, 296.72, 3034.906, 70, 243.58, 9037.513, 58, 119.81, 33718.147, 52,
  297.17, 150.678, 50, 21.02, 2281.226, 45, 247.54, 29929.562, 44, 325.15, 31555.956, 29, 60.93, 4443.417, 18, 155.12,
  67555.328, 17, 288.79, 4562.452, 16, 198.04, 62894.029, 14, 199.76, 31436.921, 12, 95.39, 14577.848, 12, 287.11,
  31931.756, 12, 320.81, 34777.259, 9, 227.73, 1222.114, 8, 15.45, 16859.074,
];

/**
 * Determine the Julian Ephemeris Day of an equinox or solstice.
 * The `which` argument selects the event to be computed:
 *
 * 0 - March equinox
 * 1 - June solstice
 * 2 - September equinox
 * 3 - December solstice
 * @param {int} year the Gregorian year
 * @param {int} which event
 * @return {float} moment in time when event occurs
 */
function equinox(year: number, which: number): number {
  let y0: number;
  let JDE0tab: Matrix;

  // Initialise terms for mean equinox and solstices. We have two sets:
  // one for years prior to 1000 and a second for subsequent years.
  if (year < 1000) {
    JDE0tab = JDE0_TAB_1000;
    y0 = year / 1000;
  } else {
    JDE0tab = JDE0_TAB_2000;
    y0 = (year - 2000) / 1000;
  }

  const JDE0: number =
    JDE0tab[which][0] +
    JDE0tab[which][1] * y0 +
    JDE0tab[which][2] * Math.pow(y0, 2) +
    JDE0tab[which][3] * Math.pow(y0, 3) +
    JDE0tab[which][4] * Math.pow(y0, 4);

  const t: number = (JDE0 - 2451545.0) / JULIAN_CENTURY;
  const w: number = 35999.373 * t - 2.47;
  const deltaL: number = 1 + 0.0334 * cosDeg(w) + 0.0007 * cosDeg(2 * w);

  // Sum the periodic terms for time t0
  let sum = 0;
  let index = 0;
  let j = 0;
  while (index < 24) {
    sum += EQUINOX_P_TERMS[j] * cosDeg(EQUINOX_P_TERMS[j + 1] + EQUINOX_P_TERMS[j + 2] * t);
    j += 3;
    index += 1;
  }

  return JDE0 + (sum * 0.00001) / deltaL;
}

/**
 * Return the aberration at moment, tee.
 * @param {float} tee moment in time
 * @return {float} aberration
 */
function aberration(tee: number): number {
  const centuries: number = julianCenturies(tee);

  return 0.0000974 * cosDeg(177.63 + 35999.01848 * centuries) - 0.005575;
}

const SOLAR_LONGITUDE_COEFFICIENTS: number[] = [
  403406, 195207, 119433, 112392, 3891, 2819, 1721, 660, 350, 334, 314, 268, 242, 234, 158, 132, 129, 114, 99, 93, 86,
  78, 72, 68, 64, 46, 38, 37, 32, 29, 28, 27, 27, 25, 24, 21, 21, 20, 18, 17, 14, 13, 13, 13, 12, 10, 10, 10, 10,
];

const SOLAR_LONGITUDE_MULTIPLIERS: number[] = [
  0.9287892, 35999.1376958, 35999.4089666, 35998.7287385, 71998.20261, 71998.4403, 36000.35726, 71997.4812, 32964.4678,
  -19.441, 445267.1117, 45036.884, 3.1008, 22518.4434, -19.9739, 65928.9345, 9038.0293, 3034.7684, 33718.148, 3034.448,
  -2280.773, 29929.992, 31556.493, 149.588, 9037.75, 107997.405, -4444.176, 151.771, 67555.316, 31556.08, -4561.54,
  107996.706, 1221.655, 62894.167, 31437.369, 14578.298, -31931.757, 34777.243, 1221.999, 62894.511, -4442.039,
  107997.909, 119.066, 16859.071, -4.578, 26895.292, -39.127, 12297.536, 90073.778,
];

const SOLAR_LONGITUDE_ADDENDS: number[] = [
  270.54861, 340.19128, 63.91854, 331.2622, 317.843, 86.631, 240.052, 310.26, 247.23, 260.87, 297.82, 343.14, 166.79,
  81.53, 3.5, 132.75, 182.95, 162.03, 29.8, 266.4, 249.2, 157.6, 257.8, 185.1, 69.9, 8.0, 197.1, 250.4, 65.3, 162.7,
  341.5, 291.6, 98.5, 146.7, 110.0, 5.2, 342.6, 230.9, 256.1, 45.3, 242.9, 115.2, 151.8, 285.3, 53.3, 126.6, 205.7,
  85.9, 146.1,
];

/**
 * Return the longitude of sun at moment 'tee'.
 * Adapted from 'Planetary Programs and Tables from -4000 to +2800'
 * by Pierre Bretagnon and Jean_Louis Simon, Willmann_Bell, Inc., 1986.
 * See also pag 166 of 'Astronomical Algorithms' by Jean Meeus, 2nd Ed 1998,
 * with corrections Jun 2005.
 * @param {float} tee moment in time
 * @return {float} solar longitude
 */
function solarLongitude(tee: number): number {
  const centuries: number = julianCenturies(tee);
  const lambda: number =
    282.7771834 +
    36000.76953744 * centuries +
    0.000005729577951308232 *
      sigma(
        [SOLAR_LONGITUDE_COEFFICIENTS, SOLAR_LONGITUDE_ADDENDS, SOLAR_LONGITUDE_MULTIPLIERS],
        (x: number, y: number, z: number): number => x * sinDeg(y + z * centuries),
      );

  return mod(lambda + aberration(tee) + nutation(tee), 360);
}

/**
 * Return approximate moment at or before tee when solar longitude
 * just exceeded lambda degrees.
 * @param {float} lambda degrees
 * @param {float} tee moment in time
 * @return {float} longitude
 */
function estimatePriorSolarLongitude(lambda: number, tee: number): number {
  const rate: number = MEAN_TROPICAL_YEAR / 360;
  const tau: number = tee - rate * mod(solarLongitude(tee) - lambda, 360);
  const capDelta: number = mod(solarLongitude(tau) - lambda + 180, 360) - 180;

  return Math.min(tee, tau - rate * capDelta);
}

/**
 * Return the precession at moment tee using 0,0 as J2000 coordinates.
 * Adapted from 'Astronomical Algorithms' by Jean Meeus, Willmann-Bell, Inc., 1991.
 * @param {float} tee moment in time
 * @return {float} precession value
 */
function precession(tee: number): number {
  const centuries: number = julianCenturies(tee);
  const eta: number = mod(poly(centuries, [0, 47.0029 / 3600, -0.03302 / 3600, 0.00006 / 3600]), 360);
  const capP: number = mod(poly(centuries, [174.876384, -869.8089 / 3600, 0.03536 / 3600]), 360);
  const p0: number = mod(poly(centuries, [0, 5029.0966 / 3600, 1.11113 / 3600, 0.000006 / 3600]), 360);
  const capA: number = cosDeg(eta) * sinDeg(capP);
  const capB: number = cosDeg(capP);
  const arg: number = arcTanDeg(capA, capB);

  return mod(p0 + capP - arg, 360);
}

/**
 * Return declination at moment UT tee of object at longitude lambda and latitude beta.
 * @param {float} tee moment in time
 * @param {float} beta latitude
 * @param {float} lambda longitude
 * @return {float} declination
 */
function declination(tee: number, beta: number, lambda: number): number {
  const eps: number = obliquity(tee);

  return arcSinDeg(sinDeg(beta) * cosDeg(eps) + cosDeg(beta) * sinDeg(eps) * sinDeg(lambda));
}

/**
 * Return right ascension at moment UT tee of object at latitude beta and longitude lambda.
 * @param {float} tee moment in time
 * @param {float} beta latitude
 * @param {float} lambda longitude
 * @return {float} declination
 */
function rightAscension(tee: number, beta: number, lambda: number): number {
  const eps: number = obliquity(tee);

  return arcTanDeg(sinDeg(lambda) * cosDeg(eps) - tanDeg(beta) * sinDeg(eps), cosDeg(lambda));
}

/**
 * Return sine of angle between position of sun at local time tee and when
 * its depression is alpha at location. Out of range when it does not occur.
 * @param {float} tee moment ini time
 * @param {Location} location geo-location
 * @param {float} alpha angle
 * @return {float} sine offset
 */
function sineOffset(tee: number, location: Location, alpha: number): number {
  const phi = location.getLatitude();
  const teePrime: number = localToUniversal(tee, location);
  const delta: number = declination(teePrime, 0, solarLongitude(teePrime));

  return tanDeg(phi) * tanDeg(delta) + sinDeg(alpha) / (cosDeg(delta) * cosDeg(phi));
}

/**
 * Return the moment in local time near tee when depression angle of sun is
 * alpha (negative if above horizon) at location; early is true when MORNING
 * event is sought and false for EVENING.
 * Returns -1 if depression angle is not reached.
 * @param {float} tee moment in time
 * @param {Location} location geo-location
 * @param {float} alpha angle
 * @param {boolean} early MORNING or EVENING
 * @return {float} moment of depression
 */
function approxMomentOfDepression(tee: number, location: Location, alpha: number, early: boolean): number {
  const ttry = sineOffset(tee, location, alpha);
  const date = momentToRd(tee);
  const alt = alpha < 0 ? date + 0.5 : early ? date : date + 1;
  const value = Math.abs(ttry) > 1 ? sineOffset(alt, location, alpha) : ttry;

  if (Math.abs(value) > 1) {
    return -1;
  }

  const offset = mod3(arcSinDeg(value) / 360, -0.5, 0.5);

  return apparentToLocal(date + (early ? 0.25 - offset : 0.75 + offset), location);
}

/**
 * Return the moment in local time near approx when depression angle of sun is
 * alpha (negative if above horizon) at location; early is true when MORNING
 * event is sought, and false for EVENING.
 * Returns -1 if depression angle is not reached.
 * @param {float} approx approximation
 * @param {Location} location geo-location
 * @param {float} alpha angle of the sun
 * @param {boolean} early MORNING or EVENING
 * @return {float} moment of depression
 */
function momentOfDepression(approx: number, location: Location, alpha: number, early: boolean): number {
  const tee: number = approxMomentOfDepression(approx, location, alpha, early);

  if (tee === -1) {
    return -1;
  }

  if (Math.abs(approx - tee) < 30 / 86400) {
    return tee;
  }

  return momentOfDepression(tee, location, alpha, early);
}

/**
 * Return standard time in morning on fixed date date at location when
 * depression angle of sun is alpha.
 * Returns -1 if there is no dawn on date.
 * @param {float} date moment in time
 * @param {Location} location geo-location
 * @param {float} alpha angle
 * @return {float} time of dawn
 */
function dawn(date: number, location: Location, alpha: number): number {
  const result: number = momentOfDepression(date + 0.25, location, alpha, true);

  if (result === -1) {
    return -1;
  }

  return localToStandard(result, location);
}

/**
 * Return standard time in evening on fixed date at location when depression
 * angle of sun is alpha.
 * Return -1 if there is no dusk on date.
 * @param {float} date moment in time
 * @param {Location} location geo-location
 * @param {float} alpha angle
 * @return {float} time of dusk
 */
function dusk(date: number, location: Location, alpha: number): number {
  const result: number = momentOfDepression(date + 0.75, location, alpha, false);

  if (result === -1) {
    return -1;
  }

  return localToStandard(result, location);
}

const eFactor: number[] = [0, 1, 0, 0, 1, 1, 2, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const solarCoeff: number[] = [0, 1, 0, 0, -1, 1, 2, 0, 0, 1, 0, 1, 1, -1, 2, 0, 3, 1, 0, 1, -1, -1, 1, 0];
const lunarCoeff: number[] = [1, 0, 2, 0, 1, 1, 0, 1, 1, 2, 3, 0, 0, 2, 1, 2, 0, 1, 2, 1, 1, 1, 3, 4];
const moonCoeff: number[] = [0, 0, 0, 2, 0, 0, 0, -2, 2, 0, 0, 2, -2, 0, 0, -2, 0, -2, 2, 2, 2, -2, 0, 0];
const sineCoeff2: number[] = [
  -0.4072, 0.17241, 0.01608, 0.01039, 0.00739, -0.00514, 0.00208, -0.00111, -0.00057, 0.00056, -0.00042, 0.00042,
  0.00038, -0.00024, -0.00007, 0.00004, 0.00004, 0.00003, 0.00003, -0.00003, 0.00003, -0.00002, -0.00002, 0.00002,
];

/**
 * Return the moment of n-th new moon after (or before) the new moon of January 11, 1.
 * Adapted from 'Astronomical Algorithms' by Jean Meeus, Willmann_Bell, Inc., 2nd ed., 1998.
 * @param {float} n0 moment in time
 * @return {float} moment of the n-th moon
 */
function nthNewMoon(n: number): number {
  const k: number = n - 24724;
  const c: number = k / 1236.85;
  const approx: number =
    J2000 + poly(c, [5.09766, MEAN_SYNODIC_MONTH * 1236.85, 0.0001437, -0.00000015, 0.00000000073]);
  const capE: number = poly(c, [1, -0.002516, -0.0000074]);
  const solarAnomaly2: number = poly(c, [2.5534, 1236.85 * 29.10535669, -0.0000014, -0.00000011]);
  const lunarAnomaly2: number = poly(c, [201.5643, 385.81693528 * 1236.85, 0.0107582, 0.00001238, -0.000000058]);
  const moonArg: number = poly(c, [160.7108, 390.67050284 * 1236.85, -0.0016118, -0.00000227, 0.000000011]);
  const capO: number = poly(c, [124.7746, -1.56375588 * 1236.85, 0.0020672, 0.00000215]);
  const correction: number =
    -0.00017 * sinDeg(capO) +
    sigma(
      [sineCoeff2, eFactor, solarCoeff, lunarCoeff, moonCoeff],
      (v: number, w: number, x: number, y: number, z: number): number =>
        v * Math.pow(capE, w) * sinDeg(x * solarAnomaly2 + y * lunarAnomaly2 + z * moonArg),
    );
  const addConst: number[] = [
    251.88, 251.83, 349.42, 84.66, 141.74, 207.14, 154.84, 34.52, 207.19, 291.34, 161.72, 239.56, 331.55,
  ];
  const addCoeff: number[] = [
    0.016321, 26.651886, 36.412478, 18.206239, 53.303771, 2.453732, 7.30686, 27.261239, 0.121824, 1.844379, 24.198154,
    25.513099, 3.592518,
  ];
  const addFactor: number[] = [
    0.000165, 0.000164, 0.000126, 0.00011, 0.000062, 0.00006, 0.000056, 0.000047, 0.000042, 0.00004, 0.000037, 0.000035,
    0.000023,
  ];
  const extra: number = 0.000325 * sinDeg(poly(c, [299.77, 132.8475848, -0.009173]));
  const additional: number = sigma(
    [addConst, addCoeff, addFactor],
    (i: number, j: number, l: number): number => l * sinDeg(i + j * k),
  );

  return dynamicalToUniversal(approx + correction + extra + additional);
}

/**
 * Return mean longitude of moon (in degrees) at moment given in Julian centuries.
 * including the constant term of the effect of the light-time (-0'.70).
 * Adapted from eq. 47.1 in 'Astronomical Algorithms' by Jean Meeus,
 * Willmann_Bell, Inc., 2nd ed. with corrections, 2005.
 * @param {float} centuries Julian centuries relative to 2000-01-01
 * @return {float} mean lunar longitude
 */
function meanLunarLongitude(centuries: number): number {
  return degrees(poly(centuries, [218.3164477, 481267.88123421, -0.0015786, 1 / 538841, -1 / 65194000]));
}

/**
 * Return elongation of moon (in degrees) at moment given in Julian centuries.
 * Adapted from eq. 47.2 in 'Astronomical Algorithms' by Jean Meeus,
 * Willmann_Bell, Inc., 2nd ed. with corrections, 2005.
 * @param {float} centuries Julian centuries relative to 2000-01-01
 * @return {float} lunar elongation
 */
function lunarElongation(centuries: number): number {
  return degrees(poly(centuries, [297.8501921, 445267.1114034, -0.0018819, 1 / 545868, -1 / 113065000]));
}

/**
 * Return mean anomaly of sun (in degrees) at moment given in Julian centuries.
 * Adapted from eq. 47.3 in 'Astronomical Algorithms' by Jean Meeus,
 * Willmann_Bell, Inc., 2nd ed. with corrections, 2005.
 * @param {float} centuries Julian centuries relative to 2000-01-01
 * @return {float} solar anomaly
 */
function solarAnomaly(centuries: number): number {
  return degrees(poly(centuries, [357.5291092, 35999.0502909, -0.0001536, 1 / 24490000]));
}

/**
 * Return mean anomaly of moon (in degrees) at moment given in Julian centuries.
 * Adapted from eq. 47.4 in 'Astronomical Algorithms' by Jean Meeus,
 * Willmann_Bell, Inc., 2nd ed. with corrections, 2005.
 * @param {float} centuries Julian centuries relative to 2000-01-01
 * @return {float} lunar anomaly
 */
function lunarAnomaly(centuries: number): number {
  return degrees(poly(centuries, [134.9633964, 477198.8675055, 0.0087414, 1 / 69699, -1 / 14712000]));
}

/**
 * Return Moon's argument of latitude (in degrees) at moment given in Julian centuries.
 * Adapted from eq. 47.5 in 'Astronomical Algorithms' by Jean Meeus,
 * Willmann_Bell, Inc., 2nd ed. with corrections, 2005.
 * @param {float} centuries Julian centuries relative to 2000-01-01
 * @return {float} moon node
 */
function moonNode(centuries: number): number {
  return degrees(poly(centuries, [93.272095, 483202.0175233, -0.0036539, -1 / 3526000, 1 / 863310000]));
}

const lunarElongationArgs = [
  0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 1, 0, 2, 0, 0, 4, 0, 4, 2, 2, 1, 1, 2, 2, 4, 2, 0, 2, 2, 1, 2, 0, 0, 2, 2, 2, 4, 0,
  3, 2, 4, 0, 2, 2, 2, 4, 0, 4, 1, 2, 0, 1, 3, 4, 2, 0, 1, 2,
];
const solarAnomalyArgs = [
  0, 0, 0, 0, 1, 0, 0, -1, 0, -1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, -2, 1, 2, -2, 0, 0,
  -1, 0, 0, 1, -1, 2, 2, 1, -1, 0, 0, -1, 0, 1, 0, 1, 0, 0, -1, 2, 1, 0,
];
const lunarAnomalyArgs = [
  1, -1, 0, 2, 0, 0, -2, -1, 1, 0, -1, 0, 1, 0, 1, 1, -1, 3, -2, -1, 0, -1, 0, 1, 2, 0, -3, -2, -1, -2, 1, 0, 2, 0, -1,
  1, 0, -1, 2, -1, 1, -2, -1, -1, -2, 0, 1, 4, 0, -2, 0, 2, 1, -2, -3, 2, 1, -1, 3,
];
const moonNodeArgs = [
  0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, -2, 2, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, -2, 2, 0,
  2, 0, 0, 0, 0, 0, 0, -2, 0, 0, 0, 0, -2, -2, 0, 0, 0, 0, 0, 0, 0,
];
const sineCoeff = [
  6288774, 1274027, 658314, 213618, -185116, -114332, 58793, 57066, 53322, 45758, -40923, -34720, -30383, 15327, -12528,
  10980, 10675, 10034, 8548, -7888, -6766, -5163, 4987, 4036, 3994, 3861, 3665, -2689, -2602, 2390, -2348, 2236, -2120,
  -2069, 2048, -1773, -1595, 1215, -1110, -892, -810, 759, -713, -700, 691, 596, 549, 537, 520, -487, -399, -381, 351,
  -340, 330, 327, -323, 299, 294,
];

/**
 * Return longitude of moon (in degrees) at moment tee.
 * Adapted from 'Astronomical Algorithms' by Jean Meeus, Willmann_Bell, Inc., 2nd ed., 1998.
 * @param {float} tee moment in time
 * @return {float} lunar longitude
 */
function lunarLongitude(tee: number): number {
  const centuries: number = julianCenturies(tee);
  const capLprime: number = meanLunarLongitude(centuries);
  const capD: number = lunarElongation(centuries);
  const capM: number = solarAnomaly(centuries);
  const capMprime: number = lunarAnomaly(centuries);
  const capF: number = moonNode(centuries);
  // see eq. 47.6 in Meeus
  const capE: number = poly(centuries, [1, -0.002516, -0.0000074]);

  const correction: number =
    sigma(
      [sineCoeff, lunarElongationArgs, solarAnomalyArgs, lunarAnomalyArgs, moonNodeArgs],
      (v: number, w: number, x: number, y: number, z: number): number =>
        v * Math.pow(capE, Math.abs(x)) * sinDeg(w * capD + x * capM + y * capMprime + z * capF),
    ) / 1000000;

  const A1: number = 119.75 + centuries * 131.849;
  const venus: number = (3958 / 1000000) * sinDeg(A1);
  const A2: number = 53.09 + centuries * 479264.29;
  const jupiter: number = (318 / 1000000) * sinDeg(A2);
  const flatEarth: number = (1962 / 1000000) * sinDeg(capLprime - capF);

  return mod(capLprime + correction + venus + jupiter + flatEarth + nutation(tee), 360);
}

const lunarElongationArgs2: number[] = [
  0, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 4, 4, 0, 4, 2, 2, 2, 2, 0, 2, 2,
  2, 2, 4, 2, 2, 0, 2, 1, 1, 0, 2, 1, 2, 0, 4, 4, 1, 4, 1, 4, 2,
];
const solarAnomalyArgs2: number[] = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, -1, -1, -1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0,
  0, 1, 1, 0, -1, -2, 0, 1, 1, 1, 1, 1, 0, -1, 1, 0, -1, 0, 0, 0, -1, -2,
];
const lunarAnomalyArgs2: number[] = [
  0, 1, 1, 0, -1, -1, 0, 2, 1, 2, 0, -2, 1, 0, -1, 0, -1, -1, -1, 0, 0, -1, 0, 1, 1, 0, 0, 3, 0, -1, 1, -2, 0, 2, 1, -2,
  3, 2, -3, -1, 0, 0, 1, 0, 1, 1, 0, 0, -2, -1, 1, -2, 2, -2, -1, 1, 1, -2, 0, 0,
];
const moonNodeArgs2: number[] = [
  1, 1, -1, -1, 1, -1, 1, 1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, 1, 3, 1, 1, 1, -1, -1, -1, 1, -1, 1, -3, 1, -3,
  -1, -1, 1, -1, 1, -1, 1, 1, 1, 1, -1, 3, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1,
];
const sineCoefficients2: number[] = [
  5128122, 280602, 277693, 173237, 55413, 46271, 32573, 17198, 9266, 8822, 8216, 4324, 4200, -3359, 2463, 2211, 2065,
  -1870, 1828, -1794, -1749, -1565, -1491, -1475, -1410, -1344, -1335, 1107, 1021, 833, 777, 671, 607, 596, 491, -451,
  439, 422, 421, -366, -351, 331, 315, 302, -283, -229, 223, 223, -220, -220, -185, 181, -177, 176, 166, -164, 132,
  -119, 115, 107,
];

/**
 * Return the latitude of moon (in degrees) at moment tee.
 * Adapted from "Astronomical Algorithms" by Jean Meeus, Willmann_Bell, Inc., 1998.
 * @param {float} tee moment in time
 * @return {float} lunar latitude
 */
function lunarLatitude(tee: number): number {
  const c: number = julianCenturies(tee);
  const capLprime: number = meanLunarLongitude(c);
  const capD: number = lunarElongation(c);
  const capM: number = solarAnomaly(c);
  const capMprime: number = lunarAnomaly(c);
  const capF: number = moonNode(c);
  const capE: number = poly(c, [1, -0.002516, -0.0000074]);
  const beta: number =
    (1 / 1000000) *
    sigma(
      [sineCoefficients2, lunarElongationArgs2, solarAnomalyArgs2, lunarAnomalyArgs2, moonNodeArgs2],
      (v: number, w: number, x: number, y: number, z: number): number =>
        v * Math.pow(capE, Math.abs(x)) * sinDeg(w * capD + x * capM + y * capMprime + z * capF),
    );

  const venus: number = (175 / 1000000) * (sinDeg(119.75 + c * 131.849 + capF) + sinDeg(119.75 + c * 131.849 - capF));
  const flatEarth: number =
    (-2235 / 1000000) * sinDeg(capLprime) +
    (127 / 1000000) * sinDeg(capLprime - capMprime) +
    (-115 / 1000000) * sinDeg(capLprime + capMprime);
  const extra: number = (382 / 1000000) * sinDeg(313.45 + c * 481266.484);

  return beta + venus + flatEarth + extra;
}

const lunarElongationArgs3 = [
  0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 1, 0, 2, 0, 0, 4, 0, 4, 2, 2, 1, 1, 2, 2, 4, 2, 0, 2, 2, 1, 2, 0, 0, 2, 2, 2, 4, 0,
  3, 2, 4, 0, 2, 2, 2, 4, 0, 4, 1, 2, 0, 1, 3, 4, 2, 0, 1, 2, 2,
];
const solarAnomalyArgs3 = [
  0, 0, 0, 0, 1, 0, 0, -1, 0, -1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, -2, 1, 2, -2, 0, 0,
  -1, 0, 0, 1, -1, 2, 2, 1, -1, 0, 0, -1, 0, 1, 0, 1, 0, 0, -1, 2, 1, 0, 0,
];
const lunarAnomalyArgs3 = [
  1, -1, 0, 2, 0, 0, -2, -1, 1, 0, -1, 0, 1, 0, 1, 1, -1, 3, -2, -1, 0, -1, 0, 1, 2, 0, -3, -2, -1, -2, 1, 0, 2, 0, -1,
  1, 0, -1, 2, -1, 1, -2, -1, -1, -2, 0, 1, 4, 0, -2, 0, 2, 1, -2, -3, 2, 1, -1, 3, -1,
];
const moonNodeArgs3 = [
  0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, -2, 2, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, -2, 2, 0,
  2, 0, 0, 0, 0, 0, 0, -2, 0, 0, 0, 0, -2, -2, 0, 0, 0, 0, 0, 0, 0, -2,
];
const cosineCoeff = [
  -20905355, -3699111, -2955968, -569925, 48888, -3149, 246158, -152138, -170733, -204586, -129620, 108743, 104755,
  10321, 0, 79661, -34782, -23210, -21636, 24208, 30824, -8379, -16675, -12831, -10445, -11650, 14403, -7003, 0, 10056,
  6322, -9884, 5751, 0, -4950, 4130, 0, -3958, 0, 3258, 2616, -1897, -2117, 2354, 0, 0, -1423, -1117, -1571, -1739, 0,
  -4421, 0, 0, 0, 0, 1165, 0, 0, 8752,
];

/**
 * Return the distance to the moon (in metres) at moment tee.
 * Adapted from "Astronomical Algorithms" by Jean Meeus, Willmann_Bell, Inc., 1998, pp. 338-342.
 * @param {number} tee moment in time
 * @return {number} lunar distance
 */
function lunarDistance(tee: number): number {
  const c = julianCenturies(tee);
  const capD = lunarElongation(c);
  const capM = solarAnomaly(c);
  const capMPrime = lunarAnomaly(c);
  const capF = moonNode(c);
  const capE = poly(c, [1, -0.002516, -0.0000074]);
  const correction = sigma(
    [cosineCoeff, lunarElongationArgs3, solarAnomalyArgs3, lunarAnomalyArgs3, moonNodeArgs3],
    (v: number, w: number, x: number, y: number, z: number): number =>
      v * Math.pow(capE, Math.abs(x)) * cosDeg(w * capD + x * capM + y * capMPrime + z * capF),
  );

  return 385000560 + correction;
}

/**
 * Return the lunar phase, as an angle in degrees, at moment tee.
 * An angle of
 *    0 means a new moon
 *   90 means the first quarter,
 *  180 means a full moon
 *  270 degrees means the last quarter
 * @param {float} tee moment in time
 * @return {float} lunar phase at tee
 */
function lunarPhase(tee: number): number {
  const phi: number = mod(lunarLongitude(tee) - solarLongitude(tee), 360);
  const t0: number = nthNewMoon(0);
  const n0: number = Math.round((tee - t0) / MEAN_SYNODIC_MONTH);
  const phi2: number = 360 * mod((tee - nthNewMoon(n0)) / MEAN_SYNODIC_MONTH, 1);

  if (Math.abs(phi - phi2) > 180) {
    return phi2;
  }

  return phi;
}

/**
 * Return the mean sidereal time of day from moment tee expressed as hour angle.
 * Adapted from "Astronomical Algorithms" by Jean Meeus, Willmann_Bell, Inc., 1991.
 */
function momentToSidereal(tee: number): number {
  const centuries: number = (tee - J2000) / JULIAN_CENTURY;

  return mod(poly(centuries, [280.46061837, JULIAN_CENTURY * 360.98564736629, 0.000387933, -1 / 38710000]), 360);
}

/**
 * Return the geocentric altitude of moon at moment tee at given location, as a
 * small positive/negative angle in degrees, ignoring parallax and refraction.
 * Adapted from 'Astronomical Algorithms' by Jean Meeus, Willmann_Bell, Inc., 1998.
 */
function lunarAltitude(tee: number, location: Location): number {
  const phi = location.getLatitude();
  const psi = location.getLongitude();
  const lambda: number = lunarLongitude(tee);
  const beta: number = lunarLatitude(tee);
  const alpha: number = rightAscension(tee, beta, lambda);
  const delta: number = declination(tee, beta, lambda);
  const theta0: number = momentToSidereal(tee);
  const capH: number = mod(theta0 + psi - alpha, 360);
  const altitude: number = arcSinDeg(sinDeg(phi) * sinDeg(delta) + cosDeg(phi) * cosDeg(delta) * cosDeg(capH));

  return mod3(altitude, -180, 180);
}

/**
 * Parallax of moon at tee at location.
 * Adapted from "Astronomical Algorithms" by Jean Meeus, Willmann-Bell, 2nd edn., 1998.
 * @param {number} tee moment in time
 * @param {Location} location Geo-location
 * @return {number} moon parallax
 */
function lunarParallax(tee: number, location: Location): number {
  const geo = lunarAltitude(tee, location);
  const capDelta = lunarDistance(tee);
  const alt = 6378140 / capDelta;
  const arg = alt * cosDeg(geo);

  return arcSinDeg(arg);
}
/**
 * Topocentric altitude of moon at tee at location, as a small positive/negative
 * angle in degrees, ignoring refraction.
 * @param {number} tee moment in time
 * @param {Location} location Geo-location
 * @return {number} topocentric lunar altitude
 */
function topocentricLunarAltitude(tee: number, location: Location): number {
  return lunarAltitude(tee, location) - lunarParallax(tee, location);
}

/**
 * Return refraction angle at given location and time.
 * @param {float} tee moment in time
 * @param {Location} location geo-location
 */
function refraction(tee: number, location: Location): number {
  const h: number = Math.max(0, location.getElevation());
  const capR = 6372000;
  const dip: number = arcCosDeg(capR / (capR + h));

  return 17 / 30 + dip + (19 * Math.sqrt(h)) / 3600;
}

/**
 * Geocentric apparent lunar diameter (in degrees) at moment tee at location.
 * Adapted from "Astronomical Algorithms" by Jean Meeus, Willmann-Bell, 2nd ed, 1998.
 * @param {number} tee moment in time
 * @param {Location} location Geo-location
 * @return {number} observed lunar altitude
 */
function observedLunarAltitude(tee: number, location: Location): number {
  return topocentricLunarAltitude(tee, location) + refraction(tee, location) + 4 / 15;
}

/**
 * Standard time of moon-set on fixed date at location.
 * Returns -1 if there is no moon-set on date.
 * @param {number} rataDie moment in time
 * @param {Location} location Geo-location
 * @return {number} time of moon-set or -1
 */
function moonSet(rataDie: number, location: Location): number {
  const tee = standardToUniversal(rataDie, location);
  const waxing = lunarPhase(tee) < 180;
  const alt = observedLunarAltitude(tee, location);
  const lat = location.getLatitude();
  const offset = alt / (4 * (90 - Math.abs(lat)));
  const approx = !waxing ? tee - offset + 0.5 : offset > 0 ? tee + offset : tee + 1 + offset;

  const moment = binarySearch(
    approx - 0.25,
    approx + 0.25,
    (lo: number, hi: number): boolean => (hi - lo) / 2 < 1 / 1440,
    (low: number, high: number): boolean => observedLunarAltitude((high + low) / 2, location) < 0,
  );

  return moment < tee + 1 ? Math.max(universalToStandard(moment, location), rataDie) : -1;
}

/**
 * Standard time of moon-rise on fixed date at location.
 * Returns -1 if there is no moon-rise on date.
 * @param {number} rataDie moment in time
 * @param {Location} location Geo-location
 * @return {number} time of moon-rise or -1
 */
function moonRise(rataDie: number, location: Location): number {
  const tee = standardToUniversal(rataDie, location);
  const waning = lunarPhase(tee) > 180;
  const alt = observedLunarAltitude(tee, location);
  const lat = location.getLatitude();
  const offset = alt / (4 * (90 - Math.abs(lat)));
  const approx = !waning ? tee + offset + 0.5 : offset > 0 ? tee + 1 - offset : tee - offset;

  const moment = binarySearch(
    approx - 0.25,
    approx + 0.25,
    (lo: number, hi: number): boolean => (hi - lo) / 2 < 1 / 1440,
    (low: number, high: number): boolean => observedLunarAltitude((high + low) / 2, location) > 0,
  );

  return moment < tee + 1 ? Math.max(universalToStandard(moment, location), rataDie) : -1;
}

/**
 * Return the moment UT of last new moon before moment tee.
 * @param {float} tee moment in time
 * @return {float} new moon event before tee
 */
function newMoonBefore(tee: number): number {
  const t: number = nthNewMoon(0);
  const phi: number = lunarPhase(tee);
  const n: number = Math.round((tee - t) / MEAN_SYNODIC_MONTH - phi / 360);

  return nthNewMoon(final(n - 1, (k: number): boolean => nthNewMoon(k) < tee));
}

/**
 * Return the moment UT of first new moon at or after moment tee.
 * @param {float} tee moment in time
 * @return {float} new moon event before tee
 */
function newMoonAtOrAfter(tee: number): number {
  const t: number = nthNewMoon(0);
  const phi: number = lunarPhase(tee);
  const n: number = Math.round((tee - t) / MEAN_SYNODIC_MONTH - phi / 360);

  return nthNewMoon(next(n, (k: number): boolean => nthNewMoon(k) >= tee));
}

/**
 * Return S. K. Shaukat's criterion for likely visibility of crescent moon on
 * eve of jdn at given location.
 * @param {float} jdn Julian day number (JDN)
 * @param {Location} location geo-location
 * @return {float} visibility
 */
function visibleCrescent(jdn: number, location: Location): boolean {
  const tee: number = standardToUniversal(dusk(jdn - 1, location, 4.5), location);
  const phase: number = lunarPhase(tee);
  const altitude: number = lunarAltitude(tee, location);
  const arcOfLight: number = arcCosDeg(cosDeg(lunarLatitude(tee)) * cosDeg(phase));

  return (
    MoonPhase.NEW < phase && phase < MoonPhase.FIRST_QUARTER && arcOfLight >= 10.6 && arcOfLight <= 90 && altitude > 4.1
  );
}

/**
 * Return the closest fixed date on or before jdn, when crescent moon first
 * became visible at location.
 * @param {float} jdn Julian day number (JDN)
 * @param {Location} location geo-location
 * @return {float} phasis
 */
function phasisOnOrBefore(jdn: number, location: Location): number {
  const jd0: number = jdn - J0000;
  const mean: number = jd0 - Math.floor((lunarPhase(jdn + 1) / 360) * MEAN_SYNODIC_MONTH);
  const tau: number = jd0 - mean <= 3 && !visibleCrescent(jd0, location) ? mean - 30 : mean - 2;

  return next(tau, (d: number): boolean => visibleCrescent(d, location)) + J0000;
}

/**
 * Return the closest fixed date on or after jdn, when crescent moon first
 * became visible at location.
 * @param {float} jdn Julian day number (JDN)
 * @param {Location} location geo-location
 * @return {float} phasis
 */
function phasisOnOrAfter(jdn: number, location: Location): number {
  const mean: number = jdn - Math.floor((lunarPhase(jdn + 1) / 360) * MEAN_SYNODIC_MONTH);
  const tau: number = jdn - mean <= 3 && !visibleCrescent(jdn - 1, location) ? jdn : mean + 29;

  return next(tau, (d: number): boolean => visibleCrescent(d, location)) + J0000;
}

/**
 * Return the time at moon phase phi at tee or before.
 * @param {number} phi phase of the moon
 * @return {number} time
 */
function lunarPhaseAtOrBefore(phi: number, tee: number): number {
  const tau = tee - MEAN_SYNODIC_MONTH * (1 / 360) * mod(lunarPhase(tee) - phi, 360);
  const low = tau - 2;
  const high = Math.min(tee, tau + 2);

  return invertAngular(lunarPhase, phi, low, high);
}

/**
 * Return the moment UT of the first time at or after moment tee, when the solar
 * longitude will be lambda degrees.
 */
function solarLongitudeAfter(lambda: number, tee: number): number {
  const rate: number = MEAN_TROPICAL_YEAR / 360;
  const tau: number = tee + rate * mod(lambda - solarLongitude(tee), 360);
  const low: number = Math.max(tee, tau - 5);
  const high: number = tau + 5;

  return invertAngular(solarLongitude, lambda, low, high);
}

/**
 * Return standard time of sunset on jdn at given location.
 * @param {number} rataDie Julian day number (JDN)
 * @param {Location} location geo-location
 * @return {number} moment of sunset
 */
function sunset(rataDie: number, location: Location): number {
  const alpha: number = refraction(rataDie, location);

  return dusk(rataDie, location, alpha);
}

/**
 * Time between sunset and moon-set on tee at location.
 * Returns -1 if there is no sunset on tee.
 * @param {number} tee moment in time
 * @param {Location} location geo-location
 * @return {number} moment of moon lag
 */
function moonLag(tee: number, location: Location): number {
  const sun = sunset(tee, location);

  if (sun === -1) {
    return -1;
  }

  const moon = moonSet(tee, location);

  if (moon === -1) {
    return 1;
  }

  return moon - sun;
}

/**
 * Return radix representation of x.
 * E.g.   num = 1999, radices = [ 4, 25, 4 ]
 *        results in [ 4, 3, 24, 3 ]
 *
 *        1999 =   4 * (4 * 25 * 4) +
 *                 3 *     (25 * 4) +
 *                24 *           4  +
 *                 3
 *
 * @param {number} num the number to radicalise
 * @param {number[]} radices the array of radix numbers
 * @return {number} moment of sunset
 */
function toRadix(num: number, radices: number[]): number[] {
  if (radices.length === 0) {
    return [num];
  }

  const prod = radices.reduce((acc: number, item: number): number => acc * item, 1);
  const radix = Math.floor(num / prod);
  const x2 = num - prod * radix;
  const [, ...rest] = radices;

  return [radix, ...toRadix(x2, rest)];
}

export {
  amod,
  angle,
  apparentToLocal,
  arcTanDeg,
  binarySearch,
  cosDeg,
  dawn,
  degreesToRadians,
  deltaT,
  dusk,
  dynamicalToUniversal, // only to be tested, required for nutation!
  ephemerisCorrection, // only to be tested!
  equationOfTime,
  equinox,
  estimatePriorSolarLongitude,
  final,
  // fixAngle,
  // fixAngleRadians,
  jdnToWeekDay,
  // jhms,
  julianCenturies, // only to be tested!
  kdayOnOrAfter,
  lunarAltitude, // only to be tested!
  lunarDistance, // only to be tested!
  lunarPhase,
  lunarPhaseAtOrBefore,
  midDay,
  mod,
  mod3,
  moonLag,
  moonRise, // only to be tested!
  moonSet, // only to be tested!
  newMoonAtOrAfter,
  newMoonBefore,
  next,
  nthKday,
  nutation, // only to be tested!
  obliquity, // only to be tested!
  phasisOnOrAfter,
  phasisOnOrBefore,
  poly, // only to be tested!
  precession,
  radiansToDegrees,
  sigma, // only to be tested!
  sinDeg,
  solarLongitude,
  solarLongitudeAfter,
  standardToUniversal,
  sunset,
  tanDeg,
  toRadix,
  universalToApparent,
  universalToStandard,
};
