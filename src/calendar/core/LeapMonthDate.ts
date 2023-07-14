import { YearMonthDate } from './YearMonthDate';

export class LeapMonthDate extends YearMonthDate {
  constructor(
    jdn: number,
    year: number,
    month: number,
    day: number,
    protected monthLeap: boolean,
  ) {
    super(jdn, year, month, day);
  }

  public isMonthLeap(): boolean {
    return this.monthLeap;
  }
}
