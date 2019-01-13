import { YearMonthDate } from './YearMonthDate';

export class LeapDate extends YearMonthDate {
  constructor(jdn: number, year: number, month: number, day: number, protected yearLeap: boolean) {
    super(jdn, year, month, day);
  }

  public isYearLeap(): boolean {
    return this.yearLeap;
  }
}
