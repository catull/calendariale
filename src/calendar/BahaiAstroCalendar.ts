import { amod, estimatePriorSolarLongitude, mod, next, solarLongitude, standardToUniversal, sunset } from '../Astro';
import {
  INVALID_DAY,
  INVALID_MONTH,
  INVALID_VAHID,
  INVALID_YEAR,
  J0000,
  MEAN_TROPICAL_YEAR,
  Season,
  bahai,
} from '../Const';

import { BahaiAstroDate } from './BahaiAstroDate';
import { CalendarDateValidationException } from './core';

export class BahaiAstroCalendar {
  // Calculate Bahai calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): BahaiAstroDate {
    const rataDie = jdn - J0000;
    const newYear = this.newYearOnOrBefore(rataDie);
    const years = Math.round((newYear - bahai.EPOCH_RD) / MEAN_TROPICAL_YEAR);
    const kullIshay = Math.floor(years / 361) + 1;
    const vahid = Math.floor(mod(years, 361) / 19) + 1;
    const year = mod(years, 19) + 1;
    const days = rataDie - newYear;
    const month =
      jdn >= this.bahaiToJdn(kullIshay, vahid, year, 19, 1)
        ? 19
        : jdn >= this.bahaiToJdn(kullIshay, vahid, year, 0, 1)
        ? 0
        : Math.floor(days / 19) + 1;
    const day = jdn + 1 - this.bahaiToJdn(kullIshay, vahid, year, month, 1);

    return new BahaiAstroDate(jdn, kullIshay, vahid, year, month, day);
  }

  // Determine Julian day number (JDN) from Bahai calendar date, where the year is
  // pre-calculated as
  //    1844 + 361 * (kull-i-shay - 1) + 19 * (vahid - 1) + year - 1
  public static toJdn(year: number, month: number, day: number): number {
    const kullIshay: number = Math.floor(year / 361) + 1;
    const vahid: number = Math.floor(mod(year - 1, 361) / 19) + 1;
    const y: number = amod(year, 19);

    return this.bahaiToJdn(kullIshay, vahid, y, month, day);
  }

  // Determine Julian day number (JDN) from Bahai date
  public static bahaiToJdn(kullIshay: number, vahid: number, year: number, month: number, day: number): number {
    this.validate(kullIshay, vahid, year, month, day);

    const years = 361 * (kullIshay - 1) + 19 * (vahid - 1) + year;
    const yearDiff = month === 19 ? 0.5 : -0.5;
    const monthDiff = month === 19 ? -20 : month === 0 ? 341 : (month - 1) * 19 - 1;

    return (
      J0000 +
      this.newYearOnOrBefore(bahai.EPOCH_RD + Math.floor(MEAN_TROPICAL_YEAR * (years + yearDiff))) +
      monthDiff +
      day
    );
  }

  // Is a given year in the Bahai calendar a leap year?
  public static isLeapYear(year: number): boolean {
    const newYear = this.toJdn(year, 1, 1);
    const newYearNext = this.toJdn(year + 1, 1, 1);

    return newYearNext - newYear > 365;
  }

  private static validate(kullIshay: number, vahid: number, year: number, month: number, day: number): void {
    if (vahid < 1 || vahid > 19) {
      throw new CalendarDateValidationException(INVALID_VAHID);
    }

    if (year < 1 || year > 19) {
      throw new CalendarDateValidationException(INVALID_YEAR);
    }

    if (month < 0 || month > 19) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (month === 0) {
      const byear: number = 361 * (kullIshay - 1) + 19 * (vahid - 1) + year;
      const maxDay: number = this.isLeapYear(byear) ? 5 : 4;

      if (day < 1 || day > maxDay) {
        throw new CalendarDateValidationException(INVALID_DAY);
      }
    }

    if (day < 1 || day > 19) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  private static bahaiSunset(rataDie: number): number {
    return standardToUniversal(sunset(rataDie, bahai.LOCATION_TEHRAN), bahai.LOCATION_TEHRAN);
  }

  private static newYearOnOrBefore(rataDie: number): number {
    const approx = estimatePriorSolarLongitude(Season.SPRING, this.bahaiSunset(rataDie));

    return next(
      Math.floor(approx) - 1,
      (day: number): boolean => solarLongitude(this.bahaiSunset(day)) <= Season.SPRING + 2,
    );
  }
}
