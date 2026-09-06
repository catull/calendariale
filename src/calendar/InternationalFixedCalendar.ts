import { INVALID_DAY, INVALID_MONTH, internationalFixed } from "../Const";

import { InternationalFixedDate } from "./InternationalFixedDate";
import { CalendarDateValidationException } from "./core/index";

export class InternationalFixedCalendar {
  // Is a given year in the International Fixed calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  // Calculate International Fixed calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): InternationalFixedDate {
    const epochDay = Math.floor(jdn + 0.5) - internationalFixed.EPOCH;

    // Every 400 years spans exactly 146097 days, so `400 * epochDay / 146097`
    // is a very close estimate of the elapsed year count. The estimate can be
    // off by exactly one year at a year boundary, which the two checks below
    // correct for directly — no iteration needed.
    const year = Math.floor((400 * epochDay) / internationalFixed.DAYS_PER_CYCLE) + 1;
    const leap = InternationalFixedCalendar.isLeapYear(year);
    const dayOfYear = epochDay - InternationalFixedCalendar.daysBeforeYear(year) + 0.5;

    let month;
    let day;

    if (
      (!leap && dayOfYear === internationalFixed.DAYS_IN_YEAR) ||
      (leap && dayOfYear == internationalFixed.DAYS_IN_YEAR + 1)
    ) {
      // Year Day
      month = 13;
      day = 29;
    } else if (leap && dayOfYear === 169) {
      // Leap Day
      month = 6;
      day = 29;
    } else {
      const doy = leap && dayOfYear > 169 ? dayOfYear - 2 : dayOfYear - 1;
      month = Math.floor(doy / 28) + 1;
      day = (doy % 28) + 1;
    }

    return new InternationalFixedDate(jdn, year, month, day);
  }

  // Determine Julian day number (JDN) from International Fixed calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    return InternationalFixedCalendar.jdnAtStartOfYear(year) + this.dayOfYear(year, month, day) - 1;
  }

  /** JDN of month 1, day 1 of the given IFC year. */
  private static jdnAtStartOfYear(year: number): number {
    return internationalFixed.EPOCH + InternationalFixedCalendar.daysBeforeYear(year);
  }

  private static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 13) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }
    const maxdaysInMonth =
      13 === month || (6 === month && InternationalFixedCalendar.isLeapYear(year)) ? 29 : 28;

    if (day < 1 || day > maxdaysInMonth) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  /** Number of leap years among IFC years 1 up to and including `y`. */
  private static leapYearsUptoYear(y: number): number {
    return Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
  }

  /** Number of days in all IFC years strictly before `year` — i.e. the day
   *  count from year 1, day 1 up to (but not including) `year`, day 1. */
  private static daysBeforeYear(year: number): number {
    const y = year - 1;
    return 365 * y + InternationalFixedCalendar.leapYearsUptoYear(y);
  }

  /** Day-of-year (1-based) for this date.
   *
   *  Every month is 28 days, except month 13 (always) and month 6 (in leap
   *  years only), each of which gains a 29th day — the Year Day and Leap Day
   *  respectively. Because the Leap Day sits after month 6, every month from
   *  7 onward is pushed one day later in leap years, hence the `shift`. */
  private static dayOfYear(year: number, month: number, day: number): number {
    const shift = InternationalFixedCalendar.isLeapYear(year) && month > 6 ? 1 : 0;

    return 28 * (month - 1) + day + shift;
  }
}
