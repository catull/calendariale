import { amod } from '../Astro';
import { mayan } from '../Const';
// import { Calendar } from '../Calendar';

export class MayanTzolkinCalendar {
  constructor (private month: number, private day: number) {
  }

  // Calculate Mayan Tzolkin calendar date from Julian day
  public static fromJdn (jdn: number): MayanTzolkinCalendar {
    const count = Math.floor (jdn) + 0.5 - mayan.COUNT_EPOCH;

    return new MayanTzolkinCalendar (amod (count + 4, 13), amod (count, 20));
  }
}
