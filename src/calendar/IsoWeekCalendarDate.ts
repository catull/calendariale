import { YearCalendarDate } from './core';

export class IsoWeekCalendarDate extends YearCalendarDate {

  constructor(jdn: number, year: number, private week: number, private day: number) {
    super(jdn, year);
  }

  public getWeek(): number {
    return this.week;
  }

  public getDay(): number {
    return this.day;
  }

}
