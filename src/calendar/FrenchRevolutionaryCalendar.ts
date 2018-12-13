import { deltaT, equationOfTime, equinox } from '../Astro';
import { INVALID_DECADI, INVALID_JOUR, INVALID_MOIS, TROPICAL_YEAR, french } from '../Const';

import { GregorianCalendar } from './GregorianCalendar';
import { CalendarValidationException, YearMonthCalendar } from './core';

export class FrenchRevolutionaryCalendar extends YearMonthCalendar {
  // Obtain Julian day from a given French Revolutionary calendar date.
  public static toJdn(an: number, mois: number, decade: number, jour: number): number {
    this.validate(an, mois, decade, jour);

    let guess: number = french.EPOCH + TROPICAL_YEAR * (an - 2);
    let adr: number[] = [an - 1, 0];

    while (adr[0] < an) {
      adr = this.anneeDeLaRevolution(guess);
      guess = adr[1] + TROPICAL_YEAR + 2;
    }

    const equinoxe: number = adr[1];
    const m: number = mois === 0 ? 12 : mois - 1;

    return equinoxe + 30 * m + 10 * (decade - 1) + jour - 1;
  }

  // Calculate date in the French Revolutionary calendar from Julian day.
  // The five or six "sansculottides" are considered a thirteenth month in the
  // results of this function.
  public static fromJdn(jdn: number): FrenchRevolutionaryCalendar {
    const jd0: number = Math.floor(jdn) + 0.5;
    const adr: number[] = this.anneeDeLaRevolution(jd0);
    const an: number = adr[0];
    const equinoxe: number = adr[1];
    let mois: number = Math.floor((jd0 - equinoxe) / 30) + 1;
    if (13 === mois) {
      mois = 0;
    }
    let jour: number = (jd0 - equinoxe) % 30;
    const decade: number = Math.floor(jour / 10) + 1;
    jour = jour % 10 + 1;

    return new FrenchRevolutionaryCalendar(jdn, an, mois, decade, jour);
  }

  public static isLeapYear(year: number): boolean {
    const equinox0: number = this.parisEquinoxeJd(year + 1791);
    const equinox1: number = this.parisEquinoxeJd(year + 1792);

    return equinox1 - equinox0 > 365;
  }

  public static validate(an: number, mois: number, decade: number, jour: number): void {
    if (mois < 0 || mois > 12) {
      throw new CalendarValidationException(INVALID_MOIS);
    }

    if (decade < 1 || decade > 3) {
      throw new CalendarValidationException(INVALID_DECADI);
    }

    const sansCullotides: number = this.isLeapYear(an) ? 6 : 5;

    if (mois === 0 && jour > sansCullotides) {
      throw new CalendarValidationException(INVALID_JOUR);
    }

    if (jour < 1 || jour > 10) {
      throw new CalendarValidationException(INVALID_JOUR);
    }
  }

  // Determine the year in the French
  // revolutionary calendar in which a given Julian day falls.
  // Returns an array of two elements:
  //
  // **[0]** Année de la Révolution
  // **[1]** Julian day number containing equinox for this year.
  private static anneeDeLaRevolution(jdn: number): number[] {
    let guess = GregorianCalendar.fromJdn(jdn).getYear() - 2;
    let lasteq: number = this.parisEquinoxeJd(guess);

    while (lasteq > jdn) {
      guess -= 1;
      lasteq = this.parisEquinoxeJd(guess);
    }

    let nexteq: number = lasteq - 1;

    while (lasteq > jdn || jdn >= nexteq) {
      lasteq = nexteq;
      guess += 1;
      nexteq = this.parisEquinoxeJd(guess);
    }

    const adr: number = Math.round((lasteq - french.EPOCH) / TROPICAL_YEAR) + 1;

    return [adr, lasteq];
  }

  // Calculate Julian day during which the September equinox, reckoned from
  // the Paris meridian, occurred for a given Gregorian year.
  private static parisEquinoxeJd(year: number): number {
    const ep: number = this.equinoxeAParis(year);

    return Math.floor(ep - 0.5) + 0.5;
  }

  // Determine Julian day and fraction of the September equinox at the Paris
  // meridian in a given Gregorian year.
  private static equinoxeAParis(year: number): number {
    // September equinox in dynamical time
    const equJED: number = equinox(year, 2);

    // Correct for delta T to obtain Universal time
    const equJD: number = equJED - deltaT(year) / (24 * 60 * 60);

    // Apply the equation of time to yield the apparent time at Greenwich
    const equAPP: number = equJD + equationOfTime(equJED);

    // Finally, we must correct for the constant difference between
    // the Greenwich meridian and that of Paris, 2°20'15" to the East.
    const dtParis: number = (2 + 20 / 60.0 + 15 / (60 * 60.0)) / 360;
    const equParis: number = equAPP + dtParis;

    return equParis;
  }

  constructor(jdn: number, an: number, mois: number, private decade: number, jour: number) {
    super(jdn, an, mois, jour);
  }

  public getDecade (): number {
    return this.decade;
  }
}
