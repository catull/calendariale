import { phasisOnOrAfter, phasisOnOrBefore, solarLongitudeAfter, standardToUniversal, sunset } from '../Astro';
import { hebrew, HebrewMonth, J0000, Season } from '../Const';
import { CalendarValidationException, YearMonthCalendar } from '../Calendar';
import { GregorianCalendar } from './GregorianCalendar';
import { HebrewCalendar } from './HebrewCalendar';

export class HebrewObservationalCalendar extends YearMonthCalendar {
  // Determine Julian day number from Hebrew calendar date
  public static toJdn(year: number, month: number, day: number): number {
    const jdn: number = this.calculateJdn(year, month, day);

    const date: HebrewObservationalCalendar = this.fromJdn(jdn);
    if (day < 1 || day !== date.day) {
      throw new CalendarValidationException('Invalid day');
    }
    if (month < 1 || date.month !== month) {
      throw new CalendarValidationException('Invalid month');
    }

    return jdn;
  }

  // Determine Julian day number from Hebrew calendar date
  public static calculateJdn(year: number, month: number, day: number): number {
    const year1: number = (month >= HebrewMonth.TISHRI) ? (year - 1) : year;
    const start: number = HebrewCalendar.toJdn(year1, HebrewMonth.NISAN, 1);
    const gYear: number = GregorianCalendar.jdnToYear(start + 60);
    const newYear: number = this.toNewYear(gYear) + 0.5;
    const midMonth: number = newYear + Math.round(29.5 * (month - 1)) + 15;

    return phasisOnOrBefore(midMonth, hebrew.JAFFA_LOCATION) + day - 0.5;
  }

  // Convert Julian date to Hebrew date
  // This works by making multiple calls to the inverse function, performing slowly.
  public static fromJdn(jdn: number): HebrewObservationalCalendar {
    const crescent: number = phasisOnOrBefore(jdn, hebrew.JAFFA_LOCATION);
    const gYear: number = GregorianCalendar.jdnToYear(jdn);
    const newYear: number = this.toNewYear(gYear);
    const newYear2: number = (jdn < newYear) ? this.toNewYear(gYear - 1) : newYear;
    const month: number = Math.round((crescent - newYear2) / 29.5) + 1;
    const year: number = HebrewCalendar.fromJdn(newYear2).getYear() + (month >= HebrewMonth.TISHRI ? 1 : 0);
    const day: number = jdn - crescent + 1;

    return new HebrewObservationalCalendar(jdn, year, month, day);
  }

  // Return jdn of Observational (classical) Nisan 1 occurring in Gregorian year.
  private static toNewYear(year: number): number {
    const jan1: number = GregorianCalendar.toJdn(year, 1, 1) - J0000;
    const equinox: number = solarLongitudeAfter(Season.SPRING, jan1);
    const sset: number = standardToUniversal(sunset(Math.floor(equinox), hebrew.JAFFA_LOCATION), hebrew.JAFFA_LOCATION);

    return phasisOnOrAfter(Math.floor(equinox) - ((equinox < sset) ? 14 : 13), hebrew.JAFFA_LOCATION);
  }

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day);
  }

}
