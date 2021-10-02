import { amod, mod } from '../Astro';
import { INVALID_COUNT, INVALID_LEAP_DAY, INVALID_MONTH, Month, ROMAN_MONTH_MAX_DAYS, RomanEvent } from '../Const';

import { JulianCalendar } from './JulianCalendar';
import { JulianDate } from './JulianDate';
import { RomanDate } from './RomanDate';
import { CalendarDateValidationException } from './core/CalendarDateValidationException';

export class RomanCalendar {
  // Calculate Roman calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): RomanDate {
    const date: JulianDate = JulianCalendar.fromJdn(jdn);
    let year: number = date.getYear();
    let month: number = date.getMonth();
    let count: number = date.getDay();
    let event: RomanEvent = RomanEvent.KALENDS;
    let leap = false;

    if (count === 1) {
      event = RomanEvent.KALENDS;
    } else if (count <= this.nonesOfMonth(month)) {
      event = RomanEvent.NONES;
      count = this.nonesOfMonth(month) - count + 1;
    } else if (count <= this.idesOfMonth(month)) {
      event = RomanEvent.IDES;
      count = this.idesOfMonth(month) - count + 1;
    } else if (month !== Month.FEBRUARY || !JulianCalendar.isLeapYear(year)) {
      const m = amod(month + 1, 12);
      const y = m !== 1 ? year : year !== -1 ? year + 1 : 1;
      const kalends1 = this.toJdn(y, m, RomanEvent.KALENDS, 1, false);
      year = y;
      month = m;
      event = RomanEvent.KALENDS;
      count = kalends1 - jdn + 1;
    } else if (count < 25) {
      month = Month.MARCH;
      event = RomanEvent.KALENDS;
      count = 30 - count;
    } else {
      month = Month.MARCH;
      event = RomanEvent.KALENDS;
      count = 31 - count;
      leap = count === 6;
    }

    return new RomanDate(jdn, year, month, event, count, leap);
  }

  // Determine Julian day number (JDN) from Roman calendar date
  public static toJdn(year: number, month: number, event: RomanEvent, count: number, leap: boolean): number {
    this.validate(year, month, event, count, leap);

    const day: number =
      event === RomanEvent.KALENDS
        ? 1
        : event === RomanEvent.NONES
        ? this.nonesOfMonth(month)
        : this.idesOfMonth(month);
    let jdn: number = JulianCalendar.toJdn(year, month, day) - count;

    if (leap) {
      jdn += 1;
    }

    if (
      !JulianCalendar.isLeapYear(year) ||
      month !== Month.MARCH ||
      event !== RomanEvent.KALENDS ||
      count < 6 ||
      count > 16
    ) {
      jdn += 1;
    }

    return jdn;
  }

  /**
   * Return the date of the Ides in Roman month.
   * @param {number} month the month
   * @result {number} either the 15th or 13th
   */
  private static idesOfMonth(month: number): number {
    if (month === Month.MARCH || month === Month.MAY || month === Month.JULY || month === Month.OCTOBER) {
      return 15;
    }

    return 13;
  }

  /**
   * Return the date of the Nones in Roman month.
   * @param {number} month the month
   * @result {number} either the 7th or 5th
   */
  private static nonesOfMonth(month: number): number {
    return this.idesOfMonth(month) - 8;
  }

  private static validate(year: number, month: number, event: RomanEvent, count: number, leap: boolean): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    const previousMonth: number = mod(month - 1, 12);
    const maxKalends: number = ROMAN_MONTH_MAX_DAYS[mod(month - 2, 12)] - this.idesOfMonth(previousMonth) + 1;
    const maxCount: number =
      event === RomanEvent.IDES ? 8 : event === RomanEvent.NONES ? this.nonesOfMonth(month) - 1 : maxKalends;

    if (count < 1 || count > maxCount) {
      throw new CalendarDateValidationException(INVALID_COUNT);
    }

    // In a leap year, the 6th day before the Kalends of March appears twice, once leap and once non-leap.
    // The Romans distingiushed them as
    // - 'a.d.     VI Kal. Mart.', written out  'ante diem     sextum Kalendas Martii' -> non-leap day
    // - 'a.d. bis VI Kal. Mart.', similarly as 'ante diem bis sextum Kalendas Martii' -> LEAP day
    // Here is the correspondance to the days in the Julian calendar:
    // 0004-02-25  [Julian Calendar]  ===  0004 a.d. bis VI  Kal. Mart. [Roman Calendar] LEAP
    // 0004-02-24  [Julian Calendar]  ===  0004 a.d.     VI  Kal. Mart. [Roman Calendar]
    // 0004-02-23  [Julian Calendar]  ===  0004 a.d.     VII Kal. Mart. [Roman Calendar]
    // In a non-leap year, the correspondance is:
    // 0003-02-24  [Julian Calendar]  ===  0003 a.d.     VI  Kal. Mart. [Roman Calendar]
    // 0003-02-23  [Julian Calendar]  ===  0003 a.d.     VII Kal. Mart. [Roman Calendar]
    // In other words, the 6th day before the Kalends of March is the only date that may be used twice IN A LEAP YEAR.
    // Thus, leap days were inserted between the 6th and 7th day originally (Feb. 25th).
    if (
      leap &&
      (event !== RomanEvent.KALENDS || month !== Month.MARCH || count !== 6 || !JulianCalendar.isLeapYear(year))
    ) {
      throw new CalendarDateValidationException(INVALID_LEAP_DAY);
    }
  }
}
