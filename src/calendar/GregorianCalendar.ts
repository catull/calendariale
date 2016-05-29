import { mod } from '../Astro';
import { gregorian } from '../Const';
import { YearMonthCalendar } from '../Calendar';

export class GregorianCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day);

     this.yearLeap = GregorianCalendar.isLeapYear (year);
  }

  // Determine Julian day number from Gregorian calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    const y1: number = year - 1;

    return gregorian.EPOCH - 1 + 365 * y1 +
        Math.floor (y1 / 4) -
        Math.floor (y1 / 100) +
        Math.floor (y1 / 400) +
        Math.floor ((367 * month - 362) / 12 +
          (month <= 2 ? 0 : GregorianCalendar.isLeapYear (year) ? -1 : -2) + day);
  }

  // Is a given year in the Gregorian calendar a leap year?
  public static isLeapYear (year: number) : boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  public static jdnToYear (jdn: number) : number {
    const jd0        = Math.floor (jdn - 0.5) + 0.5;
    const depoch     = jd0 - gregorian.EPOCH;
    const quadricent = Math.floor (depoch / 146097);
    const dqc        = mod (depoch, 146097);
    const cent       = Math.floor (dqc / 36524);
    const dcent      = mod (dqc, 36524);
    const quad       = Math.floor (dcent / 1461);
    const dquad      = mod (dcent, 1461);
    const yindex     = Math.floor (dquad / 365);

    return quadricent * 400 + cent * 100 + quad * 4 + yindex + ((cent !== 4 && yindex !== 4) ? 1 : 0);
  }

  // Calculate Gregorian calendar date from Julian day
  public static fromJdn (jdn: number) {
    const jd0     = Math.floor (jdn - 0.5) + 0.5;
    const year    = GregorianCalendar.jdnToYear (jd0);
    const yearDay = jd0 - GregorianCalendar.toJdn (year, 1, 1);
    const leapAdj = jd0 < GregorianCalendar.toJdn (year, 3, 1) ? 0 : GregorianCalendar.isLeapYear (year) ? 1 : 2;
    const month   = Math.floor (((yearDay + leapAdj) * 12 + 373) / 367);
    const day     = jd0 - GregorianCalendar.toJdn (year, month, 1) + 1;

    return new GregorianCalendar (jdn, year, month, day);
  }

  public static dateDifference (date1: GregorianCalendar, date2: GregorianCalendar) : number {
    return date2.getJdn () - date1.getJdn ();
  }
}
