import { LeapDayMonthCalendarDate } from './core';

export class TibetanCalendarDate extends LeapDayMonthCalendarDate {

  constructor(jdn: number, year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean) {
    super(jdn, year, month, day, monthLeap, dayLeap);
  }

}
