import { MonthCalendarDate } from './core';

export class MayanTzolkinCalendarDate extends MonthCalendarDate {

  constructor(jdn: number, month: number, day: number) {
    super(jdn, month, day);
  }

}
