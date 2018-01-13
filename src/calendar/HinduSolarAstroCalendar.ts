import { dusk, mod, next } from '../Astro';
import { hinduAstroCalendarYear, siderealSolarLongitude, siderealZodiac } from '../HinduAlgorithms';
import { hindu, J0000, MEAN_SIDEREAL_YEAR } from '../Const';
import { CalendarValidationException, YearMonthCalendar } from '../Calendar';

export class HinduSolarAstroCalendar extends YearMonthCalendar {
  // Determine Julian day number from Hindu Solar Astro calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const approx: number = hindu.EPOCH - 3 + Math.floor((year + hindu.SOLAR_ERA +
      (month - 1) / 12) * MEAN_SIDEREAL_YEAR) - J0000;
    const begin: number = next(approx, (i: number): boolean =>
      siderealZodiac(HinduSolarAstroCalendar.hinduAstroSunset(i)) === month
    );

    return J0000 + begin + day - 1;
  }

  public static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarValidationException('Invalid month');
    }

    if (day < 1 || day > 31) {
      throw new CalendarValidationException('Invalid day');
    }
  }

  // Calculate Hindu Solar Astro calendar date from Julian day
  public static fromJdn(jdn: number): HinduSolarAstroCalendar {
    const jd0: number = jdn - J0000;
    const critical: number = this.hinduAstroSunset(jd0);
    const month: number = siderealZodiac(critical);
    const year: number = hinduAstroCalendarYear(critical) - hindu.SOLAR_ERA;
    const approx: number = jd0 - 3 - mod(Math.floor(siderealSolarLongitude(critical)), 30);
    const begin: number = next(approx, (index: number): boolean =>
      siderealZodiac(HinduSolarAstroCalendar.hinduAstroSunset(index)) === month
    );
    const day: number = jd0 - begin + 1;

    return new HinduSolarAstroCalendar(jdn, year, month, day);
  }

  /**
   * Return the geometrical sunset at Hindu location on date.
   * @param {float} date moment in time
   * @return {float} sunset of that date
   */
  private static hinduAstroSunset(jdn: number): number {
    return dusk(jdn, hindu.UJJAIN_LOCATION, 0);
  }

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day);
  }

}
