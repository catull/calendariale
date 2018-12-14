import { mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, hebrew } from '../Const';

import { HebrewDate } from './HebrewDate';
import { CalendarDateValidationException } from './core';

export class HebrewCalendar {
  // Determine Julian day number from Hebrew calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const months: number = this.hebrewYearMonths(year);
    let jdn: number = hebrew.EPOCH + this.hebrewDelay1(year) + this.hebrewDelay2(year) + day + 1;
    let mon: number;

    if (month < 7) {
      for (mon = 7; mon <= months; mon += 1) {
        jdn += this.hebrewMonthDays(year, mon);
      }
      for (mon = 1; mon < month; mon += 1) {
        jdn += this.hebrewMonthDays(year, mon);
      }
    } else {
      for (mon = 7; mon < month; mon += 1) {
        jdn += this.hebrewMonthDays(year, mon);
      }
    }

    return jdn;
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > this.hebrewYearMonths(year)) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (day < 1 || day > this.hebrewMonthDays(year, month)) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  // Convert Julian date to Hebrew date
  // This works by making multiple calls to the inverse function, performing slowly.
  public static fromJdn(jdn: number): HebrewDate {
    const jd0: number = Math.floor(jdn) + 0.5;
    const count: number = Math.floor((jd0 - hebrew.EPOCH) * 98496.0 / 35975351.0);
    let year: number = count - 1;
    let index: number;

    for (index = count; jd0 >= this.toJdn(index, 7, 1); index += 1) {
      year += 1;
    }

    const first: number = jd0 < this.toJdn(year, 1, 1) ? 7 : 1;
    let month: number = first;

    for (index = first; jd0 > this.toJdn(year, index, this.hebrewMonthDays(year, index)); index += 1) {
      month += 1;
    }

    const day: number = jd0 - this.toJdn(year, month, 1) + 1;

    return new HebrewDate(jdn, year, month, day);
  }

  // Is a given Hebrew year a leap year?
  public static isLeapYear(year: number): boolean {
    return mod(year * 7 + 1, 19) < 7;
  }

  // How many months are there in a Hebrew year (12 = normal, 13 = leap)
  private static hebrewYearMonths(year: number): number {
    return this.isLeapYear(year) ? 13 : 12;
  }

  // Test for delay of start of new year and to avoid
  // Sunday, Wednesday, and Friday as start of the new year.
  private static hebrewDelay1(year: number): number {
    const months: number = Math.floor((235 * year - 234) / 19);
    const parts: number = 12084 + 13753 * months;
    let day: number = months * 29 + Math.floor(parts / 25920);

    if (mod(3 * (day + 1), 7) < 3) {
      day += 1;
    }

    return day;
  }

  // Check for delay in start of new year due to length of adjacent years
  private static hebrewDelay2(year: number): number {
    const last: number = this.hebrewDelay1(year - 1);
    const present: number = this.hebrewDelay1(year);
    const next: number = this.hebrewDelay1(year + 1);

    return next - present === 356 ? 2 : present - last === 382 ? 1 : 0;
  }

  // How many days are in a Hebrew year?
  private static hebrewYearDays(year: number): number {
    return this.toJdn(year + 1, 7, 1) - this.toJdn(year, 7, 1);
  }

  // How many days are in a given month of a given year
  private static hebrewMonthDays(year: number, month: number): number {
    // First of all, dispose of fixed-length 29 day months
    if (month === 2 || month === 4 || month === 6 || month === 10 || month === 13) {
      return 29;
    }

    // If it's not a leap year, Adar has 29 days
    if (month === 12 && !this.isLeapYear(year)) {
      return 29;
    }

    // If it's Heshvan, days depend on length of year
    if (month === 8 && mod(this.hebrewYearDays(year), 10) !== 5) {
      return 29;
    }

    // Similarly, Kislev varies with the length of year
    if (month === 9 && mod(this.hebrewYearDays(year), 10) === 3) {
      return 29;
    }

    // Nope, it's a 30 day month
    return 30;
  }

}
