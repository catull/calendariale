
import { YearMonthCalendar } from './YearMonthCalendar';

export class LeapCalendar extends YearMonthCalendar {
  constructor(jdn: number, year: number, month: number, day: number, protected yearLeap: boolean) {
    super(jdn, year, month, day);
  }

  public isYearLeap(): boolean {
    return this.yearLeap;
  }
}
