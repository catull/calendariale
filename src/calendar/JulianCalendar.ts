import { mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, Month, ROMAN_MONTH_MAX_DAYS } from '../Const';

import { JulianDate } from './JulianDate';
import { CalendarDateValidationException } from './core/index';

export class JulianCalendar {
  // Calculate Julian calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): JulianDate {
    const b: number = Math.floor(jdn + 0.5) + 1524;
    const c: number = Math.floor((b - 122.1) / 365.25);
    const d: number = Math.floor(365.25 * c);
    const e: number = Math.floor((b - d) / 30.6001);

    const month: number = Math.floor(e < 14 ? e - 1 : e - 13);
    let year: number = Math.floor(month > 2 ? c - 4716 : c - 4715);
    const day: number = b - d - Math.floor(30.6001 * e);

    // If year is less than 1, subtract one to convert from
    // a zero based date system to the common era system in
    // which the year -1 (1 B.C.E) is followed by year 1 (1 C.E.).
    if (year < 1) {
      year -= 1;
    }

    return new JulianDate(jdn, year, month, day);
  }

  // Determine Julian day number (JDN) from Julian calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    let y: number = year;
    let m: number = month;

    // Adjust negative common era years to the zero-based notation we use.
    if (y < 1) {
      y += 1;
    }

    // Algorithm as given in *Meeus, **Astronomical Algorithms**, Chapter 7, page 61*
    if (m <= 2) {
      y -= 1;
      m += 12;
    }

    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day - 1524.5;
  }

  // Is a given year in the Julian calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return mod(year, 4) === (year > 0 ? 0 : 3);
  }

  private static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (day < 1) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }

    const febDays: number = this.isLeapYear(year) ? 29 : 28;

    if (month === Month.FEBRUARY && day <= febDays) {
      return;
    }

    if (ROMAN_MONTH_MAX_DAYS[month - 1] < day) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }
}
