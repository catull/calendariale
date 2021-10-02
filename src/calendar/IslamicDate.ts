import { IslamicCalendar } from './IslamicCalendar';
import { LeapDate } from './core/LeapDate';

export class IslamicDate extends LeapDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, IslamicCalendar.isLeapYear(year));
  }
}
