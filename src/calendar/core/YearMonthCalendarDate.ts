import { MonthCalendarDate } from './MonthCalendarDate';

export class YearMonthCalendarDate
 extends MonthCalendarDate {
  constructor(jdn: number, protected year: number, month: number, day: number) {
    super(jdn, month, day);
  }

  public getYear(): number {
    return this.year;
  }
}
