import { phasisOnOrAfter, phasisOnOrBefore, solarLongitudeAfter, standardToUniversal, sunset } from '../Astro';
import { hebrew, HebrewMonth, J0000, Season } from '../Const';
import { YearMonthCalendar } from '../Calendar';
import { GregorianCalendar } from './GregorianCalendar';
import { HebrewCalendar } from './HebrewCalendar';

export class HebrewObservationalCalendar extends YearMonthCalendar {
  constructor (jdn: number, year : number, month : number, day : number) {
    super (jdn, year, month, day);
  }

  // Determine Julian day number from Hebrew calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    const year1    = (month >= HebrewMonth.TISHRI) ? (year - 1) : year;
    const start    = HebrewCalendar.toJdn (year1, HebrewMonth.NISAN, 1);
    const gYear    = GregorianCalendar.jdnToYear (start + 60);
    const newYear  = this.toNewYear (gYear) + 0.5;
    const midMonth = newYear + Math.round (29.5 * (month - 1)) + 15;

    return phasisOnOrBefore (midMonth, hebrew.JAFFA_LOCATION) + day - 0.5;
  }

  // Convert Julian date to Hebrew date
  // This works by making multiple calls to the inverse function, performing slowly.
  public static fromJdn (jdn: number) {
    const crescent = phasisOnOrBefore (jdn, hebrew.JAFFA_LOCATION);
    const gYear    = GregorianCalendar.jdnToYear (jdn);
    const newYear  = this.toNewYear (gYear);
    const newYear2 = (jdn < newYear) ? this.toNewYear (gYear - 1) : newYear;
    const month    = Math.round ((crescent - newYear2) / 29.5) + 1;
    const year     = HebrewCalendar.fromJdn (newYear2).getYear () + (month >= HebrewMonth.TISHRI ? 1 : 0);
    const day      = jdn - crescent + 1;

    return new HebrewObservationalCalendar (jdn, year, month, day);
  }

  // Return jdn of Observational (classical) Nisan 1 occurring in Gregorian year.
  private static toNewYear (year: number) {
    const jan1    = GregorianCalendar.toJdn (year, 1, 1) - J0000;
    const equinox = solarLongitudeAfter (Season.SPRING, jan1);
    const sset    = standardToUniversal (sunset (Math.floor (equinox), hebrew.JAFFA_LOCATION), hebrew.JAFFA_LOCATION);

    return phasisOnOrAfter (Math.floor (equinox) - ((equinox < sset) ? 14 : 13), hebrew.JAFFA_LOCATION);
  }
}
