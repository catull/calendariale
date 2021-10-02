import { INVALID_DAY, INVALID_MONTH, J0000, gregorian } from '../Const';

import { Symmetry454Date } from './Symmetry454Date';
import { CalendarDateValidationException } from './core/CalendarDateValidationException';

export class Symmetry454Calendar {
  // Calculate Symmetry454 calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): Symmetry454Date {
    const jd0: number = jdn - J0000;
    const year: number = 1 + Math.floor((293 * jd0) / 107016);
    const yearDay: number = jd0 - 364 * (year - 1) - 7 * Symmetry454Calendar.getLeapYearsBefore(year);

    // if (yearDay < 1) {
    //   year -= 1;
    //   yearDay += this.isLeapYear(year) ? 371 : 364;
    // }

    // const diy: number = this.isLeapYear(year) ? 371 : 364;
    // if (yearDay > diy) {
    //   yearDay -= diy;
    //   year += 1;
    // }

    const offset: number = Math.min(yearDay, 364) - 1;
    const quarter: number = Math.floor(offset / 91);
    let day: number = yearDay - quarter * 91;
    let month: number = 1 + quarter * 3;

    if (day > 63) {
      month += 2;
      day -= 63;
    } else if (day > 28) {
      month += 1;
      day -= 28;
    }

    return new Symmetry454Date(jdn, year, month, day);
  }

  // Determine Julian day number (JDN) from Symmetry454 calendar date
  public static toJdn(year: number, month: number, day: number): number {
    Symmetry454Calendar.validate(year, month, day);
    const y1: number = year - 1;

    return (
      gregorian.EPOCH +
      364 * y1 +
      7 * Math.floor((52 * y1 + 146) / 293) +
      28 * (month - 1) +
      7 * Math.floor(month / 3) +
      day -
      1
    );
  }

  // Is a given year in the Symmetry454 calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return 52 > (52 * year + 146) % 293;
  }

  private static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    const maxDays: number = month % 3 === 2 || (month === 12 && Symmetry454Calendar.isLeapYear(year)) ? 35 : 28;

    if (day < 1 || day > maxDays) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  private static getLeapYearsBefore(year: number): number {
    return Math.floor((52 * (year - 1) + 146) / 293);
  }
}
