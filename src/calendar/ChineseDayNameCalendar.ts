import { amod } from '../Astro';
import { chinese } from '../Const';
import { BaseCalendar } from '../Calendar';

export class ChineseDayNameCalendar extends BaseCalendar {
  // Calculate Mayan Tzolkin calendar date from Julian day
  public static fromJdn(jdn: number): ChineseDayNameCalendar {
    const count: number = jdn - chinese.DAY_NAME_EPOCH - 1;

    return new ChineseDayNameCalendar(jdn, amod(count, 10), amod(count, 12));
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
