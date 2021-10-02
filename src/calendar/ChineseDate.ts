import { LeapMonthDate } from './core/LeapMonthDate';

export class ChineseDate extends LeapMonthDate {
  constructor(jdn: number, protected cycle: number, year: number, month: number, monthLeap: boolean, day: number) {
    super(jdn, year, month, day, monthLeap);
  }

  public getCycle(): number {
    return this.cycle;
  }
}
