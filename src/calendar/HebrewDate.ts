import { HebrewCalendar } from './HebrewCalendar';
import { LeapDate } from './core';

export class HebrewDate extends LeapDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, HebrewCalendar.isLeapYear(year));
  }

}
