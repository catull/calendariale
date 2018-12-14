import { amod } from '../Astro';
import { chinese } from '../Const';

import { ChineseDayNameCalendarDate } from './ChineseDayNameCalendarDate';

export class ChineseDayNameCalendar {
  // Calculate Chinese Day Name calendar date from Julian day
  public static fromJdn(jdn: number): ChineseDayNameCalendarDate {
    const count: number = jdn - chinese.DAY_NAME_EPOCH - 1;

    return new ChineseDayNameCalendarDate(jdn, amod(count, 10), amod(count, 12));
  }

}
