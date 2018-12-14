import { mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, egyptian } from '../Const';

import { EgyptianCalendarDate } from './EgyptianCalendarDate';
import { CalendarDateValidationException } from './core';

export class EgyptianCalendar {
  // Determine Julian day number from Egyptian calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    return egyptian.EPOCH + 365 * (year - 1) + 30 * (month - 1) + day - 1.0;
  }

  // Calculate Egyptian calendar date from Julian day
  public static fromJdn(jdn: number): EgyptianCalendarDate {
    const days: number = jdn - egyptian.EPOCH;
    const year: number = Math.floor(days / 365) + 1;
    const month: number = Math.floor(mod(days, 365) / 30) + 1;
    const day: number = days - 365 * (year - 1) - 30 * (month - 1) + 1;

    return new EgyptianCalendarDate(jdn, year, month, day);
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 13) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (month === 13 && day > 5) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }

    if (day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

}
