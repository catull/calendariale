import { YearMonthCalendarDate } from './core';

export class YermCalendarDate extends YearMonthCalendarDate {

  constructor(jdn: number, private cycle: number, private yerm: number, month: number, day: number) {
    super(jdn, 0, month, day);
  }

  public getCycle (): number {
    return this.cycle;
  }

  public getYerm (): number {
    return this.yerm;
  }
}
