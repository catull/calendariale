import { YearMonthDate } from './core/index'

export class YermDate extends YearMonthDate {
  constructor (
    jdn: number,
    private readonly cycle: number,
    private readonly yerm: number,
    month: number,
    day: number
  ) {
    super(jdn, 0, month, day)
  }

  public getCycle (): number {
    return this.cycle
  }

  public getYerm (): number {
    return this.yerm
  }
}
