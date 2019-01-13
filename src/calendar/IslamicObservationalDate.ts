import { IslamicObservationalCalendar } from './IslamicObservationalCalendar';
import { LeapDate } from './core';

export class IslamicObservationalDate extends LeapDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, IslamicObservationalCalendar.isLeapYear(year));
  }
}
