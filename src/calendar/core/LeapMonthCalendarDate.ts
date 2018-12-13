import { YearMonthCalendarDate } from './YearMonthCalendarDate';

export class LeapMonthCalendarDate extends YearMonthCalendarDate {
  constructor(jdn: number, year: number, month: number, day: number, protected monthLeap: boolean) {
    super(jdn, year, month, day);
  }

  public isMonthLeap(): boolean {
    return this.monthLeap;
  }
}
