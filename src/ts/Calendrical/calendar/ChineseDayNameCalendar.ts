import { amod } from '../Astro';
import { chinese } from '../Const';

export class ChineseDayNameCalendar {
  constructor (private stem: number, private branch: number) {
  }

  // Calculate Mayan Tzolkin calendar date from Julian day
  public static fromJdn (jdn: number): ChineseDayNameCalendar {
    const count = jdn - chinese.DAY_NAME_EPOCH - 1;

    return new ChineseDayNameCalendar (amod (count, 10), amod (count, 12));
  }
}
