import { final, midDay, mod, newMoonAtOrAfter, newMoonBefore, universalToApparent } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, J0000, Month, samaritan } from '../Const';

import { GregorianCalendar } from './GregorianCalendar';
import { SamaritanDate } from './SamaritanDate';
import { CalendarDateValidationException } from './core';

export class SamaritanCalendar {
  // Convert Julian day number (JDN) to Samaritan date
  // This works by making multiple calls to the inverse function, performing slowly.
  public static fromJdn(jdn: number): SamaritanDate {
    const rataDie: number = jdn - J0000;
    const moon = this.newMoonAtOrBefore(this.noon(rataDie));
    const newYear = this.newYearOnOrBefore(moon);
    const month = Math.round((moon - newYear) / 29.5) + 1;
    const year = Math.round((newYear - samaritan.EPOCH_RD) / 365.25) + Math.ceil((month - 5) / 8);
    const day = rataDie - moon - -1;

    return new SamaritanDate(jdn, year, month, day);
  }

  // Determine Julian day number (JDN) from Samaritan calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const ny = this.newYearOnOrBefore(
      Math.floor(samaritan.EPOCH_RD + 50 + 365.25 * (year - Math.ceil((month - 5) / 8))),
    );
    const nm = this.newMoonAtOrBefore(ny + 29.5 * (month - 1) + 15);

    return J0000 + nm + day - 1;
  }

  // Is a given Samaritan year a leap year?
  public static isLeapYear(year: number): boolean {
    return mod(year * 7 + 4, 19) < 7;
  }

  private static noon(rataDie: number): number {
    return midDay(rataDie, samaritan.LOCATION_SAMARITAN);
  }

  private static newMoonAfter(rataDie: number): number {
    return Math.ceil(universalToApparent(newMoonAtOrAfter(rataDie), samaritan.LOCATION_SAMARITAN) - 0.5);
  }

  private static newMoonAtOrBefore(rataDie: number): number {
    return Math.ceil(universalToApparent(newMoonBefore(rataDie), samaritan.LOCATION_SAMARITAN) - 0.5);
  }

  private static newYearOnOrBefore(rataDie: number): number {
    const gYear = GregorianCalendar.jdnToYear(rataDie + J0000);
    const dates = [
      ...GregorianCalendar.julianDateInGregorian(Month.MARCH, 11, gYear - 1),
      ...GregorianCalendar.julianDateInGregorian(Month.MARCH, 11, gYear),
    ].map((jdn: number) => jdn - J0000); // .sort();
    dates.push(rataDie + 1);

    // captains.log('newYearOnOrBefore', rataDie, gYear, dates);
    const n = final(0, (i: number) => this.newMoonAfter(this.noon(dates[i])) <= rataDie);

    return this.newMoonAfter(this.noon(dates[n]));
  }

  private static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > this.hebrewYearMonths(year)) {
      throw new CalendarDateValidationException(`${INVALID_MONTH} ${year} ${month}`);
    }

    if (day < 1 || day > this.hebrewMonthDays(year, month)) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  // How many months are there in a Hebrew year (12 = normal, 13 = leap)
  private static hebrewYearMonths(year: number): number {
    return this.isLeapYear(year) ? 13 : 12;
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
