import { mod } from '../Astro';
import { aztec } from '../Const';
import { YearMonthCalendar } from '../Calendar';

export class AztecXihuitlCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day);
  }

  // Calculate Aztec Xihuitl calendar date from Julian day
  public static fromJdn (jdn: number) {
    const count = mod (jdn - aztec.XIHUITL_CORRELATION, 365);
    const day   = mod (count, 20) + 1;
    const month = Math.floor (count / 20) + 1;

    return new AztecXihuitlCalendar (jdn, 0, month, day);
  }

  // Return the number of elapsed days into cycle of Aztec Xihuitl date.
  public static toOrdinal (month: number, day: number) : number {
    return (month - 1) * 20 + day - 1;
  }

  // Return Julian day number of latest date on or before an Aztec Xihuitl date
  public static onOrBefore (month: number, day: number, jdn: number) {
    return jdn - mod (jdn - aztec.XIHUITL_CORRELATION - this.toOrdinal (month, day), 365);
  }
}
