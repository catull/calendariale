import { INVALID_DAY, INVALID_MONTH, J0000, gregorian } from '../Const';

import { Symmetry010Date } from './Symmetry010Date';
import { CalendarDateValidationException } from './core/index';

export class Symmetry010Calendar {
  // Calculate Symmetry010 calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): Symmetry010Date {
    const jd0: number = jdn - J0000;
    const year: number = 1 + Math.floor((293 * jd0) / 107016);
    const yearDay: number = jd0 - 364 * (year - 1) - 7 * this.getLeapYearsBefore(year);

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

    if (day > 61) {
      month += 2;
      day -= 61;
    } else if (day > 30) {
      month += 1;
      day -= 30;
    }

    return new Symmetry010Date(jdn, year, month, day);
  }

  // Determine Julian day number (JDN) from Symmetry010 calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);
    const y1: number = year - 1;

    return (
      gregorian.EPOCH +
      364 * y1 +
      7 * Math.floor((52 * y1 + 146) / 293) +
      30 * (month - 1) +
      Math.floor(month / 3) +
      day -
      1
    );
  }

  // Is a given year in the Symmetry010 calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return 52 > (52 * year + 146) % 293;
  }

  private static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    const maxDays: number = month % 3 === 2 ? 31 : month === 12 && this.isLeapYear(year) ? 37 : 30;

    if (day < 1 || day > maxDays) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  private static getLeapYearsBefore(year: number): number {
    return Math.floor((52 * (year - 1) + 146) / 293);
  }
}
