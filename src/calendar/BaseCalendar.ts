import { J0000 } from '../Const';

import { BaseDate } from './core';

export class BaseCalendar {
  // Calculate calendar date from Julian day number
  public static fromJdn(jdn: number): BaseDate {
    return new BaseDate(jdn);
  }

  public static fromRd(rataDie: number): BaseDate {
    return this.fromJdn(rataDie + J0000);
  }

}
