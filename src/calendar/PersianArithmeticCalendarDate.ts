import { PersianArithmeticCalendar } from './PersianArithmeticCalendar';
import { LeapCalendarDate } from './core';

export class PersianArithmeticCalendarDate extends LeapCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, PersianArithmeticCalendar.isLeapYear(year));
  }

}
