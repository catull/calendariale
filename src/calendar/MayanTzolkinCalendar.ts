import { amod } from '../Astro';
import { mayan } from '../Const';

import { MayanTzolkinDate } from './MayanTzolkinDate';

export class MayanTzolkinCalendar {
  // Calculate Mayan Tzolkin calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): MayanTzolkinDate {
    const count: number = Math.floor(jdn - 0.5) + 0.5 - mayan.EPOCH;

    return new MayanTzolkinDate(jdn, amod(count + 4, 13), amod(count, 20));
  }
}
