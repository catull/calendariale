import { MonthCalendarDate } from './core';

export class MayanHaabCalendarDate extends MonthCalendarDate {

  constructor(jdn: number, month: number, day: number) {
    super(jdn, month, day);
  }

}
