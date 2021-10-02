import { mod } from '../Astro';
import { ARYA_SOLAR_MONTH, ARYA_SOLAR_YEAR, INVALID_DAY, INVALID_MONTH, hindu } from '../Const';

import { hinduDayCount } from './HinduAlgorithms';
import { HinduSolarOldDate } from './HinduSolarOldDate';
import { CalendarDateValidationException } from './core/CalendarDateValidationException';

export class HinduSolarOldCalendar {
  // Calculate Hindu Solar Old calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): HinduSolarOldDate {
    const sun: number = hinduDayCount(jdn) + 0.25;
    const year: number = Math.floor(sun / ARYA_SOLAR_YEAR);
    const month: number = mod(Math.floor(sun / ARYA_SOLAR_MONTH), 12) + 1;
    const day: number = Math.floor(mod(sun, ARYA_SOLAR_MONTH)) + 1;

    return new HinduSolarOldDate(jdn, year, month, day);
  }

  // Determine Julian day number (JDN) from Hindu Solar Old calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    return Math.ceil(hindu.EPOCH + year * ARYA_SOLAR_YEAR + (month - 1) * ARYA_SOLAR_MONTH + day - 0.75) - 0.5;
  }

  private static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    const maxDays: number = month < 7 ? 31 : 30;
    if (day < 1 || day > maxDays) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }
}
