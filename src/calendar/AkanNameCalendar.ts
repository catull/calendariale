import { amod } from '../Astro';
import { akan } from '../Const';

import { AkanNameDate } from './AkanNameDate';

export class AkanNameCalendar {
  // Calculate Akan Name calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): AkanNameDate {
    // const count: number = jdn - akan.EPOCH;
    const count: number = jdn - akan.DELTA;

    return new AkanNameDate(jdn, amod(count, 6), amod(count, 7));
  }

}
