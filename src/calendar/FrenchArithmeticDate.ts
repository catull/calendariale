import { FrenchArithmeticCalendar } from './FrenchArithmeticCalendar'
import { LeapDate } from './core/index'

export class FrenchArithmeticDate extends LeapDate {
  constructor (jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, FrenchArithmeticCalendar.isLeapYear(year))
  }
}
