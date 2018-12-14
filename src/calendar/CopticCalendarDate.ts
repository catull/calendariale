import { CopticCalendar } from './CopticCalendar';
import { LeapCalendarDate } from './core';

export class CopticCalendarDate extends LeapCalendarDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, CopticCalendar.isLeapYear(year));
  }
}
