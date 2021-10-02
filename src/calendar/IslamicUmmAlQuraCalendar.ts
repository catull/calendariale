import { lunarPhase, lunarPhaseAtOrBefore, mod, moonLag, next, standardToUniversal, sunset } from '../Astro';
import { INVALID_DAY, INVALID_MONTH, J0000, MEAN_SYNODIC_MONTH, MoonPhase, islamic } from '../Const';

import { IslamicUmmAlQuraDate } from './IslamicUmmAlQuraDate';
import { CalendarDateValidationException } from './core/CalendarDateValidationException';

export class IslamicUmmAlQuraCalendar {
  // Calculate Islamic calendar date from Julian day
  public static fromJdn(jdn: number): IslamicUmmAlQuraDate {
    const crescent: number = this.saudiNewMonthOnOrBefore(jdn);
    const elapsedMonths: number = Math.round((crescent - islamic.EPOCH_RD) / MEAN_SYNODIC_MONTH);
    const year: number = Math.floor(elapsedMonths / 12) + 1;
    const month: number = mod(elapsedMonths, 12) + 1;
    const day: number = jdn - J0000 - crescent + 1;

    return new IslamicUmmAlQuraDate(jdn, year, month, day);
  }

  // Determine Julian day number from Islamic Umm al-Qura calendar date
  public static toJdn(year: number, month: number, day: number): number {
    this.validate(year, month, day);

    const midmonth = islamic.EPOCH + Math.floor(((year - 1) * 12 + month - 0.5) * MEAN_SYNODIC_MONTH);

    return J0000 + this.saudiNewMonthOnOrBefore(midmonth) + day - 1;
  }

  // Is a given year in the Islamic calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return (year * 11 + 14) % 30 < 11;
  }

  private static validate(year: number, month: number, day: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  private static saudiNewMonthOnOrBefore(jdn: number): number {
    const rataDie = jdn - J0000;
    const moon = Math.floor(lunarPhaseAtOrBefore(MoonPhase.NEW, rataDie));
    const age = rataDie - moon;
    const tau = age <= 3 && !this.saudiCriterion(rataDie) ? moon - 30 : moon;

    return next(tau, (d: number): boolean => this.saudiCriterion(d));
  }

  private static saudiCriterion(rataDie: number): boolean {
    const set = sunset(rataDie - 1, islamic.LOCATION_MECCA);
    const tee = standardToUniversal(set, islamic.LOCATION_MECCA);
    const phase = lunarPhase(tee);

    return MoonPhase.NEW < phase && phase < MoonPhase.FIRST_QUARTER && moonLag(rataDie - 1, islamic.LOCATION_MECCA) > 0;
  }
}
