import { BaseCalendarDate } from './core';

export class ChineseDayNameCalendarDate extends BaseCalendarDate {

  constructor(jdn: number, private stem: number, private branch: number) {
    super(jdn);
  }

  public getStem (): number {
    return this.stem;
  }

  public getBranch (): number {
    return this.branch;
  }
}
