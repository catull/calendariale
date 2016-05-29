import { mod } from '../Astro';
import { french } from '../Const';
import { YearMonthCalendar } from '../Calendar';

export class FrenchArithmeticCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day);
  }

  // Is the given year a leap year in the French Arithmetic calendar ?
  public static isLeapYear (year: number) : boolean {
    const m400 = (mod (year, 400));

    return (mod (year, 4) === 0) &&
           (m400 !== 100 && m400 !== 200 && m400 !== 300)  &&
           (mod (year, 4000) !== 0);
  }

  // Determine Julian day number from French Arithmetic calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    const y1 = year - 1;

    return french.EPOCH - 1       +
           365 * y1               +
           Math.floor (y1 / 4)    -
           Math.floor (y1 / 100)  +
           Math.floor (y1 / 400)  -
           Math.floor (y1 / 4000) +
           30 * (month - 1)       +
           day;
  }

  // Calculate date in the French Arithmetic calendar from Julian day.
  public static fromJdn (jdn: number) {
    const approx = Math.floor ((jdn - french.EPOCH + 2) / (1460969 / 4000)) + 1;
    const year   = jdn < this.toJdn (approx, 1, 1) ? approx - 1 : approx;
    const month  = 1 + Math.floor ((jdn - this.toJdn (year, 1, 1)) / 30);
    const day    = jdn - this.toJdn (year, month, 1) + 1;

    return new FrenchArithmeticCalendar (jdn, year, month, day);
  }
}
