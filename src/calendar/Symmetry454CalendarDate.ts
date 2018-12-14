import { Symmetry454Calendar } from './Symmetry454Calendar';
import { LeapCalendarDate } from './core';

export class Symmetry454CalendarDate extends LeapCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, Symmetry454Calendar.isLeapYear(year));
  }

}
