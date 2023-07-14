import { MonthDate } from './MonthDate';

export class YearMonthDate extends MonthDate {
  constructor(
    jdn: number,
    protected year: number,
    month: number,
    day: number,
  ) {
    super(jdn, month, day);
  }

  public getYear(): number {
    return this.year;
  }
}
