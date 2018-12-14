import { CopticCalendar } from './CopticCalendar';
import { LeapDate } from './core';

export class CopticDate extends LeapDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, CopticCalendar.isLeapYear(year));
  }
}
