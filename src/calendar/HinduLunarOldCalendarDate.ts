import { LeapMonthCalendarDate } from './core';

export class HinduLunarOldCalendarDate extends LeapMonthCalendarDate {

  constructor(jdn: number, year: number, month: number, monthLeap: boolean, day: number) {
    super(jdn, year, month, day, monthLeap);
  }

}
