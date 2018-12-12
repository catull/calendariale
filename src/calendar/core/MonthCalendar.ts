import { BaseCalendar } from './BaseCalendar';

export class MonthCalendar extends BaseCalendar {
  constructor(jdn: number, protected month: number, protected day: number) {
    super(jdn);
  }

  public getMonth(): number {
    return this.month;
  }

  public getDay(): number {
    return this.day;
  }
}
