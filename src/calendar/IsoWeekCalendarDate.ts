import { amod, nthKday } from '../Astro';
import { INVALID_DAY, INVALID_WEEK, J0000, Month, WeekDay } from '../Const';

import { GregorianCalendarDate } from './GregorianCalendarDate';
import { CalendarDateValidationException, YearCalendarDate } from './core';

export class IsoWeekCalendarDate extends YearCalendarDate {
  // Determine Julian day number from Iso Week calendar date
  public static toJdn(year: number, week: number, day: number): number {
    this.validate(year, week, day);

    return nthKday(week, WeekDay.SUNDAY, GregorianCalendarDate.toJdn(year - 1, Month.DECEMBER, 28)) + day;
  }

  public static validate(year: number, week: number, day: number): void {
    if (week < 1 || week > 53) {
      throw new CalendarDateValidationException(INVALID_WEEK);
    }

    if (day < 1 || day > 7) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  // Calculate Iso Week calendar date from Julian day
  public static fromJdn(jdn: number): IsoWeekCalendarDate {
    const approx: number = GregorianCalendarDate.jdnToYear(jdn - 3);
    const year: number = jdn >= this.toJdn(approx + 1, 1, 1) ? (approx + 1) : approx;
    const week: number = 1 + Math.floor((jdn - this.toJdn(year, 1, 1)) / 7);
    const day: number = amod(jdn - J0000, 7);

    return new IsoWeekCalendarDate(jdn, year, week, day);
  }

  constructor(jdn: number, year: number, private week: number, private day: number) {
    super(jdn, year);
  }

  public getWeek(): number {
    return this.week;
  }

  public getDay(): number {
    return this.day;
  }
}
