import { LeapDayMonthDate } from './core';

export class HinduLunarAstroDate extends LeapDayMonthDate {
  constructor(jdn: number, year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean) {
    super(jdn, year, month, day, monthLeap, dayLeap);
  }
}
