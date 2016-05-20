import { amod, dawn, lunarPhase, mod, newMoonAtOrAfter, newMoonBefore, next } from '../Astro';
import { hinduAstroCalendarYear, siderealSolarLongitude, siderealZodiac } from '../HinduAlgorithms';
import { hindu, J0000, MEAN_SIDEREAL_YEAR } from '../Const';
import { Calendar } from '../Calendar';

export class HinduLunarAstroCalendar extends Calendar {
  constructor (year: number, month: number, protected monthLeap: boolean, day: number, protected dayLeap: boolean) {
    super (year, month, day);

     this.yearLeap = HinduLunarAstroCalendar.isLeapYear (year);
  }

  // Is a given year in the Hindu Lunar Astro calendar a leap year?
  public static isLeapYear (year: number): boolean {
    return (year * 11 + 14) % 30 < 11;
  }

  // Determine Julian day number from Hindu Lunar Astro calendar date
  public static toJdn (year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    let approx, s0, k0, temp, mid, est, tau, date;

    approx = hindu.EPOCH_RD + MEAN_SIDEREAL_YEAR * (year + hindu.LUNAR_ERA + (month - 1) / 12);
    s0 = Math.floor (approx - 1 / 360 * MEAN_SIDEREAL_YEAR *
                (mod (siderealSolarLongitude (approx) - (month - 1) * 30 + 180, 360) - 180));
    k0 = this.astroLunarDayFromMoment (s0 + 0.25);

    if (k0 > 3 && k0 < 27) {
        temp = k0;
    } else {
        mid = this.fromJdn (s0 - 15 + J0000);

        if (mid.month !== month || (mid.monthLeap && !monthLeap)) {
          temp = mod (k0 + 15, 30) - 15;
        } else {
          temp = mod (k0 - 15, 30) + 15;
        }
    }

    est = s0 + day - temp;
    tau = est - mod (this.astroLunarDayFromMoment (est + 0.25) - day + 15, 30) + 15;
    date = next (tau - 1, function (d0) {
      let d1 = HinduLunarAstroCalendar.astroLunarDayFromMoment (HinduLunarAstroCalendar.altHinduSunrise (d0)),
      d2 = amod (day + 1, 30);

      return d1 === day || d1 === d2;
    });

    if (dayLeap) {
        date += 1;
    }

    return J0000 + date;
  }

  // Calculate Hindu Lunar Astro calendar date from Julian day
  public static fromJdn (jdn: number): Calendar {
    let jd0, critical, day, dayLeap, lastNewMoon, nextNewMoon, monthSolar, monthLeap, month, year;

    jd0         = jdn - J0000;
    critical    = this.altHinduSunrise (jd0);
    day         = this.astroLunarDayFromMoment (critical);
    dayLeap     = day === this.astroLunarDayFromMoment (this.altHinduSunrise (jd0 - 1));
    lastNewMoon = newMoonBefore (critical);
    nextNewMoon = newMoonAtOrAfter (critical);
    monthSolar  = siderealZodiac (lastNewMoon);
    monthLeap   = monthSolar === siderealZodiac (nextNewMoon);
    month       = amod (monthSolar + 1, 12);
    year        = hinduAstroCalendarYear (month <= 2 ? jd0 + 180 : jd0) - hindu.LUNAR_ERA;

    const cal = new HinduLunarAstroCalendar (year, month, monthLeap, day, dayLeap);
    cal.jdn = jdn;

    return cal;
  }

  /**
   * Return the phase of moon (tithi) at moment tee, in the range [ 1 .. 30 ]
   * @param {float} tee a moment in time
   * @return {int} lunar day in cycle
   */
  private static astroLunarDayFromMoment (tee: number) : number {
    return Math.floor (lunarPhase (tee) / 12) + 1;
  }

  /**
   * Return the astronomical sunrise at Hindu location on date,
   * per Lahiri, rounded to nearest minute, as a rational number.
   * @param {float} tee moment in time
   * @return {float} sunrise on that day
   */
  private static altHinduSunrise (tee: number) : number {
    const rise = dawn (tee, hindu.UJJAIN_LOCATION, 47 / 60);

    return Math.round (rise * 24 * 60) / 24 / 60;
  }
}
