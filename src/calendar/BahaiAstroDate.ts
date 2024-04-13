import { BahaiAstroCalendar } from './BahaiAstroCalendar'
import { LeapDate } from './core/index'

export class BahaiAstroDate extends LeapDate {
  constructor (
    jdn: number,
    private readonly kullIShay: number,
    private readonly vahid: number,
    protected override year: number,
    protected override month: number,
    protected override day: number
  ) {
    super(jdn, year, month, day, BahaiAstroCalendar.isLeapYear(year))
  }

  public getKullIShay (): number {
    return this.kullIShay
  }

  public getVahid (): number {
    return this.vahid
  }
}
