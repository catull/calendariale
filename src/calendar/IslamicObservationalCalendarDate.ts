import { IslamicObservationalCalendar } from './IslamicObservationalCalendar';
import { LeapCalendarDate } from './core';

export class IslamicObservationalCalendarDate extends LeapCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, IslamicObservationalCalendar.isLeapYear(year));
  }

}
