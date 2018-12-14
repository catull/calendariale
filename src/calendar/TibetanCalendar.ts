import { amod, mod } from '../Astro';
import { INVALID_DAY, INVALID_LEAP_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, tibetan } from '../Const';

import { TibetanCalendarDate } from './TibetanCalendarDate';
import { CalendarDateValidationException } from './core';

export class TibetanCalendar {
  public static isLeapMonth(year: number, month: number): boolean {
    return month === TibetanCalendar.fromJdn(TibetanCalendar.calculateJdn(year, month, true, 2, false)).getMonth();
  }

  // Determine Julian day number from Tibetan calendar date
  public static toJdn(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const jdn: number = TibetanCalendar.calculateJdn(year, month, monthLeap, day, dayLeap);
    TibetanCalendar.validate(year, month, monthLeap, day, dayLeap, jdn);

    return jdn;
  }

  // Calculate Tibetan calendar date from Julian day
  public static fromJdn(jdn: number): TibetanCalendarDate {
    const capY: number = 365 + 4975 / 18382;
    const years: number = Math.ceil((jdn - tibetan.EPOCH) / capY);

    let year0: number = years;

    while (jdn >= TibetanCalendar.calculateJdn(year0, 1, false, 1, false)) {
      year0 += 1;
    }

    year0 -= 1;
    let month0 = 1;
    while (jdn >= TibetanCalendar.calculateJdn(year0, month0, false, 1, false)) {
      month0 += 1;
    }

    month0 -= 1;
    const est: number = jdn - TibetanCalendar.calculateJdn(year0, month0, false, 1, false);
    let day0: number = est - 2;

    while (jdn >= TibetanCalendar.calculateJdn(year0, month0, false, day0, false)) {
      day0 += 1;
    }

    day0 -= 1;
    const monthLeap = day0 > 30;
    const day: number = amod(day0, 30);

    let temp: number;

    if (day > day0) {
      temp = month0 - 1;
    } else if (monthLeap) {
      temp = month0 + 1;
    } else {
      temp = month0;
    }

    const month: number = amod(temp, 12);
    let year: number;

    if (day > day0 && month0 === 1) {
      year = year0 - 1;
    } else if (monthLeap && month0 === 12) {
      year = year0 + 1;
    } else {
      year = year0;
    }

    const dayLeap: boolean = jdn === TibetanCalendar.calculateJdn(year, month, monthLeap, day, true);

    return new TibetanCalendarDate(jdn, year, month, monthLeap, day, dayLeap);
  }

  private static validate(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean, jdn: number) {
    if (month < 1 || month > 13) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (monthLeap && !TibetanCalendar.isLeapMonth(year, month)) {
      throw new CalendarDateValidationException(INVALID_LEAP_MONTH);
    }

    const date: TibetanCalendarDate = TibetanCalendar.fromJdn(jdn);
    if (date.isDayLeap() !== dayLeap) {
      throw new CalendarDateValidationException(INVALID_LEAP_DAY);
    }
    if (date.getDay() !== day || day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  // Determine Julian day number from Tibetan calendar date
  private static calculateJdn(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const months: number = Math.floor(804 / 65 * (year - 1) + 67 / 65 * month + (monthLeap ? -1 : 0) + 64 / 65);
    const days: number = 30 * months + day;
    const mean: number = days * 11135 / 11312 - 30 + (dayLeap ? 0 : -1) + 1071 / 1616;
    const solAnomaly: number = mod(days * 13 / 4824 + 2117 / 4824, 1);
    const lunAnomaly: number = mod(days * 3781 / 105840 + 2837 / 15120, 1);
    const sun: number = TibetanCalendar.tibetanSunEquation(12 * solAnomaly);
    const moon: number = TibetanCalendar.tibetanMoonEquation(28 * lunAnomaly);

    return Math.floor(tibetan.EPOCH + mean - sun + moon - 0.5) + 0.5;
  }

  /**
   * Determine if num is a non-integer number.
   * @param {float|int} num a number
   * @return {boolean} is it float ?
   */
  private static isFloat(num: number): boolean {
    return Boolean(Boolean(num % 1));
  }

  /**
   * Return the interpolated tabular sine of lunar anomaly alpha.
   * @param {float} alpha lunar anomaly
   * @return {float} sine value
   */
  private static tibetanMoonEquation(alpha: number): number {
    const alphaInt: number = Math.floor(alpha);

    if (alpha > 14) {
      return -TibetanCalendar.tibetanMoonEquation(alpha - 14);
    }

    if (alpha > 7) {
      return TibetanCalendar.tibetanMoonEquation(14 - alpha);
    }

    if (!TibetanCalendar.isFloat(alpha)) {
      return [0, 5, 10, 15, 19, 22, 24, 25][alphaInt] / 60;
    }

    return mod(alpha, 1) * TibetanCalendar.tibetanMoonEquation(Math.ceil(alpha)) +
      mod(-alpha, 1) * TibetanCalendar.tibetanMoonEquation(alphaInt);
  }

  /**
   * Return the interpolated tabular sine of solar anomaly alpha.
   * @param {float} alpha solar anomaly
   * @return {float} sine value
   */
  private static tibetanSunEquation(alpha: number): number {
    const alphaInt: number = Math.floor(alpha);

    if (alpha > 6) {
      return -TibetanCalendar.tibetanSunEquation(alpha - 6);
    }

    if (alpha > 3) {
      return TibetanCalendar.tibetanSunEquation(6 - alpha);
    }

    if (!TibetanCalendar.isFloat(alpha)) {
      return [0, 6, 10, 11][alphaInt] / 60;
    }

    return mod(alpha, 1) * TibetanCalendar.tibetanSunEquation(Math.ceil(alpha)) +
      mod(-alpha, 1) * TibetanCalendar.tibetanSunEquation(alphaInt);
  }

}
