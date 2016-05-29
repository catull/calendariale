import { mod } from '../Astro';
import { islamic } from '../Const';
import { LeapCalendar } from '../Calendar';

export class IslamicCalendar extends LeapCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day, IslamicCalendar.isLeapYear (year));
  }

  // Is a given year in the Islamic calendar a leap year?
  public static isLeapYear (year: number) : boolean {
    return (year * 11 + 14) % 30 < 11;
  }

  // Determine Julian day number from Islamic calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    return day + Math.ceil (29.5 * (month - 1)) + (year - 1) * 354 +
      Math.floor ((3 + 11 * year) / 30) + islamic.EPOCH - 1;
  }

  // Calculate Islamic calendar date from Julian day
  public static fromJdn (jdn: number) {
    let jd0, year, month, day;

    jd0   = Math.floor (jdn) + 0.5;
    year  = Math.floor ((30 * (jd0 - islamic.EPOCH) + 10646) / 10631);
    month = Math.min (12, Math.ceil ((jd0 - (29 + this.toJdn (year, 1, 1))) / 29.5) + 1);
    day   = jd0 - this.toJdn (year, month, 1) + 1;

    return new IslamicCalendar (jdn, year, month, day);
  }
}
