import { LeapMonthDate } from './core';

export class HinduLunarOldDate extends LeapMonthDate {

  constructor(jdn: number, year: number, month: number, monthLeap: boolean, day: number) {
    super(jdn, year, month, day, monthLeap);
  }

}
