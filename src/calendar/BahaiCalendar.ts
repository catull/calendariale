import { amod, deltaT, equationOfTime, equinox, mod } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, INVALID_VAHID, INVALID_YEAR, TROPICAL_YEAR, bahai } from '../Const';

import { BahaiCalendarDate } from './BahaiCalendarDate';
import { GregorianCalendar } from './GregorianCalendar';
import { CalendarDateValidationException } from './core';

export class BahaiCalendar {
  // Determine the year in the Bahai // astronomical calendar in which a
  // given Julian day falls.
  public static jdnToYear(jdn: number): number {
    return this.jdnToYearAndOffset(jdn)[0];
  }

  // Determine Julian day number from Bahai calendar date, where the year is
  // pre-calculated as
  //    1844 + 361 * (kull-i-shay - 1) + 19 * (vahid - 1) + year - 1
  public static toJdn(year: number, month: number, day: number): number {
    const kullIshay: number = Math.floor(year / 361) + 1;
    const vahid: number = Math.floor(mod(year - 1, 361) / 19) + 1;
    const y: number = amod(year, 19);

    return this.bahaiToJdn(kullIshay, vahid, y, month, day);
  }

  // Determine Julian day from Bahai date
  public static bahaiToJdn(kullIshay: number, vahid: number, year: number, month: number, day: number) {
    this.validate(kullIshay, vahid, year, month, day);

    const byear: number = 361 * (kullIshay - 1) + 19 * (vahid - 1) + year;
    const gy: number = byear + GregorianCalendar.fromJdn(bahai.EPOCH).getYear() - 1;

    let jd: number;
    let leap: boolean;
    let yearDays: number;

    if (byear < 172) {
      leap = GregorianCalendar.isLeapYear(gy + 1);
      jd = GregorianCalendar.toJdn(gy, 3, 20);
    } else {
      leap = this.isLeapYear(byear);
      jd = this.tehranEquinoxJd(gy);
    }

    if (month === 0) {
      yearDays = 342;
    } else if (month === 19) {
      yearDays = 342 + (leap ? 5 : 4);
    } else {
      yearDays = (month - 1) * 19;
    }

    return jd + yearDays + day;
  }

  public static validate(kullIshay: number, vahid: number, year: number, month: number, day: number): void {
    if (vahid < 1 || vahid > 19) {
      throw new CalendarDateValidationException(INVALID_VAHID);
    }

    if (year < 1 || year > 19) {
      throw new CalendarDateValidationException(INVALID_YEAR);
    }

    if (month < 0 || month > 19) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (month === 0) {
      const byear: number = 361 * (kullIshay - 1) + 19 * (vahid - 1) + year;
      const maxDay: number = this.isLeapYear(byear) ? 5 : 4;

      if (day < 1 || day > maxDay) {
        throw new CalendarDateValidationException(INVALID_DAY);
      }

      return;
    }

    if (day < 1 || day > 19) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  // Is a given year in the Bahai calendar a leap year?
  // Bahai uses same leap rule as Gregorian until 171 Bahai Era
  // From 172 onwards, it uses the Bahai leap year algorithm
  // The year 171 of the Bahai Era corresponds to Gregorian year 2015
  public static isLeapYear(year: number): boolean {
    const gy: number = 1843 + year;

    if (gy < 2015) {
      return GregorianCalendar.isLeapYear(gy);
    }

    const eq1: number = Math.floor(equinox(gy, 0) - 0.115192) + 0.5;
    const eq2: number = Math.floor(equinox(gy + 1, 0) - 0.115192) + 0.5;
    const days: number = eq2 - eq1;

    return days > 365;
  }

  // Calculate Bahai calendar date from Julian day
  public static fromJdn(jdn: number): BahaiCalendarDate {
    const jd0: number = Math.floor(jdn - 0.5) + 0.5;
    const old: boolean = jd0 < bahai.EPOCH172;

    let bys: number;
    let by: number[];
    let leap: boolean;

    if (old) {
      const gy: number = GregorianCalendar.fromJdn(jd0).getYear();
      leap = GregorianCalendar.isLeapYear(gy + 1);
      const bstarty: number = GregorianCalendar.fromJdn(bahai.EPOCH).getYear();
      bys = gy - (bstarty + (GregorianCalendar.toJdn(gy, 1, 1) <= jd0 &&
        jd0 <= GregorianCalendar.toJdn(gy, 3, 20) ? 1 : 0)) + 1;
      by = [0, 0];
    } else {
      by = this.jdnToYearAndOffset(jd0);
      bys = by[0];
      leap = this.isLeapYear(bys);
    }

    const kullIshay: number = Math.floor(bys / 361) + 1;
    const vahid: number = Math.floor(mod(bys - 1, 361) / 19) + 1;
    const year: number = amod(bys, 19);
    const leapDays: number = leap ? 5 : 4;
    const days: number = old ?
      jd0 - this.bahaiToJdn(kullIshay, vahid, year, 1, 1) + 1 :
      jd0 - by[1];

    let month: number;
    let day: number;

    if (days <= 18 * 19) {
      month = 1 + Math.floor((days - 1) / 19);
      day = amod(days, 19);
    } else if (days > 18 * 19 + leapDays) {
      month = 19;
      day = amod(days - leapDays - 1, 19);
    } else {
      month = 0;
      day = days - 18 * 19;
    }

    return new BahaiCalendarDate(jdn, kullIshay, vahid, year, month, day);
  }

  // Determine the year in the Bahai // astronomical calendar in which a
  // given Julian day falls.
  // Returns an array of two elements:
  //
  // **[0]** Bahai year
  // **[1]** Julian day number containing equinox for this year.
  private static jdnToYearAndOffset(jdn: number): number[] {
    return this.lastTehranEquinox(jdn, bahai.EPOCH);
  }

  // Determine Julian day and fraction of the
  // March equinox at the Tehran meridian in
  // a given Gregorian year.
  private static tehranEquinox(year: number): number {
    // March equinox in dynamical time
    const equJED: number = equinox(year, 0);

    // Correct for delta T to obtain Universal time
    const equJD: number = equJED - deltaT(year) / (24 * 60 * 60);

    // Apply the equation of time to yield the apparent time at Greenwich
    const equAPP: number = equJD + equationOfTime(equJED);

    // Finally, we must correct for the constant difference between
    // the Greenwich meridian andthe time zone standard for
    // Iran Standard time, 52°30' to the East.
    return equAPP + 52.5 / 360;
  }

  // Calculate Julian day during which the
  // March equinox, reckoned from the Tehran
  // meridian, occurred for a given Gregorian year.
  private static tehranEquinoxJd(year: number): number {
    const ep: number = this.tehranEquinox(year);
    const epg: number = Math.floor(ep - 0.5) + 0.5;

    return epg;
  }

  // Determine the year in the astronomical calendar in which a
  // given Julian day falls, given the epoch.
  // Returns an array of two elements:
  //
  // **[0]** Persian year
  // **[1]** Julian day number containing equinox for this year.
  private static lastTehranEquinox(jd: number, epoch: number): number[] {
    let guess: number = GregorianCalendar.fromJdn(jd).getYear() - 2;
    let lasteq: number = this.tehranEquinoxJd(guess);

    while (lasteq > jd) {
      guess -= 1;
      lasteq = this.tehranEquinoxJd(guess);
    }

    let nexteq: number = lasteq - 1;

    while (lasteq > jd || jd >= nexteq) {
      lasteq = nexteq;
      guess += 1;
      nexteq = this.tehranEquinoxJd(guess);
    }

    const adr: number = Math.round((lasteq - epoch) / TROPICAL_YEAR) + 1;

    return [adr, lasteq];
  }

}
