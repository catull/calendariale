import { LeapMonthCalendarDate } from './core';

export class ChineseCalendarDate extends LeapMonthCalendarDate {

  constructor(jdn: number, private cycle: number, year: number, month: number, monthLeap: boolean, day: number) {
    super(jdn, year, month, day, monthLeap);
  }

  public getCycle(): number {
    return this.cycle;
  }
}
