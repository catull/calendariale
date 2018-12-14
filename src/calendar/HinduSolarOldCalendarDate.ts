import { YearMonthCalendarDate } from './core';

export class HinduSolarOldCalendarDate extends YearMonthCalendarDate {

  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day);
  }

}
