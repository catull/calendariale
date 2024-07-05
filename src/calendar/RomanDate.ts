import type { RomanEvent } from '../Const';

import { YearMonthDate } from './core/index';

export class RomanDate extends YearMonthDate {
  constructor(
    jdn: number,
    year: number,
    month: number,
    private readonly event: RomanEvent,
    private readonly count: number,
    private readonly leap: boolean,
  ) {
    super(jdn, year, month, -1);
  }

  public getEvent(): RomanEvent {
    return this.event;
  }

  public getCount(): number {
    return this.count;
  }

  public isLeap(): boolean {
    return this.leap;
  }
}
