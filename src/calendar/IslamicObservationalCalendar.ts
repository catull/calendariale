import { mod, phasisOnOrBefore } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, MEAN_SYNODIC_MONTH, islamic } from '../Const';

import { IslamicObservationalDate } from './IslamicObservationalDate';
import { CalendarDateValidationException } from './core';

export class IslamicObservationalCalendar {
  // Is a given year in the Islamic calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return (year * 11 + 14) % 30 < 11;
  }

  // Determine Julian day number from Islamic Observational calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const midMonth = islamic.EPOCH + Math.floor(((year - 1) * 12 + month - 0.5) * MEAN_SYNODIC_MONTH);

    return phasisOnOrBefore(midMonth, islamic.CAIRO_LOCATION) + day - 1;
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  // Calculate Islamic calendar date from Julian day
  public static fromJdn(jdn: number): IslamicObservationalDate {
    const crescent: number = phasisOnOrBefore(jdn, islamic.CAIRO_LOCATION);
    const elapsedMonths: number = Math.round((crescent - islamic.EPOCH) / MEAN_SYNODIC_MONTH);
    const year: number = Math.floor(elapsedMonths / 12) + 1;
    const month: number = mod(elapsedMonths, 12) + 1;
    const day: number = jdn - crescent + 1;

    return new IslamicObservationalDate(jdn, year, month, day);
  }

}
