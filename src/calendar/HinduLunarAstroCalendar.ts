import { amod, dawn, lunarPhase, mod, newMoonAtOrAfter, newMoonBefore, next } from '../Astro';
import { hinduAstroCalendarYear, siderealSolarLongitude, siderealZodiac } from '../HinduAlgorithms';
import { hindu, J0000, MEAN_SIDEREAL_YEAR } from '../Const';
import { CalendarValidationException, LeapDayMonthCalendar } from '../Calendar';

export class HinduLunarAstroCalendar extends LeapDayMonthCalendar {
  constructor(jdn: number, year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean) {
    super(jdn, year, month, day, monthLeap, dayLeap);
  }

  // Is a given year in the Hindu Lunar Astro calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return (year * 11 + 14) % 30 < 11;
  }

  public static toJdn(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const jdn: number = this.calculateJdn(year, month, monthLeap, day, dayLeap);
    this.validate(year, month, monthLeap, day, dayLeap, jdn);

    return jdn;
  }

  private static validate(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean, jdn: number) {
    if (month < 1 || month > 12) {
      throw new CalendarValidationException('Invalid month');
    }

    if (day < 1 || day > 30) {
      throw new CalendarValidationException('Invalid day');
    }

    const date: HinduLunarAstroCalendar = this.fromJdn(jdn);
    if (monthLeap !== date.isMonthLeap()) {
      throw new CalendarValidationException('Invalid leap month');
    }

    if (dayLeap !== date.isDayLeap()) {
      throw new CalendarValidationException('Invalid leap day');
    }

    if (day !== date.day) {
      throw new CalendarValidationException('Invalid day');
    }
  }

  // Determine Julian day number from Hindu Lunar Astro calendar date
  private static calculateJdn(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const approx: number = hindu.EPOCH_RD + MEAN_SIDEREAL_YEAR * (year + hindu.LUNAR_ERA + (month - 1) / 12);
    const s: number = Math.floor(approx - 1 / 360 * MEAN_SIDEREAL_YEAR *
      (mod(siderealSolarLongitude(approx) - (month - 1) * 30 + 180, 360) - 180));
    const k: number = this.astroLunarDayFromMoment(s + 0.25);
    let temp: number;

    if (k > 3 && k < 27) {
      temp = k;
    } else {
      const mid: HinduLunarAstroCalendar = this.fromJdn(s - 15 + J0000);

      if (mid.month !== month || (mid.monthLeap && !monthLeap)) {
        temp = mod(k + 15, 30) - 15;
      } else {
        temp = mod(k - 15, 30) + 15;
      }
    }

    const est: number = s + day - temp;
    const tau: number = est - mod(this.astroLunarDayFromMoment(est + 0.25) - day + 15, 30) + 15;
    const date: number = next(tau - 1, function (d) {
      const d1: number = HinduLunarAstroCalendar.astroLunarDayFromMoment(HinduLunarAstroCalendar.altHinduSunrise(d)),
        d2: number = amod(day + 1, 30);

      return d1 === day || d1 === d2;
    }) + (dayLeap ? 1 : 0);

    return J0000 + date;
  }

  // Calculate Hindu Lunar Astro calendar date from Julian day
  public static fromJdn(jdn: number): HinduLunarAstroCalendar {
    const jd0: number = jdn - J0000;
    const critical: number = this.altHinduSunrise(jd0);
    const day: number = this.astroLunarDayFromMoment(critical);
    const dayLeap: boolean = day === this.astroLunarDayFromMoment(this.altHinduSunrise(jd0 - 1));
    const lastNewMoon: number = newMoonBefore(critical);
    const nextNewMoon: number = newMoonAtOrAfter(critical);
    const monthSolar: number = siderealZodiac(lastNewMoon);
    const monthLeap: boolean = monthSolar === siderealZodiac(nextNewMoon);
    const month: number = amod(monthSolar + 1, 12);
    const year: number = hinduAstroCalendarYear(month <= 2 ? jd0 + 180 : jd0) - hindu.LUNAR_ERA;

    return new HinduLunarAstroCalendar(jdn, year, month, monthLeap, day, dayLeap);
  }

  /**
   * Return the phase of moon (tithi) at moment tee, in the range [ 1 .. 30 ]
   * @param {float} tee a moment in time
   * @return {int} lunar day in cycle
   */
  private static astroLunarDayFromMoment(tee: number): number {
    return Math.floor(lunarPhase(tee) / 12) + 1;
  }

  /**
   * Return the astronomical sunrise at Hindu location on date,
   * per Lahiri, rounded to nearest minute, as a rational number.
   * @param {float} tee moment in time
   * @return {float} sunrise on that day
   */
  private static altHinduSunrise(tee: number): number {
    const rise: number = dawn(tee, hindu.UJJAIN_LOCATION, 47 / 60);

    return Math.round(rise * 24 * 60) / 24 / 60;
  }
}
