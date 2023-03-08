import { BaseDate } from './core/index';

export class ChineseDayNameDate extends BaseDate {
  constructor(jdn: number, private stem: number, private branch: number) {
    super(jdn);
  }

  public getStem(): number {
    return this.stem;
  }

  public getBranch(): number {
    return this.branch;
  }
}
