import { mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, armenian } from '../Const';

import { CalendarValidationException, YearMonthCalendar } from './core';

export class ArmenianCalendar extends YearMonthCalendar {
  // Determine Julian day number from Armenian calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    return armenian.EPOCH + 365 * (year - 1) + 30 * (month - 1) + day - 1.0;
  }

  // Calculate Armenian calendar date from Julian day
  public static fromJdn(jdn: number): ArmenianCalendar {
    const days: number = jdn - armenian.EPOCH;
    const year: number = Math.floor(days / 365) + 1;
    const month: number = Math.floor(mod(days, 365) / 30) + 1;
    const day: number = days - 365 * (year - 1) - 30 * (month - 1) + 1;

    return new ArmenianCalendar(jdn, year, month, day);
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 13) {
      throw new CalendarValidationException(INVALID_MONTH);
    }

    if (month === 13 && day > 5) {
      throw new CalendarValidationException(INVALID_DAY);
    }

    if (day < 1 || day > 30) {
      throw new CalendarValidationException(INVALID_DAY);
    }
  }

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day);
  }

}
