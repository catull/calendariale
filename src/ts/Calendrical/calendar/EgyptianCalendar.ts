import { mod } from '../Astro';
import { egyptian } from '../Const';
import { Calendar } from '../Calendar';

export class EgyptianCalendar extends Calendar {
  constructor (year: number, month: number, day: number) {
    super (year, month, day);

     this.jdn = EgyptianCalendar.toJdn (year, month, day);
  }

  // Determine Julian day number from Egyptian calendar date
  public static toJdn (year: number, month: number, day: number) : number {
      return egyptian.EPOCH + 365 * (year - 1) + 30 * (month - 1) + day - 1.0;
  }

  // Calculate Egyptian calendar date from Julian day
  public static fromJdn (jdn: number) : Calendar {
    const days  = jdn - egyptian.EPOCH;
    const year  = Math.floor (days / 365) + 1;
    const month = Math.floor (mod (days, 365) / 30) + 1;
    const day   = days - 365 * (year - 1) - 30 * (month - 1) + 1;

    return new EgyptianCalendar (year, month, day);
  }
}
