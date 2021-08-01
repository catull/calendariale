import {
  lunarPhase,
  lunarPhaseAtOrBefore,
  mod,
  moonLag,
  newMoonBefore,
  next,
  standardToUniversal,
  sunset,
} from '../Astro';
import { INVALID_DAY, INVALID_MONTH, J0000, MEAN_SYNODIC_MONTH, MoonPhase, babylonian } from '../Const';

import { BabylonianDate } from './BabylonianDate';
import { CalendarDateValidationException } from './core';

export class BabylonianCalendar {
  // Calculate Babylonian calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): BabylonianDate {
    const rataDie = jdn - J0000;
    const crescent = this.newMonthOnOrBefore(rataDie);
    const months = Math.round((crescent - babylonian.EPOCH_RD) / MEAN_SYNODIC_MONTH);
    const year = Math.floor((19 * months + 5) / 235) + 1;
    const approx = babylonian.EPOCH_RD + Math.round(Math.floor(((year - 1) * 235 + 13) / 19) * MEAN_SYNODIC_MONTH);
    const newYear = this.newMonthOnOrBefore(approx + 15);
    const month1 = Math.round((crescent - newYear) / 29.5) + 1;
    const isSpecial = mod(year, 19) === 18;
    const isLeap = isSpecial ? month1 === 7 : month1 === 13;
    const month = isLeap || (isSpecial && month1 > 6) ? month1 - 1 : month1;
    const day = rataDie - crescent + 1;

    return new BabylonianDate(jdn, year, month, isLeap, day);
  }

  // Is a given year in the Babylonian calendar a isLeap year?
  public static isLeapYear(year: number): boolean {
    return mod(7 * year + 13, 19) < 7;
  }

  // Determine Julian day number (JDN) from Babylonian calendar date
  public static toJdn(year: number, month: number, isLeap: boolean, day: number): number {
    this.validate(year, month, isLeap, day);

    return this.convertoToJdn(year, month, isLeap, day);
  }

  private static validate(year: number, month: number, isLeap: boolean, day: number): void {
    const maxMonths = 12 + (isLeap ? 1 : 0);
    if (month < 1 || month > maxMonths) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }

    const jdn = this.convertoToJdn(year, month, isLeap, day);
    const date = this.fromJdn(jdn);

    if (year !== date.getYear() || month !== date.getMonth() || isLeap !== date.isYearLeap() || day !== date.getDay()) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  private static convertoToJdn(year: number, month: number, isLeap: boolean, day: number): number {
    const month1 = isLeap || (mod(year, 19) === 18 && month > 6) ? month : month - 1;
    const months = Math.floor(((year - 1) * 235 + 13) / 19) + month1;
    const midmonth = babylonian.EPOCH_RD + Math.round(MEAN_SYNODIC_MONTH * months) + 15;

    return J0000 + this.newMonthOnOrBefore(midmonth) + day - 1;
  }

  private static newMonthOnOrBefore(rataDie: number): number {
    const moon = Math.floor(lunarPhaseAtOrBefore(MoonPhase.NEW, rataDie));
    const age = rataDie - moon;
    const tau = age <= 3 && !this.criterion(rataDie) ? moon - 30 : moon;

    return next(tau, (d: number): boolean => this.criterion(d));
  }

  private static criterion(rataDie: number): boolean {
    const rd = rataDie - 1;
    const set = sunset(rd, babylonian.LOCATION_BABYLON);
    const tee = standardToUniversal(set, babylonian.LOCATION_BABYLON);
    const phase = lunarPhase(tee);

    return (
      MoonPhase.NEW < phase &&
      phase < MoonPhase.FIRST_QUARTER &&
      newMoonBefore(tee) <= tee - 1 &&
      moonLag(rd, babylonian.LOCATION_BABYLON) > 1 / 30
    );
  }
}
