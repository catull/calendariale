import { Symmetry010Calendar } from './Symmetry010Calendar'
import { LeapDate } from './core/index'

export class Symmetry010Date extends LeapDate {
  constructor (jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, Symmetry010Calendar.isLeapYear(year))
  }
}
