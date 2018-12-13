import { mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, islamic } from '../Const';

import { CalendarValidationException, LeapCalendar } from './core';

export class IslamicCalendar extends LeapCalendar {
  // Is a given year in the Islamic calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return (year * 11 + 14) % 30 < 11;
  }

  // Determine Julian day number from Islamic calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    return day + Math.ceil(29.5 * (month - 1)) + (year - 1) * 354 +
      Math.floor((3 + 11 * year) / 30) + islamic.EPOCH - 1;
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarValidationException(INVALID_MONTH);
    }

    const maxDay: number = ((mod(month, 2) === 1) || (this.isLeapYear(year) && month === 12)) ? 30 : 29;
    if (day < 1 || day > maxDay) {
      throw new CalendarValidationException(INVALID_DAY);
    }
  }

  // Calculate Islamic calendar date from Julian day
  public static fromJdn(jdn: number): IslamicCalendar {
    const jd0: number = Math.floor(jdn) + 0.5;
    const year: number = Math.floor((30 * (jd0 - islamic.EPOCH) + 10646) / 10631);
    const month: number = Math.min(12, Math.ceil((jd0 - (29 + this.toJdn(year, 1, 1))) / 29.5) + 1);
    const day: number = jd0 - this.toJdn(year, month, 1) + 1;

    return new IslamicCalendar(jdn, year, month, day);
  }

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, IslamicCalendar.isLeapYear(year));
  }

}
