import { BahaiAstroCalendar } from './BahaiAstroCalendar';
import { LeapDate } from './core';

export class BahaiAstroDate extends LeapDate {
  constructor(
    jdn: number,
    private kullIShay: number,
    private vahid: number,
    protected year: number,
    protected month: number,
    protected day: number,
  ) {
    super(jdn, year, month, day, BahaiAstroCalendar.isLeapYear(year));
  }

  public getKullIShay(): number {
    return this.kullIShay;
  }

  public getVahid(): number {
    return this.vahid;
  }
}
