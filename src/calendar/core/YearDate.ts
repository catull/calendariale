import { BaseDate } from './BaseDate';

export class YearDate extends BaseDate {
  constructor(jdn: number, protected year: number) {
    super(jdn);
  }

  public getYear(): number {
    return this.year;
  }
}
