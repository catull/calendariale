import { amod, nthKday } from '../Astro';
import { J0000, Month, WeekDay } from '../Const';
import { CalendarValidationException, YearCalendar } from '../Calendar';
import { GregorianCalendar } from './GregorianCalendar';

export class IsoWeekCalendar extends YearCalendar {
  constructor(jdn: number, year: number, private week: number, private day: number) {
    super(jdn, year);
  }

  // Determine Julian day number from Iso Week calendar date
  public static toJdn(year: number, week: number, day: number): number {
    this.validate(year, week, day);

    return nthKday(week, WeekDay.SUNDAY, GregorianCalendar.toJdn(year - 1, Month.DECEMBER, 28)) + day;
  }

  public static validate(year: number, week: number, day: number): void {
    if (week < 1 || week > 53) {
      throw new CalendarValidationException('Invalid week');
    }

    if (day < 1 || day > 7) {
      throw new CalendarValidationException('Invalid day');
    }
  }

  // Calculate Iso Week calendar date from Julian day
  public static fromJdn(jdn: number): IsoWeekCalendar {
    const approx: number = GregorianCalendar.jdnToYear(jdn - 3);
    const year: number = jdn >= this.toJdn(approx + 1, 1, 1) ? (approx + 1) : approx;
    const week: number = 1 + Math.floor((jdn - this.toJdn(year, 1, 1)) / 7);
    const day: number = amod(jdn - J0000, 7);

    return new IsoWeekCalendar(jdn, year, week, day);
  }

  getWeek(): number {
    return this.week;
  }

  getDay(): number {
    return this.day;
  }
}
