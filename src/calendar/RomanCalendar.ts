import { amod, mod } from '../Astro';
import { INVALID_COUNT, INVALID_LEAP_DAY, INVALID_MONTH, Month, ROMAN_MONTH_MAX_DAYS, RomanEvent } from '../Const';

import { JulianCalendar } from './JulianCalendar';
import { JulianCalendarDate } from './JulianCalendarDate';
import { RomanCalendarDate } from './RomanCalendarDate';
import { CalendarDateValidationException } from './core';

export class RomanCalendar {
  // Determine Julian day number from Roman calendar date
  public static toJdn (year: number, month: number, event: RomanEvent, count: number, leap: boolean): number {
    this.validate (year, month, event, count, leap);

    const day: number =
      event === RomanEvent.KALENDS ? 1 :
        event === RomanEvent.NONES ? this.nonesOfMonth (month) :
          this.idesOfMonth (month);
    let jdn: number = JulianCalendar.toJdn (year, month, day) - count;

    if (leap) {
      jdn += 1;
    }

    if (!JulianCalendar.isLeapYear (year) ||
       month !== Month.MARCH ||
       event !== RomanEvent.KALENDS ||
       count < 6 ||
       count > 16) {
      jdn += 1;
    }

    return jdn;
  }

  public static validate (year: number, month: number, event: RomanEvent, count: number, leap: boolean): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException (INVALID_MONTH);
    }

    const previousMonth: number = mod (month - 1, 12);
    const maxKalends: number    = ROMAN_MONTH_MAX_DAYS[mod (month - 2, 12)] - this.idesOfMonth (previousMonth) + 1;
    const maxCount: number      = (event === RomanEvent.IDES) ? 8 :
      (event === RomanEvent.NONES) ? (this.nonesOfMonth (month) - 1) : maxKalends;

    if (count < 1 || count > maxCount) {
      throw new CalendarDateValidationException (INVALID_COUNT);
    }

    if (leap && (event !== RomanEvent.KALENDS || month !== 3 || count !== 6 || !JulianCalendar.isLeapYear (year))) {
      throw new CalendarDateValidationException (INVALID_LEAP_DAY);
    }
  }

  // Calculate Roman calendar date from Julian day
  public static fromJdn (jdn: number): RomanCalendarDate {
    const date: JulianCalendarDate = JulianCalendar.fromJdn (jdn);
    let year: number  = date.getYear ();
    let month: number = date.getMonth ();
    let count: number = date.getDay ();
    let event: RomanEvent;
    let leap = false;

    if (count === 1) {
      event = RomanEvent.KALENDS;
    } else if (count <= this.nonesOfMonth (month)) {
      event = RomanEvent.NONES;
      count = this.nonesOfMonth (month) - count + 1;
    } else if (count <= this.idesOfMonth (month)) {
      event = RomanEvent.IDES;
      count = this.idesOfMonth (month) - count + 1;
    } else if (month !== Month.FEBRUARY || !JulianCalendar.isLeapYear (year)) {
      const m = amod (month + 1, 12);
      const y  = m !== 1 ? year : year !== -1 ? year + 1 : 1;
      const kalends1 = this.toJdn (y, m, RomanEvent.KALENDS, 1, false);
      year  = y;
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
      leap  = (count === 25);
    }

    return new RomanCalendarDate (jdn, year, month, event, count, leap);
  }

  /**
   * Return the date of the Ides in Roman month.
   * @param {number} month the month
   * @result {number} either the 15th or 13th
   */
  public static idesOfMonth (month: number): number {
    if (month === Month.MARCH ||
      month === Month.MAY ||
      month === Month.JULY ||
      month === Month.OCTOBER) {
      return 15;
    }

    return 13;
  }

  /**
   * Return the date of the Nones in Roman month.
   * @param {number} month the month
   * @result {number} either the 7th or 5th
   */
  public static nonesOfMonth (month: number): number {
    return this.idesOfMonth (month) - 8;
  }

}
