import { mod } from '../Astro';
import { mayan } from '../Const';
import { BaseCalendar } from '../Calendar';

export class MayanHaabCalendar extends BaseCalendar {
  constructor (jdn: number, private month: number, private day: number) {
    super (jdn);
  }

  // Calculate Mayan Haab calendar date from Julian day
  public static fromJdn (jdn: number) {
    const count = Math.floor (jdn) + 0.5 - mayan.EPOCH;
    const day   = mod (count + 8 + 17 * 20, 365);

    return new MayanHaabCalendar (jdn, Math.floor (day / 20) + 1, mod (day, 20));
  }
}
