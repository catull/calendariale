import { dusk, mod, next } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, J0000, MEAN_SIDEREAL_YEAR, hindu } from '../Const';

import { hinduAstroDateYear, siderealSolarLongitude, siderealZodiac } from './HinduAlgorithms';
import { HinduSolarAstroDate } from './HinduSolarAstroDate';
import { CalendarDateValidationException } from './core';

export class HinduSolarAstroCalendar {
  // Calculate Hindu Solar Astro calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): HinduSolarAstroDate {
    const jd0: number = jdn - J0000;
    const critical: number = this.hinduAstroSunset(jd0);
    const month: number = siderealZodiac(critical);
    const year: number = hinduAstroDateYear(critical) - hindu.SOLAR_ERA;
    const approx: number = jd0 - 3 - mod(Math.floor(siderealSolarLongitude(critical)), 30);
    const begin: number = next(approx, (index: number): boolean =>
      siderealZodiac(HinduSolarAstroCalendar.hinduAstroSunset(index)) === month
    );
    const day: number = jd0 - begin + 1;

    return new HinduSolarAstroDate(jdn, year, month, day);
  }

  // Determine Julian day number (JDN) from Hindu Solar Astro calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const approx: number = hindu.EPOCH_RD - 3 + Math.floor((year + hindu.SOLAR_ERA +
      (month - 1) / 12) * MEAN_SIDEREAL_YEAR);
    const begin: number = next(approx, (i: number): boolean =>
      siderealZodiac(HinduSolarAstroCalendar.hinduAstroSunset(i)) === month
    );

    return J0000 + begin + day - 1;
  }

  private static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (day < 1 || day > 31) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  /**
   * Return the geometrical sunset at Hindu location on date.
   * @param {number} rataDie moment in time
   * @return {number} sunset of that date
   */
  private static hinduAstroSunset(rataDie: number): number {
    return dusk(rataDie, hindu.UJJAIN_LOCATION, 0);
  }

}
