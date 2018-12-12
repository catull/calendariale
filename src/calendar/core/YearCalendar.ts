import { BaseCalendar } from './BaseCalendar';

export class YearCalendar extends BaseCalendar {
  constructor(jdn: number, protected year: number) {
    super(jdn);
  }

  public getYear(): number {
    return this.year;
  }
}
