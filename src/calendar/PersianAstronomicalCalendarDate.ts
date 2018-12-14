import { PersianAstronomicalCalendar } from './PersianAstronomicalCalendar';
import { LeapCalendarDate } from './core';

export class PersianAstronomicalCalendarDate extends LeapCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, PersianAstronomicalCalendar.isLeapYear(year));
  }

}
