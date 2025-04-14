import { ChineseDate } from './ChineseDate'

export class KoreanDate extends ChineseDate {
  constructor (
    jdn: number,
    protected override cycle: number,
    year: number,
    month: number,
    monthLeap: boolean,
    day: number
  ) {
    super(jdn, cycle, year, month, monthLeap, day)
  }

  public override getCycle (): number {
    return this.cycle
  }
}
