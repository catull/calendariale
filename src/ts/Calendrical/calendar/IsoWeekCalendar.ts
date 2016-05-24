import { amod, nthKday } from '../Astro';
import { J0000, Month, WeekDay } from '../Const';
import { Calendar } from '../Calendar';
import { GregorianCalendar } from './GregorianCalendar';

export class IsoWeekCalendar extends Calendar {
  constructor (year : number, private week : number, day : number) {
    super (year, 0, day);

     this.jdn = IsoWeekCalendar.toJdn (year, week, day);
  }

  // Determine Julian day number from Iso Week calendar date
  public static toJdn (year: number, week: number, day: number) : number {
    return nthKday (week, WeekDay.SUNDAY, GregorianCalendar.toJdn (year - 1, Month.DECEMBER, 28)) + day;
  }

  // Calculate Iso Week calendar date from Julian day
  public static fromJdn (jdn: number) : Calendar {
    const approx = GregorianCalendar.jdnToYear (jdn - 3);
    const year   = jdn >= this.toJdn (approx + 1, 1, 1) ? (approx + 1) : approx;
    const week   = 1 + Math.floor ((jdn - this.toJdn (year, 1, 1)) / 7);
    const day    = amod (jdn - J0000, 7);

    return new IsoWeekCalendar (year, week, day);
  }
}
