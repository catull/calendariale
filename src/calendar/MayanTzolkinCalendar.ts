import { amod } from '../Astro';
import { mayan } from '../Const';

import { BaseCalendar } from './BaseCalendar';
import { MayanTzolkinDate } from './MayanTzolkinDate';

export class MayanTzolkinCalendar extends BaseCalendar {
  // Calculate Mayan Tzolkin calendar date from Julian day
  public static fromJdn(jdn: number): MayanTzolkinDate {
    const count: number = Math.floor(jdn - 0.5) + 0.5 - mayan.EPOCH;

    return new MayanTzolkinDate(jdn, amod(count + 4, 13), amod(count, 20));
  }

}
