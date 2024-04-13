import { mod } from '../Astro'
import { INVALID_DAY, INVALID_MONTH, islamic } from '../Const'

import { IslamicDate } from './IslamicDate'
import { CalendarDateValidationException } from './core/index'

export class IslamicCalendar {
  // Calculate Islamic calendar date from Julian day number (JDN)
  public static fromJdn (jdn: number): IslamicDate {
    const jd0: number = Math.floor(jdn) + 0.5
    const year: number = Math.floor((30 * (jd0 - islamic.EPOCH) + 10646) / 10631)
    const month: number = Math.min(12, Math.ceil((jd0 - (29 + this.toJdn(year, 1, 1))) / 29.5) + 1)
    const day: number = jd0 - this.toJdn(year, month, 1) + 1

    return new IslamicDate(jdn, year, month, day)
  }

  // Determine Julian day number (JDN) from Islamic calendar date
  public static toJdn (year: number, month: number, day: number): number {
    this.validate(year, month, day)

    return (
      day + Math.ceil(29.5 * (month - 1)) + (year - 1) * 354 + Math.floor((3 + 11 * year) / 30) + islamic.EPOCH - 1
    )
  }

  // Is a given year in the Islamic calendar a leap year?
  public static isLeapYear (year: number): boolean {
    return (year * 11 + 14) % 30 < 11
  }

  private static validate (year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH)
    }

    const maxDay: number = mod(month, 2) === 1 || (this.isLeapYear(year) && month === 12) ? 30 : 29
    if (day < 1 || day > maxDay) {
      throw new CalendarDateValidationException(INVALID_DAY)
    }
  }
}
