import { mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, Month, gregorian } from '../Const';

import { GregorianCalendarDate } from './GregorianCalendarDate';
import { CalendarDateValidationException } from './core';

const daysInMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export class GregorianCalendar {
  // Determine Julian day number from Gregorian calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const y1: number = year - 1;

    return gregorian.EPOCH - 1 + 365 * y1 +
      Math.floor(y1 / 4) -
      Math.floor(y1 / 100) +
      Math.floor(y1 / 400) +
      Math.floor((367 * month - 362) / 12 +
        (month <= 2 ? 0 : GregorianCalendar.isLeapYear(year) ? -1 : -2) + day);
  }

  public static validate(year: number, month: number, day: number): void {
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

    if (daysInMonth[month - 1] < day) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  // Is a given year in the Gregorian calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  public static jdnToYear(jdn: number): number {
    const jd0: number = Math.floor(jdn - 0.5) + 0.5;
    const depoch: number = jd0 - gregorian.EPOCH;
    const quadricent: number = Math.floor(depoch / 146097);
    const dqc: number = mod(depoch, 146097);
    const cent: number = Math.floor(dqc / 36524);
    const dcent: number = mod(dqc, 36524);
    const quad: number = Math.floor(dcent / 1461);
    const dquad: number = mod(dcent, 1461);
    const yindex: number = Math.floor(dquad / 365);

    return quadricent * 400 + cent * 100 + quad * 4 + yindex + ((cent !== 4 && yindex !== 4) ? 1 : 0);
  }

  // Calculate Gregorian calendar date from Julian day
  public static fromJdn(jdn: number): GregorianCalendarDate {
    const jd0: number = Math.floor(jdn - 0.5) + 0.5;
    const year: number = GregorianCalendar.jdnToYear(jd0);
    const yearDay: number = jd0 - GregorianCalendar.toJdn(year, 1, 1);
    const leapAdj: number = jd0 < GregorianCalendar.toJdn(year, 3, 1) ? 0 : GregorianCalendar.isLeapYear(year) ? 1 : 2;
    const month: number = Math.floor(((yearDay + leapAdj) * 12 + 373) / 367);
    const day: number = jd0 - GregorianCalendar.toJdn(year, month, 1) + 1;

    return new GregorianCalendarDate(jdn, year, month, day);
  }

  public static dateDifference(date1: GregorianCalendarDate, date2: GregorianCalendarDate): number {
    return date2.getJdn() - date1.getJdn();
  }

}
