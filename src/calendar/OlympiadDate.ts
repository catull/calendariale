import { YearDate } from './core/YearDate';

export class OlympiadDate extends YearDate {
  constructor(jdn: number, private cycle: number, protected year: number) {
    super(jdn, year);
  }

  public getCycle(): number {
    return this.cycle;
  }

  public getYear(): number {
    return this.year;
  }
}
