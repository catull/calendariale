import { amod, deltaT, equationOfTime, equinox, mod } from '../Astro';
import { french, TROPICAL_YEAR } from '../Const';
import { YearMonthCalendar } from '../Calendar';
import { GregorianCalendar } from './GregorianCalendar';

export class FrenchRevolutionaryCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, private decade: number, day: number) {
    super (jdn, year, month, day);
  }

  // Obtain Julian day from a given French Revolutionary calendar date.
  public static toJdn (an: number, mois: number, decadi: number, jour: number) : number {
    let adr, equinoxe, guess, jdn;

    guess = french.EPOCH + TROPICAL_YEAR * (an - 2);
    adr = [ an - 1, 0 ];

    while (adr[0] < an) {
      adr = this.anneeDeLaRevolution (guess);
      guess = adr[1] + TROPICAL_YEAR + 2;
    }

    equinoxe = adr[1];

    return equinoxe + 30 * (mois - 1) + 10 * (decadi - 1) + jour - 1;
  }

  // Calculate date in the French Revolutionary calendar from Julian day.
  // The five or six "sansculottides" are considered a thirteenth month in the
  // results of this function.
  public static fromJdn (jdn: number) {
    let jd0, an, mois, decadi, jour, adr, equinoxe;

    jd0      = Math.floor (jdn) + 0.5;
    adr      = this.anneeDeLaRevolution (jd0);
    an       = adr[0];
    equinoxe = adr[1];
    mois     = Math.floor ((jd0 - equinoxe) / 30) + 1;
    jour     = (jd0 - equinoxe) % 30;
    decadi   = Math.floor (jour / 10) + 1;
    jour     = jour % 10 + 1;

    return new FrenchRevolutionaryCalendar (jdn, an, mois, decadi, jour);
  }

  // Determine Julian day and fraction of the September equinox at the Paris
  // meridian in a given Gregorian year.
  private static equinoxeAParis (year: number) : number {
    let equJED, equJD, equAPP, equParis, dtParis;

    // September equinox in dynamical time
    equJED = equinox (year, 2);

    // Correct for delta T to obtain Universal time
    equJD = equJED - deltaT (year) / (24 * 60 * 60);

    // Apply the equation of time to yield the apparent time at Greenwich
    equAPP = equJD + equationOfTime (equJED);

    // Finally, we must correct for the constant difference between
    // the Greenwich meridian and that of Paris, 2°20'15" to the East.
    dtParis = (2 + 20 / 60.0 + 15 / (60 * 60.0)) / 360;
    equParis = equAPP + dtParis;

    return equParis;
  }

  // Calculate Julian day during which the September equinox, reckoned from
  // the Paris meridian, occurred for a given Gregorian year.
  private static parisEquinoxeJd (year: number) : number {
    const ep  = this.equinoxeAParis (year);

    return Math.floor (ep - 0.5) + 0.5;
  }

  // Determine the year in the French
  // revolutionary calendar in which a given Julian day falls.
  // Returns an array of two elements:
  //
  // **[0]** Année de la Révolution
  // **[1]** Julian day number containing equinox for this year.
  private static anneeDeLaRevolution (jdn: number) : number[] {
    let guess = GregorianCalendar.fromJdn (jdn).getYear () - 2,
      lasteq, nexteq, adr;

    lasteq = this.parisEquinoxeJd (guess);

    while (lasteq > jdn) {
      guess -= 1;
      lasteq = this.parisEquinoxeJd (guess);
    }

    nexteq = lasteq - 1;

    while (lasteq > jdn || jdn >= nexteq) {
      lasteq = nexteq;
      guess += 1;
      nexteq = this.parisEquinoxeJd (guess);
    }

    adr = Math.round ((lasteq - french.EPOCH) / TROPICAL_YEAR) + 1;

    return [ adr, lasteq ];
  }
}
