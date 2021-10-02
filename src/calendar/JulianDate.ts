import { JulianCalendar } from './JulianCalendar';
import { LeapDate } from './core/LeapDate';

export class JulianDate extends LeapDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, JulianCalendar.isLeapYear(year));
  }
}
