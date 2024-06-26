import { BaseDate } from './core/index'

export class AztecTonalpohualliDate extends BaseDate {
  constructor (
    jdn: number,
    private readonly num: number,
    private readonly name: number
  ) {
    super(jdn)
  }

  public getNumber (): number {
    return this.num
  }

  public getName (): number {
    return this.name
  }
}
