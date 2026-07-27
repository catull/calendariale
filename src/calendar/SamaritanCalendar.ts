import { final, midDay, mod, newMoonAtOrAfter, newMoonBefore, universalToApparent } from "../Astro";
import { INVALID_DAY, INVALID_MONTH, J0000, Month, samaritan } from "../Const";

import { GregorianCalendar } from "./GregorianCalendar";
import { SamaritanDate } from "./SamaritanDate";
import { CalendarDateValidationException } from "./core/index";

export class SamaritanCalendar {
  // Convert Julian day number (JDN) to Samaritan date
  // This works by making multiple calls to the inverse function, performing slowly.
  public static fromJdn(jdn: number): SamaritanDate {
    const rataDie: number = jdn - J0000;
    const moon = this.newMoonAtOrBefore(this.noon(rataDie));
    const newYear = this.newYearOnOrBefore(moon);
    const month = Math.round((moon - newYear) / 29.5) + 1;
    const year = Math.round((newYear - samaritan.EPOCH_RD) / 365.25) + Math.ceil((month - 5) / 8);
    const day = rataDie + 1 - moon;

    return new SamaritanDate(jdn, year, month, day);
  }

  // Determine Julian day number (JDN) from Samaritan calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const ny = this.newYearOnOrBefore(
      Math.floor(
        samaritan.EPOCH_RD +
          samaritan.NEW_YEAR_PROBE +
          365.25 * (year - Math.ceil((month - 5) / 8)),
      ),
    );
    const nm = this.newMoonAtOrBefore(ny + 29.5 * (month - 1) + 15);

    return J0000 + nm + day - 1;
  }

  // Is a given Samaritan year a leap year, i.e. does it hold 13 months?
  //
  // A numbered year is not an Abib-to-Abib year: the `ceil((month - 5) / 8)` shift in
  // `toJdn` draws months 6-13 of year Y from the Abib year Y - 1. So Y holds a 13th
  // month exactly when that Abib year ran 13 months, ~383-385 days against ~353-355.
  // No fixed Metonic offset fits, the year start being observational; derive it from
  // the calendar's own year length, as PersianAstronomical / BahaiAstro / Icelandic do.
  public static isLeapYear(year: number): boolean {
    return this.yearLengthDays(year) > 355;
  }

  // Length of the Abib year supplying months 6-13 of `year`. Taken straight from
  // `newYearOnOrBefore` rather than via `toJdn`, which would re-enter `validate`.
  private static yearLengthDays(year: number): number {
    const monthShift = Math.ceil((7 - 5) / 8); // == 1, `toJdn`'s shift at month 7
    const start = this.newYearOnOrBefore(
      Math.floor(samaritan.EPOCH_RD + samaritan.NEW_YEAR_PROBE + 365.25 * (year - monthShift)),
    );
    const end = this.newYearOnOrBefore(
      Math.floor(samaritan.EPOCH_RD + samaritan.NEW_YEAR_PROBE + 365.25 * (year + 1 - monthShift)),
    );

    return end - start;
  }

  private static noon(rataDie: number): number {
    return midDay(rataDie, samaritan.LOCATION_SAMARITAN);
  }

  private static newMoonAfter(rataDie: number): number {
    return Math.ceil(
      universalToApparent(newMoonAtOrAfter(rataDie), samaritan.LOCATION_SAMARITAN) - 0.5,
    );
  }

  private static newMoonAtOrBefore(rataDie: number): number {
    return Math.ceil(
      universalToApparent(newMoonBefore(rataDie), samaritan.LOCATION_SAMARITAN) - 0.5,
    );
  }

  private static newYearOnOrBefore(rataDie: number): number {
    const gYear = GregorianCalendar.jdnToYear(rataDie + J0000);
    const dates = [
      ...GregorianCalendar.julianDateInGregorian(Month.MARCH, 11, gYear - 1),
      ...GregorianCalendar.julianDateInGregorian(Month.MARCH, 11, gYear),
    ].map((jdn: number) => jdn - J0000);
    dates.push(rataDie + 1);

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
