import {
  amod,
  estimatePriorSolarLongitude,
  newMoonAtOrAfter,
  newMoonBefore,
  next,
  solarLongitude,
  standardToUniversal,
  universalToStandard,
} from '../Astro';
import {
  INVALID_DAY,
  INVALID_LEAP_MONTH,
  INVALID_MONTH,
  INVALID_YEAR,
  J0000,
  MEAN_SYNODIC_MONTH,
  MEAN_TROPICAL_YEAR,
  Season,
  chinese,
} from '../Const';
import { Location } from '../Location';

import { ChineseDate } from './ChineseDate';
import { CalendarDateValidationException } from './core';

export class ChineseCalendar {
  // Calculate Chinese calendar date from rata die
  public static fromRd(rataDie: number): ChineseDate {
    const s1: number = this.chineseWinterSolsticeOnOrBefore(rataDie);
    const s2: number = this.chineseWinterSolsticeOnOrBefore(s1 + 370);
    const nextM11: number = this.chineseNewMoonBefore(1 + s2);
    const m12: number = this.chineseNewMoonOnOrAfter(1 + s1);
    const yearLeap: boolean = Math.round((nextM11 - m12) / MEAN_SYNODIC_MONTH) === 12;

    const m: number = this.chineseNewMoonBefore(1 + rataDie);
    const month: number = amod(
      Math.round((m - m12) / MEAN_SYNODIC_MONTH) - (yearLeap && this.isChinesePriorLeapMonth(m12, m) ? 1 : 0),
      12,
    );
    const monthLeap: boolean =
      yearLeap && this.isChineseNoMajorSolarTerm(m) && !this.isChinesePriorLeapMonth(m12, this.chineseNewMoonBefore(m));
    const years: number = Math.floor(1.5 - month / 12 + (rataDie - this.getEpochRD()) / MEAN_TROPICAL_YEAR);
    const cycle: number = 1 + Math.floor((years - 1) / 60);
    const year: number = amod(years, 60);
    const day: number = 1 + rataDie - m;

    return this.createDate(rataDie + J0000, cycle, year, month, monthLeap, day);
  }

  public static fromJdn(jdn: number): ChineseDate {
    return this.fromRd(jdn - J0000);
  }

  // Determine Julian day number (JDN) from Chinese calendar date
  public static toJdn(cycle: number, year: number, month: number, monthLeap: boolean, day: number): number {
    const jdn = this.calculateJdn(cycle, year, month, monthLeap, day);
    this.validate(cycle, year, month, monthLeap, day, jdn);

    return jdn;
  }

  protected static createDate(
    jdn: number,
    cycle: number,
    year: number,
    month: number,
    monthLeap: boolean,
    day: number,
  ): ChineseDate {
    return new ChineseDate(jdn, cycle, year, month, monthLeap, day);
  }

  protected static getEpochRD(): number {
    return chinese.EPOCH_RD;
  }

  // Return location of Beijing; time zone varies with time.
  protected static getLocation(rataDie: number): Location {
    return rataDie < chinese.EPOCH_1929_RD ? chinese.LOCATION_BEFORE_1929 : chinese.LOCATION_SINCE_1929;
  }

  // Determine Julian day number (JDN) from Chinese calendar date
  private static calculateJdn(cycle: number, year: number, month: number, monthLeap: boolean, day: number): number {
    const midYear =
      Math.floor(this.getEpochRD() + J0000 + ((cycle - 1) * 60 + year - 0.5) * MEAN_TROPICAL_YEAR) - J0000;
    const newYear = this.chineseNewYearOnOrBefore(midYear);
    const p = this.chineseNewMoonOnOrAfter(newYear + (month - 1) * 29);
    const d = this.fromRd(p);
    const priorNewMoon =
      month === d.getMonth() && monthLeap === d.isMonthLeap() ? p : this.chineseNewMoonOnOrAfter(1 + p);

    return priorNewMoon + J0000 + day - 1;
  }

  private static validate(cycle: number, year: number, month: number, monthLeap: boolean, day: number, jdn: number) {
    if (year < 1 || year > 60) {
      throw new CalendarDateValidationException(INVALID_YEAR);
    }

    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    const date: ChineseDate = this.fromJdn(jdn);
    if (monthLeap && !date.isMonthLeap()) {
      throw new CalendarDateValidationException(INVALID_LEAP_MONTH);
    }

    if (date.getDay() !== day || day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  // Return True if there is a Chinese leap month on or after lunar month starting on
  // rata die mPrime and at or before lunar month starting at m.
  private static isChinesePriorLeapMonth(mPrime: number, m: number): boolean {
    return (
      m >= mPrime &&
      (this.isChineseNoMajorSolarTerm(m) || this.isChinesePriorLeapMonth(mPrime, this.chineseNewMoonBefore(m)))
    );
  }

  // Return rata die of Chinese New Year in given Gregorian year.
  /*
  private static chineseNewYear(gYear: number): number {
    return this.chineseNewYearOnOrBefore(GregorianDate.toJdn(gYear, Month.JULY, 1));
  }
  */

  // Return rata die of Chinese New Year on or before given date.
  private static chineseNewYearOnOrBefore(rataDie: number): number {
    const newYear: number = this.chineseNewYearInSui(rataDie);

    return rataDie >= newYear ? newYear : this.chineseNewYearInSui(rataDie - 180);
  }

  // Return rata die of Chinese New Year in sui (period from solstice
  // to solstice) containing given date.
  private static chineseNewYearInSui(rataDie: number): number {
    const s1: number = this.chineseWinterSolsticeOnOrBefore(rataDie);
    const s2: number = this.chineseWinterSolsticeOnOrBefore(s1 + 370);
    const nextM11: number = this.chineseNewMoonBefore(1 + s2);
    const m12: number = this.chineseNewMoonOnOrAfter(1 + s1);
    const m13: number = this.chineseNewMoonOnOrAfter(1 + m12);
    const yearLeap: boolean = Math.round((nextM11 - m12) / MEAN_SYNODIC_MONTH) === 12;

    if (yearLeap && (this.isChineseNoMajorSolarTerm(m12) || this.isChineseNoMajorSolarTerm(m13))) {
      return this.chineseNewMoonOnOrAfter(1 + m13);
    }

    return m13;
  }

  // Return rata die (Beijing) of first new moon before given date.
  private static chineseNewMoonBefore(rataDie: number): number {
    const tee: number = newMoonBefore(this.midnightInChina(rataDie));

    return Math.floor(universalToStandard(tee, this.getLocation(tee)));
  }

  // Return rata die (Beijing) of first new moon on or after given date.
  private static chineseNewMoonOnOrAfter(rataDie: number): number {
    const tee: number = newMoonAtOrAfter(this.midnightInChina(rataDie));

    return Math.floor(universalToStandard(tee, this.getLocation(tee)));
  }

  // Return rata die in the Chinese zone, of winter solstice on or before given date.
  private static chineseWinterSolsticeOnOrBefore(rataDie: number): number {
    const approx: number = estimatePriorSolarLongitude(Season.WINTER, this.midnightInChina(rataDie + 1));

    return next(Math.floor(approx) - 1, (day: number) => Season.WINTER < solarLongitude(this.midnightInChina(1 + day)));
  }

  // Return Universal time of (clock) midnight at start of given date, in China.
  private static midnightInChina(rataDie: number): number {
    return standardToUniversal(rataDie, this.getLocation(rataDie));
  }

  // Does the Chinese lunar month starting on given date have no major solar term ?
  private static isChineseNoMajorSolarTerm(rataDie: number): boolean {
    const newMoon: number = this.chineseNewMoonOnOrAfter(rataDie + 1);

    return this.currentMajorSolarTerm(rataDie) === this.currentMajorSolarTerm(newMoon);
  }

  // Return moment (in Beijing) of the first Chinese minor solar term (jieqi)
  // on or after given date.
  // The minor terms begin when the sun's longitude is an odd multiple of 15 degrees.
  /*
  private static minorSolarTermOnOrAfter(rataDie: number): number {
    const s: number = solarLongitude(this.midnightInChina(rataDie));
    const l: number = mod(30 * Math.ceil((s - 15) / 30) + 15, 360);

    return this.chineseSolarLongitudeOnOrAfter(l, rataDie);
  }
  */

  // Return last Chinese minor solar term (jieqi) before given date.
  /*
  private static currentMinorSolarTerm(rataDie: number): number {
    const s: number = solarLongitude(
      standardToUniversal(rataDie, this.chineseLocation(rataDie)));

    return amod(3 + Math.floor((s - 15) / 30), 12);
  }
  */

  // Return moment (in Beijing) of the first Chinese major solar term (zhongqi)
  // on or after given date.
  // The major terms begin when the sun's longitude is a multiple of 30 degrees.
  /*
  private static majorSolarTermOnOrAfter(rataDie: number): number {
    const s: number = solarLongitude(this.midnightInChina(rataDie));
    const l: number = mod(30 * Math.ceil(s / 30), 360);

    return this.chineseSolarLongitudeOnOrAfter(l, rataDie);
  }
  */

  // Return last Chinese major solar term (zhongqi) before given date.
  private static currentMajorSolarTerm(date: number): number {
    const s: number = Math.floor(solarLongitude(standardToUniversal(date, this.getLocation(date))));

    return amod(2 + Math.floor(s / 30), 12);
  }

  // Return moment (Beijing time) of the first date on or after given date,
  // (Beijing time) when the solar longitude will be 'lambda' degrees.
  /*
  private static chineseSolarLongitudeOnOrAfter(lambda: number, rataDie: number): number {
    const tee: number = solarLongitudeAfter(lambda, standardToUniversal(rataDie, this.chineseLocation(rataDie)));

    return universalToStandard(tee, this.chineseLocation(tee));
  }
  */
}
