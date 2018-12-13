import { BaseCalendarDate } from './BaseCalendarDate';

export class MonthCalendarDate extends BaseCalendarDate {
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
