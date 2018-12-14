import { HebrewCalendar } from './HebrewCalendar';
import { LeapCalendarDate } from './core';

export class HebrewCalendarDate extends LeapCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, HebrewCalendar.isLeapYear(year));
  }

}
