import { mod } from '../Astro';
import { julian, Month } from '../Const';
import { CalendarValidationException, LeapCalendar } from '../Calendar';

export const daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

export class JulianCalendar extends LeapCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day, JulianCalendar.isLeapYear (year));
  }

  // Is a given year in the Julian calendar a leap year?
  public static isLeapYear (year: number) : boolean {
    return mod (year, 4) === (year > 0 ? 0 : 3);
  }

  // Determine Julian day number from Julian calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    this.validate (year, month, day);

    let y = year,
        m = month;

    // Adjust negative common era years to the zero-based notation we use.
    if (y < 1) {
      y += 1;
    }

    // Algorithm as given in *Meeus, **Astronomical Algorithms**, Chapter 7, page 61*
    if (m <= 2) {
      y -= 1;
      m += 12;
    }

    return Math.floor (365.25 * (y + 4716)) +
      Math.floor (30.6001 * (m + 1)) +
      day - 1524.5;
  }

  public static validate (year: number, month: number, day: number) : void {
    if (month < 1 || month > 12) {
      throw new CalendarValidationException ('Invalid month');
    }

    if (day < 1) {
      throw new CalendarValidationException ('Invalid day');
    }

    const febDays = this.isLeapYear (year) ? 29 : 28;

    if (month === Month.FEBRUARY && day <= febDays) {
        return;
    }

    if (daysInMonth[month - 1] < day) {
      throw new CalendarValidationException ('Invalid day');
    }
  }

  // Calculate Julian calendar date from Julian day
  public static fromJdn (jdn: number) {
    const b = Math.floor (jdn + 0.5) + 1524;
    const c = Math.floor ((b - 122.1) / 365.25);
    const d = Math.floor (365.25 * c);
    const e = Math.floor ((b - d) / 30.6001);

    const month = Math.floor (e < 14 ? e - 1 : e - 13);
    let   year  = Math.floor (month > 2 ? c - 4716 : c - 4715);
    const day   = b - d - Math.floor (30.6001 * e);

    // If year is less than 1, subtract one to convert from
    // a zero based date system to the common era system in
    // which the year -1 (1 B.C.E) is followed by year 1 (1 C.E.).
    if (year < 1) {
      year -= 1;
    }

    return new JulianCalendar (jdn, year, month, day);
  }
}
