import { mod } from '../Astro';
import { gregorian, J0000, Month } from '../Const';
import { CalendarValidationException, LeapCalendar } from '../Calendar';

export class Symmetry010Calendar extends LeapCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day, Symmetry010Calendar.isLeapYear (year));
  }

  // Determine Julian day number from Symmetry010 calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    this.validate (year, month, day);
    const y1 = year - 1;

    return gregorian.EPOCH + 364 * y1 + 7 * Math.floor ((52 * y1 + 146) / 293) +
      30 * (month - 1) + Math.floor (month / 3) + day - 1;
  }

  public static validate (year: number, month: number, day: number) : void {
    debugger;
    if (month < 1 || month > 12) {
      throw new CalendarValidationException ('Invalid month');
    }

    const maxDays = ((month % 3) === 2) ? 31 :
      (month === 12 && this.isLeapYear (year)) ? 37 : 30;

    if (day < 1 || day > maxDays) {
      throw new CalendarValidationException ('Invalid day');
    }
  }

  // Is a given year in the Symmetry010 calendar a leap year?
  public static isLeapYear (year: number) : boolean {
    return 52 > ((52 * year + 146) % 293);
  }

  // Calculate Symmetry010 calendar date from Julian day
  public static fromJdn (jdn: number) {
    const jd0   = jdn - J0000; // Math.floor (jdn - 0.5) + 0.5 - J0000;
    let year    = 1 + Math.floor ((293 * jd0) / 107016);
    let yearDay = jd0 - 364 * (year - 1) - 7 * this.getLeapYearsBefore (year);

    if (yearDay < 1) {
      year -= 1;
      yearDay += this.isLeapYear (year) ? 371 : 364;
    }

    const diy = this.isLeapYear (year) ? 371 : 364;
    if (yearDay > diy) {
        yearDay -= diy;
        year += 1;
    }

    const offset  = Math.min (yearDay, 364) - 1;
    const quarter = Math.floor (offset / 91);
    let day       = yearDay - quarter * 91;
    let month     = 1 + quarter * 3;

    if (day > 61) {
        month += 2;
        day -= 61;
    } else if (day > 30) {
        month += 1;
        day -= 30;
    }

    return new Symmetry010Calendar (jdn, year, month, day);
  }

  private static getLeapYearsBefore (year: number) : number {
    return Math.floor ((52 * (year - 1) + 146) / 293);
  }
}
