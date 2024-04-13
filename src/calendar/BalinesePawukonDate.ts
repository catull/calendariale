import { BaseDate } from './core/index'

export class BalinesePawukonDate extends BaseDate {
  constructor (
    jdn: number,
    private readonly luang: boolean,
    private readonly dwiwara: number,
    private readonly triwara: number,
    private readonly caturwara: number,
    private readonly pancawara: number,
    private readonly sadwara: number,
    private readonly saptawara: number,
    private readonly asatawara: number,
    private readonly sangawara: number,
    private readonly dasawara: number
  ) {
    super(jdn)
  }

  public isLuag (): boolean {
    return this.luang
  }

  public getDwiwara (): number {
    return this.dwiwara
  }

  public getTriwara (): number {
    return this.triwara
  }

  public getCaturwara (): number {
    return this.caturwara
  }

  public getPancawara (): number {
    return this.pancawara
  }

  public getSadwara (): number {
    return this.sadwara
  }

  public getSaptawara (): number {
    return this.saptawara
  }

  public getAsatawara (): number {
    return this.asatawara
  }

  public getSangawara (): number {
    return this.sangawara
  }

  public getDasawara (): number {
    return this.dasawara
  }
}
