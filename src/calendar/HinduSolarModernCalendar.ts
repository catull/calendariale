import { mod, next } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, J0000, hindu } from '../Const';

import { hinduDateYear, hinduSolarLongitude, hinduSunrise, hinduZodiac } from './HinduAlgorithms';
import { HinduSolarModernDate } from './HinduSolarModernDate';
import { CalendarDateValidationException } from './core';

export class HinduSolarModernCalendar {
  // Determine Julian day number from Hindu Solar Modern calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const begin: number = Math.floor((year + hindu.SOLAR_ERA + (month - 1) / 12) * hindu.SIDEREAL_YEAR + hindu.EPOCH_RD);

    return day - 1 + next(begin - 3, (param: number): boolean => {
      const sunrise = hinduSunrise(param + 1);
      const zodiac = hinduZodiac(sunrise);

      return zodiac === month;
    }) + J0000;
  }

  // Calculate Hindu Solar Modern calendar date from Julian day
  public static fromJdn(jdn: number): HinduSolarModernDate {
    const jd0: number = jdn - J0000;
    const critical: number = hinduSunrise(jd0 + 1);
    const month: number = hinduZodiac(critical);
    const year: number = hinduDateYear(critical) - hindu.SOLAR_ERA;
    const approx: number = jd0 - 3 - mod(Math.floor(hinduSolarLongitude(critical)), 30);

    const begin: number = next(approx, (index: number): boolean =>
      hinduZodiac(hinduSunrise(index + 1)) === month
    );

    const day: number = jd0 - begin + 1;

    return new HinduSolarModernDate(jdn, year, month, day);
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    const maxDays: number = (month < 7) ? 31 : 30;
    if (day < 1 || day > maxDays) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

}
