import { GregorianCalendar } from './GregorianCalendar';
import { LeapCalendarDate } from './core';

export class GregorianCalendarDate extends LeapCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, GregorianCalendar.isLeapYear(year));
  }

}
