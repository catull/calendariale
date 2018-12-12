import { LeapMonthCalendar } from './LeapMonthCalendar';

export class LeapDayMonthCalendar extends LeapMonthCalendar {
  constructor(jdn: number, year: number, month: number, day: number, monthLeap: boolean, protected dayLeap: boolean) {
    super(jdn, year, month, day, monthLeap);
  }

  public isDayLeap(): boolean {
    return this.dayLeap;
  }
}
