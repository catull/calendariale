import { mod } from '../Astro';
import { mayan } from '../Const';
import { MonthCalendar } from './core';

export class MayanHaabCalendar extends MonthCalendar {
  // Calculate Mayan Haab calendar date from Julian day
  public static fromJdn(jdn: number): MayanHaabCalendar {
    const count: number = Math.floor(jdn) + 0.5 - mayan.EPOCH;
    const day: number = mod(count + 8 + 17 * 20, 365);

    return new MayanHaabCalendar(jdn, Math.floor(day / 20) + 1, mod(day, 20));
  }

  constructor(jdn: number, month: number, day: number) {
    super(jdn, month, day);
  }

}
