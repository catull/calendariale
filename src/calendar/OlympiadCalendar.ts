import { amod } from '../Astro';
import { INVALID_YEAR, olympiad } from '../Const';

import { JulianCalendar } from './JulianCalendar';
import { OlympiadDate } from './OlympiadDate';
import { CalendarDateValidationException } from './core';

export class OlympiadCalendar {
  // Determine Julian day number from Olympiad cycle and year
  public static toJdn(cycle: number, year: number): number {
    this.validate(cycle, year);
    let julianYear = olympiad.EPOCH_JULIAN_YEAR + (cycle - 1) * 4 + year - 1;

    if (julianYear >= 0) {
      julianYear += 1;
    }

    return JulianCalendar.toJdn(julianYear, 1, 1);
  }

  // Calculate Olympiad calendar date from Julian day
  public static fromJdn(jdn: number): OlympiadDate {
    const olympiadYears = Math.floor ((jdn - olympiad.EPOCH) / 365.25) + 1;
    const cycle = 1 + Math.floor((olympiadYears - 1) / 4);
    const year = amod(olympiadYears, 4);

    return new OlympiadDate(jdn, cycle, year);
  }

  private  static validate(cycle: number, year: number): void {
    if (year < 1 || year > 4) {
      throw new CalendarDateValidationException(INVALID_YEAR);
    }
  }

}
