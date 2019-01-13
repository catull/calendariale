import { BaseDate } from './core';

export class BalinesePawukonDate extends BaseDate {
  constructor(
    jdn: number,
    private luang: boolean,
    private dwiwara: number,
    private triwara: number,
    private caturwara: number,
    private pancawara: number,
    private sadwara: number,
    private saptawara: number,
    private asatawara: number,
    private sangawara: number,
    private dasawara: number
  ) {
    super(jdn);
  }

  public isLuag(): boolean {
    return this.luang;
  }

  public getDwiwara(): number {
    return this.dwiwara;
  }

  public getTriwara(): number {
    return this.triwara;
  }

  public getCaturwara(): number {
    return this.caturwara;
  }

  public getPancawara(): number {
    return this.pancawara;
  }

  public getSadwara(): number {
    return this.sadwara;
  }

  public getSaptawara(): number {
    return this.saptawara;
  }

  public getAsatawara(): number {
    return this.asatawara;
  }

  public getSangawara(): number {
    return this.sangawara;
  }

  public getDasawara(): number {
    return this.dasawara;
  }
}
