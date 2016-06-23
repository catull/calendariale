import { mod } from '../Astro';
import { french } from '../Const';
import { CalendarValidationException, LeapCalendar } from '../Calendar';

export class FrenchArithmeticCalendar extends LeapCalendar {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, FrenchArithmeticCalendar.isLeapYear(year));
  }

  // Is the given year a leap year in the French Arithmetic calendar ?
  public static isLeapYear(year: number): boolean {
    const m400: number = (mod(year, 400));

    return (mod(year, 4) === 0) &&
      (m400 !== 100 && m400 !== 200 && m400 !== 300) &&
      (mod(year, 4000) !== 0);
  }

  // Determine Julian day number from French Arithmetic calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const y1: number = year - 1;

    return french.EPOCH - 1 +
      365 * y1 +
      Math.floor(y1 / 4) -
      Math.floor(y1 / 100) +
      Math.floor(y1 / 400) -
      Math.floor(y1 / 4000) +
      30 * (month - 1) +
      day;
  }

  // Calculate date in the French Arithmetic calendar from Julian day.
  public static fromJdn(jdn: number): FrenchArithmeticCalendar {
    const approx: number = Math.floor((jdn - french.EPOCH + 2) / (1460969 / 4000)) + 1;
    const year: number = jdn < this.toJdn(approx, 1, 1) ? approx - 1 : approx;
    const month: number = 1 + Math.floor((jdn - this.toJdn(year, 1, 1)) / 30);
    const day: number = jdn - this.toJdn(year, month, 1) + 1;

    return new FrenchArithmeticCalendar(jdn, year, month, day);
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 13) {
      throw new CalendarValidationException('Invalid month');
    }

    const days: number = this.isLeapYear(year) ? 6 : 5;

    if (month === 13 && day > days) {
      throw new CalendarValidationException('Invalid day');
    }

    if (day < 1 || day > 30) {
      throw new CalendarValidationException('Invalid day');
    }
  }
}
