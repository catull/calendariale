import { mod, phasisOnOrBefore } from '../Astro'
import { INVALID_DAY, INVALID_MONTH, MEAN_SYNODIC_MONTH, islamic } from '../Const'

import { IslamicObservationalDate } from './IslamicObservationalDate'
import { CalendarDateValidationException } from './core/index'

export class IslamicObservationalCalendar {
  // Calculate Islamic calendar date from Julian day number (JDN)
  public static fromJdn (jdn: number): IslamicObservationalDate {
    const crescent: number = phasisOnOrBefore(jdn, islamic.LOCATION_CAIRO)
    const elapsedMonths: number = Math.round((crescent - islamic.EPOCH) / MEAN_SYNODIC_MONTH)
    const year: number = Math.floor(elapsedMonths / 12) + 1
    const month: number = mod(elapsedMonths, 12) + 1
    const day: number = jdn - crescent + 1

    return new IslamicObservationalDate(jdn, year, month, day)
  }

  // Determine Julian day number (JDN) from Islamic Observational calendar date
  public static toJdn (year: number, month: number, day: number): number {
    this.validate(year, month, day)

    const midMonth = islamic.EPOCH + Math.floor(((year - 1) * 12 + month - 0.5) * MEAN_SYNODIC_MONTH)

    return phasisOnOrBefore(midMonth, islamic.LOCATION_CAIRO) + day - 1
  }

  // Is a given year in the Islamic calendar a leap year?
  public static isLeapYear (year: number): boolean {
    return (year * 11 + 14) % 30 < 11
  }

  private static validate (_year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH)
    }

    if (day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY)
    }
  }
}
