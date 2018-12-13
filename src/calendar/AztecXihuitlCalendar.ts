import { mod } from '../Astro';
import { aztec } from '../Const';

import { MonthCalendar } from './core';

export class AztecXihuitlCalendar extends MonthCalendar {
  // Calculate Aztec Xihuitl calendar date from Julian day
  public static fromJdn(jdn: number): AztecXihuitlCalendar {
    const count: number = mod(jdn - aztec.XIHUITL_CORRELATION, 365);
    const day: number = mod(count, 20) + 1;
    const month: number = Math.floor(count / 20) + 1;

    return new AztecXihuitlCalendar(jdn, month, day);
  }

  // Return the number of elapsed days into cycle of Aztec Xihuitl date.
  public static toOrdinal(month: number, day: number): number {
    return (month - 1) * 20 + day - 1;
  }

  // Return Julian day number of latest date on or before an Aztec Xihuitl date
  public static onOrBefore(month: number, day: number, jdn: number): number {
    return jdn - mod(jdn - aztec.XIHUITL_CORRELATION - this.toOrdinal(month, day), 365);
  }

  constructor(jdn: number, month: number, day: number) {
    super(jdn, month, day);
  }
}
