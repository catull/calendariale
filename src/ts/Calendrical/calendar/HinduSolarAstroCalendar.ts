import { dusk, mod, next } from '../Astro';
import { hinduAstroCalendarYear, siderealSolarLongitude, siderealZodiac } from '../HinduAlgorithms';
import { hindu, J0000, MEAN_SIDEREAL_YEAR } from '../Const';
import { Calendar } from '../Calendar';

export class HinduSolarAstroCalendar extends Calendar {
  constructor (year: number, month: number, day: number) {
    super (year, month, day);

    this.jdn = HinduSolarAstroCalendar.toJdn (year, month, day);
  }

  // Determine Julian day number from Hindu Solar Astro calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    const approx = hindu.EPOCH - 3 + Math.floor ((year + hindu.SOLAR_ERA +
                  (month - 1) / 12) * MEAN_SIDEREAL_YEAR) - J0000;
    const begin = next (approx, function (i0) {
      return siderealZodiac (HinduSolarAstroCalendar.hinduAstroSunset (i0)) === month;
    });

    return J0000 + begin + day - 1;
  }

  // Calculate Hindu Solar Astro calendar date from Julian day
  public static fromJdn (jdn: number) : Calendar {
    const jd0      = jdn - J0000;
    const critical = this.hinduAstroSunset (jd0);
    const month    = siderealZodiac (critical);
    const year     = hinduAstroCalendarYear (critical) - hindu.SOLAR_ERA;
    const approx   = jd0 - 3 - mod (Math.floor (siderealSolarLongitude (critical)), 30);
    const begin    = next (approx, function (index) {
      return siderealZodiac (HinduSolarAstroCalendar.hinduAstroSunset (index)) === month;
    });
    const day      = jd0 - begin + 1;

    return new HinduSolarAstroCalendar (year, month, day);
  }

  /**
   * Return the geometrical sunset at Hindu location on date.
   * @param {float} date moment in time
   * @return {float} sunset of that date
   */
  private static hinduAstroSunset (jdn: number) : number {
    return dusk (jdn, hindu.UJJAIN_LOCATION, 0);
  }
}
