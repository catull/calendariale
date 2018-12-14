import { mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, ethiopic } from '../Const';

import { EthiopicCalendarDate } from './EthiopicCalendarDate';
import { CalendarDateValidationException } from './core';

export class EthiopicCalendar {
  // Determine Julian day number from Ethiopic calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    return ethiopic.EPOCH - 1 + 365 * (year - 1) +
      Math.floor(year / 4) + 30 * (month - 1) + day;
  }

  // Calculate Ethiopic calendar date from Julian day
  public static fromJdn(jdn: number): EthiopicCalendarDate {
    const year: number = Math.floor((4 * (jdn - ethiopic.EPOCH) + 1463) / 1461);
    const month: number = 1 + Math.floor((jdn - this.toJdn(year, 1, 1)) / 30);
    const day: number = jdn + 1 - this.toJdn(year, month, 1);

    return new EthiopicCalendarDate(jdn, year, month, day);
  }
  public static isLeapYear(year: number): boolean {
    return mod(year, 4) === 0;
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 13) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    const maxDaysOfMonth13 = this.isLeapYear (year) ? 6 : 5;
    if (month === 13 && day > maxDaysOfMonth13) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }

    if (day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

}
