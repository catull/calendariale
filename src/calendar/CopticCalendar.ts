import { mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, coptic } from '../Const';

import { CopticCalendarDate } from './CopticCalendarDate';
import { CalendarDateValidationException } from './core';

export class CopticCalendar {
  // Is a given year in the Coptic calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return mod(year, 4) === 3;
  }

  // Determine Julian day number from Coptic calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    return coptic.EPOCH - 1 + 365 * (year - 1) +
      Math.floor(year / 4) + 30 * (month - 1) + day;
  }

  // Calculate Coptic calendar date from Julian day
  public static fromJdn(jdn: number) {
    const year: number = Math.floor((4 * (jdn - coptic.EPOCH) + 1463) / 1461);
    const month: number = 1 + Math.floor((jdn - this.toJdn(year, 1, 1)) / 30);
    const day: number = jdn + 1 - this.toJdn(year, month, 1);

    return new CopticCalendarDate(jdn, year, month, day);
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 13) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    const days: number = this.isLeapYear(year) ? 6 : 5;

    if (month === 13 && day > days) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }

    if (day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

}
