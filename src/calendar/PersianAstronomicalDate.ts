import { PersianAstronomicalCalendar } from './PersianAstronomicalCalendar';
import { LeapDate } from './core/LeapDate';

export class PersianAstronomicalDate extends LeapDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, PersianAstronomicalCalendar.isLeapYear(year));
  }
}
