import { BahaiCalendar } from './BahaiCalendar';
import { LeapCalendarDate } from './core';

export class BahaiCalendarDate extends LeapCalendarDate {

  constructor(
    jdn: number,
    private kullIShay: number,
    private vahid: number,
    year: number,
    month: number,
    day: number) {
    super(jdn, year, month, day, BahaiCalendar.isLeapYear(year));
  }

  public getKullIshay (): number {
    return this.kullIShay;
  }

  public getVahid (): number {
    return this.vahid;
  }
}
