import { IslamicUmmAlQuraCalendar } from './IslamicUmmAlQuraCalendar'
import { LeapDate } from './core/index'

export class IslamicUmmAlQuraDate extends LeapDate {
  constructor (jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, IslamicUmmAlQuraCalendar.isLeapYear(year))
  }
}
