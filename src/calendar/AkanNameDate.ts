import { BaseDate } from './core/index';

export class AkanNameDate extends BaseDate {
  constructor(
    jdn: number,
    private readonly prefix: number,
    private readonly stem: number,
  ) {
    super(jdn);
  }

  public getPrefix(): number {
    return this.prefix;
  }

  public getStem(): number {
    return this.stem;
  }
}
