import { BaseCalendarDate } from './BaseCalendarDate';

export class YearCalendarDate extends BaseCalendarDate {
  constructor(jdn: number, protected year: number) {
    super(jdn);
  }

  public getYear(): number {
    return this.year;
  }
}
