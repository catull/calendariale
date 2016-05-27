import { mod } from '../Astro';
import { mayan } from '../Const';
import { Calendar } from '../Calendar';

export class MayanHaabCalendar {
  constructor (private month: number, private day: number) {
  }

  // Calculate Mayan Haab calendar date from Julian day
  public static fromJdn (jdn: number) : MayanHaabCalendar {
    const count = Math.floor (jdn) + 0.5 - mayan.EPOCH;
    const day   = mod (count + 8 + 17 * 20, 365);

    return new MayanHaabCalendar (Math.floor (day / 20) + 1, mod (day, 20));
  }
}
