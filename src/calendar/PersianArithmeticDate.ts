import { PersianArithmeticCalendar } from './PersianArithmeticCalendar';
import { LeapDate } from './core';

export class PersianArithmeticDate extends LeapDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, PersianArithmeticCalendar.isLeapYear(year));
  }
}
