import { amod, dawn, lunarPhase, mod3, newMoonAtOrAfter, newMoonBefore, next } from '../Astro'
import {
  INVALID_DAY,
  INVALID_LEAP_DAY,
  INVALID_LEAP_MONTH,
  INVALID_MONTH,
  J0000,
  MEAN_SIDEREAL_YEAR,
  hindu
} from '../Const'

import { hinduAstroDateYear, siderealSolarLongitude, siderealZodiac } from './HinduAlgorithms'
import { HinduLunarAstroDate } from './HinduLunarAstroDate'
import { CalendarDateValidationException } from './core/index'

export class HinduLunarAstroCalendar {
  // Calculate Hindu Lunar Astro calendar date from Julian day number (JDN)
  public static fromJdn (jdn: number): HinduLunarAstroDate {
    const jd0: number = jdn - J0000
    const critical: number = this.altHinduSunrise(jd0)
    const day: number = this.astroLunarDayFromMoment(critical)
    const dayLeap: boolean = day === this.astroLunarDayFromMoment(this.altHinduSunrise(jd0 - 1))
    const lastNewMoon: number = newMoonBefore(critical)
    const nextNewMoon: number = newMoonAtOrAfter(critical)
    const monthSolar: number = siderealZodiac(lastNewMoon)
    const monthLeap: boolean = monthSolar === siderealZodiac(nextNewMoon)
    const month: number = amod(monthSolar + 1, 12)
    const year: number = hinduAstroDateYear(month <= 2 ? jd0 + 180 : jd0) - hindu.LUNAR_ERA

    return new HinduLunarAstroDate(jdn, year, month, monthLeap, day, dayLeap)
  }

  // Is a given year in the Hindu Lunar Astro calendar a leap year?
  public static isLeapYear (year: number): boolean {
    return (year * 11 + 14) % 30 < 11
  }

  public static toJdn (year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const jdn: number = this.calculateJdn(year, month, monthLeap, day, dayLeap)
    this.validate(year, month, monthLeap, day, dayLeap, jdn)

    return jdn
  }

  private static validate (
    _year: number,
    month: number,
    monthLeap: boolean,
    day: number,
    dayLeap: boolean,
    jdn: number
  ): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH)
    }

    if (day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY)
    }

    const date: HinduLunarAstroDate = this.fromJdn(jdn)
    if (monthLeap !== date.isMonthLeap()) {
      throw new CalendarDateValidationException(INVALID_LEAP_MONTH)
    }

    if (dayLeap !== date.isDayLeap()) {
      throw new CalendarDateValidationException(INVALID_LEAP_DAY)
    }

    if (day !== date.getDay()) {
      throw new CalendarDateValidationException(INVALID_DAY)
    }
  }

  // Determine Julian day number (JDN) from Hindu Lunar Astro calendar date
  private static calculateJdn (year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const approx: number = hindu.EPOCH_RD + MEAN_SIDEREAL_YEAR * (year + hindu.LUNAR_ERA + (month - 1) / 12)
    const s: number = Math.floor(
      approx - MEAN_SIDEREAL_YEAR * mod3(siderealSolarLongitude(approx) / 360 - (month - 1) / 12, -0.5, 0.5)
    )
    const k: number = this.astroLunarDayFromMoment(s + 0.25)
    let temp: number

    if (k > 3 && k < 27) {
      temp = k
    } else {
      const mid: HinduLunarAstroDate = this.fromJdn(s - 15 + J0000)
      temp = mid.getMonth() !== month || (mid.isMonthLeap() && !monthLeap) ? mod3(k, -15, 15) : mod3(k, 15, 45)
    }

    const est: number = s + day - temp
    const tau: number = est - mod3(this.astroLunarDayFromMoment(est + 0.25) - day, -15, 15)

    const date: number =
      next(tau - 1, (d: number): boolean => {
        const d1: number = HinduLunarAstroCalendar.astroLunarDayFromMoment(HinduLunarAstroCalendar.altHinduSunrise(d))
        const d2: number = amod(day + 1, 30)

        return d1 === day || d1 === d2
      }) + (dayLeap ? 1 : 0)

    return J0000 + date
  }

  /**
   * Return the phase of moon (tithi) at moment tee, in the range [ 1 .. 30 ]
   * @param tee a moment in time
   * @returns lunar day in cycle
   */
  private static astroLunarDayFromMoment (tee: number): number {
    return Math.floor(lunarPhase(tee) / 12) + 1
  }

  /**
   * Return the astronomical sunrise at Hindu location on date,
   * per Lahiri, rounded to nearest minute, as a rational number.
   * @param tee moment in time
   * @returns sunrise on that day
   */
  private static altHinduSunrise (tee: number): number {
    const rise: number = dawn(tee, hindu.LOCATION_UJJAIN, 47 / 60)

    return Math.round(rise * 24 * 60) / 24 / 60
  }
}
