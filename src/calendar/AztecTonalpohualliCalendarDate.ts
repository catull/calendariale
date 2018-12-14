import { BaseCalendarDate } from './core';

export class AztecTonalpohualliCalendarDate extends BaseCalendarDate {

  constructor(jdn: number, private num: number, private name: number) {
    super(jdn);
  }

  public getNumber (): number {
    return this.num;
  }

  public getName (): number {
    return this.name;
  }
}
