import { mod } from '../Astro';
import { mayan } from '../Const';
import { Calendar } from '../Calendar';

export class MayanHaabCalendar extends Calendar {
  constructor (month: number, day: number) {
    super (0, month, day);
  }

  // Calculate Mayan Haab calendar date from Julian day
  public static fromJdn (jdn: number): Calendar {
    const count = Math.floor (jdn) + 0.5 - mayan.COUNT_EPOCH;
    const day   = mod (count + 8 + 17 * 20, 365);

    return new MayanHaabCalendar (Math.floor (day / 20) + 1, mod (day, 20));
  }
}
