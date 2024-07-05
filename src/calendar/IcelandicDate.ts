import type { Season } from '../Const';

import { YearDate } from './core/index';

export class IcelandicDate extends YearDate {
  constructor(
    jdn: number,
    year: number,
    private readonly season: Season,
    private readonly week: number,
    private readonly day: number,
  ) {
    super(jdn, year);
  }

  public getSeason(): Season {
    return this.season;
  }

  public getWeek(): number {
    return this.week;
  }

  public getDay(): number {
    return this.day;
  }
}
