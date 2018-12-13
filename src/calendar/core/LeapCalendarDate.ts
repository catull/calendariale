
import { YearMonthCalendarDate } from './YearMonthCalendarDate';

export class LeapCalendarDate extends YearMonthCalendarDate {
  constructor(jdn: number, year: number, month: number, day: number, protected yearLeap: boolean) {
    super(jdn, year, month, day);
  }

  public isYearLeap(): boolean {
    return this.yearLeap;
  }
}
