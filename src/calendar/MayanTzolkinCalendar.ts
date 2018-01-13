import { amod } from '../Astro';
import { mayan } from '../Const';
import { MonthCalendar } from '../Calendar';

export class MayanTzolkinCalendar extends MonthCalendar {
  // Calculate Mayan Tzolkin calendar date from Julian day
  public static fromJdn(jdn: number): MayanTzolkinCalendar {
    const count: number = Math.floor(jdn - 0.5) + 0.5 - mayan.EPOCH;

    return new MayanTzolkinCalendar(jdn, amod(count + 4, 13), amod(count, 20));
  }

  constructor(jdn: number, month: number, day: number) {
    super(jdn, month, day);
  }

}
