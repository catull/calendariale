import { mod } from '../Astro';
import { hinduDayCount } from '../HinduAlgorithms';
import { hindu, J0000, ARYA_SOLAR_MONTH, ARYA_SOLAR_YEAR } from '../Const';
import { YearMonthCalendar } from '../Calendar';

export class HinduSolarOldCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day);
  }

  // Determine Julian day number from Hindu Solar Old calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    return Math.ceil (hindu.EPOCH + year * ARYA_SOLAR_YEAR +
        (month - 1) * ARYA_SOLAR_MONTH + day - 0.75) - 0.5;
  }

  // Calculate Hindu Solar Old calendar date from Julian day
  public static fromJdn (jdn: number) {
    const sun   = hinduDayCount (jdn) + 0.25;
    const year  = Math.floor (sun / ARYA_SOLAR_YEAR);
    const month = mod (Math.floor (sun / ARYA_SOLAR_MONTH), 12) + 1;
    const day   = Math.floor (mod (sun, ARYA_SOLAR_MONTH)) + 1;

    return new HinduSolarOldCalendar (jdn, year, month, day);
  }
}
