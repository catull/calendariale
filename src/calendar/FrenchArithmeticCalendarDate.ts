import { FrenchArithmeticCalendar } from './FrenchArithmeticCalendar';
import { LeapCalendarDate } from './core';

export class FrenchArithmeticCalendarDate extends LeapCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, FrenchArithmeticCalendar.isLeapYear(year));
  }

}
