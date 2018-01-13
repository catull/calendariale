import { mod } from '../Astro';
import { egyptian } from '../Const';
import { CalendarValidationException, YearMonthCalendar } from '../Calendar';

export class EgyptianCalendar extends YearMonthCalendar {
  // Determine Julian day number from Egyptian calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    return egyptian.EPOCH + 365 * (year - 1) + 30 * (month - 1) + day - 1.0;
  }

  // Calculate Egyptian calendar date from Julian day
  public static fromJdn(jdn: number): EgyptianCalendar {
    const days: number = jdn - egyptian.EPOCH;
    const year: number = Math.floor(days / 365) + 1;
    const month: number = Math.floor(mod(days, 365) / 30) + 1;
    const day: number = days - 365 * (year - 1) - 30 * (month - 1) + 1;

    return new EgyptianCalendar(jdn, year, month, day);
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 13) {
      throw new CalendarValidationException('Invalid month');
    }

    if (month === 13 && day > 5) {
      throw new CalendarValidationException('Invalid day');
    }

    if (day < 1 || day > 30) {
      throw new CalendarValidationException('Invalid day');
    }
  }

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day);
  }
}
