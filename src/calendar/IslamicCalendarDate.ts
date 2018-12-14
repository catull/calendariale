import { IslamicCalendar } from './IslamicCalendar';
import { LeapCalendarDate } from './core';

export class IslamicCalendarDate extends LeapCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, IslamicCalendar.isLeapYear(year));
  }

}
