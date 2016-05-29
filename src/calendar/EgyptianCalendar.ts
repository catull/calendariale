import { mod } from '../Astro';
import { egyptian } from '../Const';
import { YearMonthCalendar } from '../Calendar';

export class EgyptianCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day);
  }

  // Determine Julian day number from Egyptian calendar date
  public static toJdn (year: number, month: number, day: number) : number {
      return egyptian.EPOCH + 365 * (year - 1) + 30 * (month - 1) + day - 1.0;
  }

  // Calculate Egyptian calendar date from Julian day
  public static fromJdn (jdn: number) {
    const days  = jdn - egyptian.EPOCH;
    const year  = Math.floor (days / 365) + 1;
    const month = Math.floor (mod (days, 365) / 30) + 1;
    const day   = days - 365 * (year - 1) - 30 * (month - 1) + 1;

    return new EgyptianCalendar (jdn, year, month, day);
  }
}
