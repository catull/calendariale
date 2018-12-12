import { YearMonthCalendar } from './YearMonthCalendar';

export class LeapMonthCalendar extends YearMonthCalendar {
  constructor(jdn: number, year: number, month: number, day: number, protected monthLeap: boolean) {
    super(jdn, year, month, day);
  }

  public isMonthLeap(): boolean {
    return this.monthLeap;
  }
}
