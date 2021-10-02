import { BaseDate } from './core/BaseDate';

export class AkanNameDate extends BaseDate {
  constructor(jdn: number, private prefix: number, private stem: number) {
    super(jdn);
  }

  public getPrefix(): number {
    return this.prefix;
  }

  public getStem(): number {
    return this.stem;
  }
}
