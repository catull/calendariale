import { amod } from '../Astro';
import { chinese } from '../Const';

import { BaseCalendarDate } from './core';

export class ChineseDayNameCalendarDate extends BaseCalendarDate {
  // Calculate Mayan Tzolkin calendar date from Julian day
  public static fromJdn(jdn: number): ChineseDayNameCalendarDate {
    const count: number = jdn - chinese.DAY_NAME_EPOCH - 1;

    return new ChineseDayNameCalendarDate(jdn, amod(count, 10), amod(count, 12));
  }

  constructor(jdn: number, private stem: number, private branch: number) {
    super(jdn);
  }

  public getStem (): number {
    return this.stem;
  }

  public getBranch (): number {
    return this.branch;
  }
}
