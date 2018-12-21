import { amod } from '../Astro';
import { akan } from '../Const';

import { AkanNameDate } from './AkanNameDate';
import { BaseCalendar } from './BaseCalendar';

export class AkanNameCalendar extends BaseCalendar {
  // Calculate Akan Name calendar date from Julian day
  public static fromJdn(jdn: number): AkanNameDate {
    // const count: number = jdn - akan.EPOCH;
    const count: number = jdn - akan.DELTA;

    return new AkanNameDate(jdn, amod(count, 6), amod(count, 7));
  }

}
