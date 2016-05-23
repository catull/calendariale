import { mod } from '../Astro';
import { armenian } from '../Const';
import { Calendar } from '../Calendar';

export class ArmenianCalendar extends Calendar {
  constructor (year: number, month: number, day: number) {
    super (year, month, day);

     this.jdn = ArmenianCalendar.toJdn (year, month, day);
  }

  // Determine Julian day number from Armenian calendar date
  public static toJdn (year: number, month: number, day: number) : number {
      return armenian.EPOCH + 365 * (year - 1) + 30 * (month - 1) + day - 1.0;
  }

  // Calculate Armenian calendar date from Julian day
  public static fromJdn (jdn: number) : Calendar {
    const days  = jdn - armenian.EPOCH;
    const year  = Math.floor (days / 365) + 1;
    const month = Math.floor (mod (days, 365) / 30) + 1;
    const day   = days - 365 * (year - 1) - 30 * (month - 1) + 1;

    return new ArmenianCalendar (year, month, day);
  }
}
