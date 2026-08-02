import { YearMonthDate } from "./core/index";

export class GoddessDate extends YearMonthDate {
  constructor(
    jdn: number,
    private readonly cycle: number,
    year: number,
    month: number,
    day: number,
  ) {
    super(jdn, year, month, day);
  }

  public getCycle(): number {
    return this.cycle;
  }
}
