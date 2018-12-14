import { RomanEvent } from '../Const';

import { YearMonthCalendarDate } from './core';

export class RomanCalendarDate extends YearMonthCalendarDate {

  constructor (jdn: number, year: number, month: number, private event: RomanEvent, private count: number, private leap: boolean) {
    super (jdn, year, month, -1);
  }

  public getEvent (): RomanEvent {
    return this.event;
  }

  public getCount (): number {
    return this.count;
  }

  public isLeap (): boolean {
    return this.leap;
  }

}
