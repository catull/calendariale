import { korean } from '../Const';
import { Location } from '../Location';

import { ChineseCalendar } from './ChineseCalendar';
import { KoreanDate } from './KoreanDate';

export class KoreanCalendar extends ChineseCalendar {
  // Calculate Korean calendar date from rata die
  public static fromJdn(jdn: number): KoreanDate {
    return super.fromJdn(jdn) as KoreanDate;
  }

  protected static createDate(jdn: number, cycle: number, year: number, month: number, monthLeap: boolean, day: number): KoreanDate {
    return new KoreanDate(jdn, cycle, year, month, monthLeap, day);
  }

  protected static getEpochRD(): number {
    return korean.EPOCH_RD;
  }

  // Return location of Beijing; time zone varies with time.
  protected static getLocation(rataDie: number): Location {
    // before to 1904/04/01 Gregorian C.E.
    if (rataDie < 696608) {
      return korean.LOCATION_BEFORE_1904_04;
    }

    // From 1904/04/01 until 1911/12/31 Gregorian C.E.
    if (rataDie < 697978) {
      return korean.LOCATION_FROM_1904_04_TO_1911;
    }

    // From 1912/01/01 until 1954/03/20 Gregorian C.E.
    if (rataDie < 713398) {
      return korean.LOCATION_SEOUL;
    }

    // From 1954/03/21 until 1961/08/09 Gregorian C.E.
    if (rataDie < 716097) {
      return korean.LOCATION_FROM_1954_04_TO_1961_08;
    }

    return korean.LOCATION_SEOUL;
  }
}
