import { mod } from '../Astro';
import { coptic } from '../Const';
import { YearMonthCalendar } from '../Calendar';

export class CopticCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day);
  }

  // Is a given year in the Coptic calendar a leap year?
  public static isLeapYear (year: number): boolean {
    return mod (year, 4) === 3;
  }

  // Determine Julian day number from Coptic calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    return coptic.EPOCH - 1  + 365 * (year - 1)  +
            Math.floor (year / 4) + 30 * (month - 1)  + day;
  }

  // Calculate Coptic calendar date from Julian day
  public static fromJdn (jdn: number) {
    const year  = Math.floor ((4 * (jdn - coptic.EPOCH) + 1463) / 1461);
    const month = 1 + Math.floor ((jdn - this.toJdn (year, 1, 1)) / 30);
    const day   = jdn + 1 - this.toJdn (year, month, 1);

    return new CopticCalendar (jdn, year, month, day);
  }
}
