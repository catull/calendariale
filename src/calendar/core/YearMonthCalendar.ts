import { MonthCalendar } from './MonthCalendar';

export class YearMonthCalendar extends MonthCalendar {
  constructor(jdn: number, protected year: number, month: number, day: number) {
    super(jdn, month, day);
  }

  public getYear(): number {
    return this.year;
  }
}
