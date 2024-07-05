import { YearDate } from './core/index';

export class IsoWeekDate extends YearDate {
  constructor(
    jdn: number,
    year: number,
    private readonly week: number,
    private readonly day: number,
  ) {
    super(jdn, year);
  }

  public getWeek(): number {
    return this.week;
  }

  public getDay(): number {
    return this.day;
  }
}
