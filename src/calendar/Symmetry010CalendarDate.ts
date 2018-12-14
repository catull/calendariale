import { Symmetry010Calendar } from './Symmetry010Calendar';
import { LeapCalendarDate } from './core';

export class Symmetry010CalendarDate extends LeapCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, Symmetry010Calendar.isLeapYear(year));
  }

}
