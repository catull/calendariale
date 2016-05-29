import { amod } from '../Astro';
import { mayan } from '../Const';
import { BaseCalendar } from '../Calendar';

export class MayanTzolkinCalendar extends BaseCalendar {
  constructor (jdn: number, private month: number, private day: number) {
    super (jdn);
  }

  // Calculate Mayan Tzolkin calendar date from Julian day
  public static fromJdn (jdn: number) {
    const count = Math.floor (jdn - 0.5) + 0.5 - mayan.EPOCH;

    return new MayanTzolkinCalendar (jdn, amod (count + 4, 13), amod (count, 20));
  }
}
