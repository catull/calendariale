import { jdnToWeekDay, kdayOnOrAfter, mod, sigma, toRadix } from '../Astro';
import { INVALID_DAY, INVALID_SEASON, INVALID_WEEK, Season, WeekDay, icelandic } from '../Const';

import { IcelandicDate } from './IcelandicDate';
import { CalendarDateValidationException } from './core';

export class IcelandicCalendar {
  // Determine Julian day number from Icelandic calendar date
  public static toJdn(year: number, season: Season, week: number, day: WeekDay): number {
    this.validate(year, season, week, day);

    const start = season === Season.SUMMER ? this.summer(year) : this.winter(year);
    const shift = season === Season.SUMMER ? WeekDay.THURSDAY : WeekDay.SATURDAY;

    return start + 7 * (week - 1) + mod(day - shift, 7);
  }

  public static validate(year: number, season: Season, week: number, day: number): void {
    if (![Season.SUMMER, Season.WINTER].includes(season)) {
      throw new CalendarDateValidationException(INVALID_SEASON);
    }

    if (day < WeekDay.SUNDAY || WeekDay.SATURDAY < day) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }

    const maxWeeks = 26 + (Season.SUMMER === season && this.isLeapYear (year) ? 1 : 0);
    if (1 > week || maxWeeks < week) {
      throw new CalendarDateValidationException(INVALID_WEEK);
    }
  }

  // Is a given year in the Icelandic calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return this.summer(year + 1) - this.summer(year) !== 364;
  }

  // Calculate Icelandic calendar date from Julian day number
  public static fromJdn(jdn: number): IcelandicDate {
    const approx = Math.floor((jdn - icelandic.EPOCH + 369) / 365.2425);
    const year = jdn >= this.summer(approx) ? approx : approx - 1;
    const season = jdn < this.winter(year) ? Season.SUMMER : Season.WINTER;
    const start = season === Season.SUMMER ? this.summer(year) : this.winter(year);
    const week = 1 + Math.floor((jdn - start) / 7);
    const day = jdnToWeekDay(jdn);

    return new IcelandicDate(jdn, year, season, week, day);
  }

  // Identify the date of beginning of Icelandic summer.
  // It corresponds to the Thursday on or after Gregorian April 19th of the same year.
  private static summer(year: number): number {
    const april19 =
      icelandic.EPOCH +
      365 * (year - 1) +
      sigma([toRadix(year, [4, 25, 4]), [97, 24, 1, 0]], (r0: number, a0: number) => r0 * a0);

    return kdayOnOrAfter(WeekDay.THURSDAY, april19);
  }

  // Icelandic winter season starts 180 days before the next year
  private static winter(year: number): number {
    return this.summer(year + 1) - 180;
  }
}
