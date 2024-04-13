import { amod } from '../Astro'
import { chinese } from '../Const'

import { ChineseDayNameDate } from './ChineseDayNameDate'

export class ChineseDayNameCalendar {
  // Calculate Chinese Day Name calendar date from Julian day number (JDN)
  public static fromJdn (jdn: number): ChineseDayNameDate {
    const count: number = jdn - chinese.DAY_NAME_EPOCH - 1

    return new ChineseDayNameDate(jdn, amod(count, 10), amod(count, 12))
  }
}
