import { mod } from '../Astro';
import { hinduDayCount } from '../HinduAlgorithms';
import { hindu, ARYA_SOLAR_MONTH, ARYA_SOLAR_YEAR } from '../Const';
import { CalendarValidationException, YearMonthCalendar } from '../Calendar';

export class HinduSolarOldCalendar extends YearMonthCalendar {
  // Determine Julian day number from Hindu Solar Old calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    return Math.ceil(hindu.EPOCH + year * ARYA_SOLAR_YEAR +
      (month - 1) * ARYA_SOLAR_MONTH + day - 0.75) - 0.5;
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarValidationException('Invalid month');
    }

    const maxDays: number = (month < 7) ? 31 : 30;
    if (day < 1 || day > maxDays) {
      throw new CalendarValidationException('Invalid day');
    }
  }

  // Calculate Hindu Solar Old calendar date from Julian day
  public static fromJdn(jdn: number): HinduSolarOldCalendar {
    const sun: number = hinduDayCount(jdn) + 0.25;
    const year: number = Math.floor(sun / ARYA_SOLAR_YEAR);
    const month: number = mod(Math.floor(sun / ARYA_SOLAR_MONTH), 12) + 1;
    const day: number = Math.floor(mod(sun, ARYA_SOLAR_MONTH)) + 1;

    return new HinduSolarOldCalendar(jdn, year, month, day);
  }

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day);
  }

}
