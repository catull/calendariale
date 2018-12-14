import { amod } from '../Astro';
import { mayan } from '../Const';

import { MayanTzolkinCalendarDate } from './MayanTzolkinCalendarDate';

export class MayanTzolkinCalendar {
  // Calculate Mayan Tzolkin calendar date from Julian day
  public static fromJdn(jdn: number): MayanTzolkinCalendarDate {
    const count: number = Math.floor(jdn - 0.5) + 0.5 - mayan.EPOCH;

    return new MayanTzolkinCalendarDate(jdn, amod(count + 4, 13), amod(count, 20));
  }

}
