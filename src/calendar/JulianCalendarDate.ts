import { JulianCalendar } from './JulianCalendar';
import { LeapCalendarDate } from './core';

export class JulianCalendarDate extends LeapCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, JulianCalendar.isLeapYear(year));
  }

}
