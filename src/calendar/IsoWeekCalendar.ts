import { amod, nthKday } from '../Astro';
import { INVALID_DAY, INVALID_WEEK, J0000, Month, WeekDay } from '../Const';

import { GregorianCalendar } from './GregorianCalendar';
import { IsoWeekDate } from './IsoWeekDate';
import { CalendarDateValidationException } from './core';

export class IsoWeekCalendar {
  // Calculate Iso Week calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): IsoWeekDate {
    const approx: number = GregorianCalendar.jdnToYear(jdn - 3);
    const year: number = jdn >= this.toJdn(approx + 1, 1, 1) ? (approx + 1) : approx;
    const week: number = 1 + Math.floor((jdn - this.toJdn(year, 1, 1)) / 7);
    const day: number = amod(jdn - J0000, 7);

    return new IsoWeekDate(jdn, year, week, day);
  }

  // Determine Julian day number (JDN) from Iso Week calendar date
  public static toJdn(year: number, week: number, day: number): number {
    this.validate(year, week, day);

    return nthKday(week, WeekDay.SUNDAY, GregorianCalendar.toJdn(year - 1, Month.DECEMBER, 28)) + day;
  }

  private static validate(year: number, week: number, day: number): void {
    if (week < 1 || week > 53) {
      throw new CalendarDateValidationException(INVALID_WEEK);
    }

    if (day < 1 || day > 7) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

}
