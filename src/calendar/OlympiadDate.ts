import { YearDate } from './core/index'

export class OlympiadDate extends YearDate {
  constructor (
    jdn: number,
    private readonly cycle: number,
    protected override year: number
  ) {
    super(jdn, year)
  }

  public getCycle (): number {
    return this.cycle
  }

  public override getYear (): number {
    return this.year
  }
}
