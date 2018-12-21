import { mod } from '../Astro';
import { mayan } from '../Const';

import { BaseCalendar } from './BaseCalendar';
import { MayanHaabDate } from './MayanHaabDate';

export class MayanHaabCalendar extends BaseCalendar {
  // Calculate Mayan Haab calendar date from Julian day
  public static fromJdn(jdn: number): MayanHaabDate {
    const count: number = Math.floor(jdn) + 0.5 - mayan.EPOCH;
    const day: number = mod(count + 8 + 17 * 20, 365);

    return new MayanHaabDate(jdn, Math.floor(day / 20) + 1, mod(day, 20));
  }

}
