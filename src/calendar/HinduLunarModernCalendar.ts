import { amod, mod3, next } from '../Astro';
import { INVALID_DAY, INVALID_LEAP_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, J0000, hindu } from '../Const';

import {
  hinduDateYear,
  hinduLunarDayFromMoment,
  hinduNewMoonBefore,
  hinduSolarLongitude,
  hinduSunrise,
  hinduZodiac,
} from './HinduAlgorithms';
import { HinduLunarModernDate } from './HinduLunarModernDate';
import { CalendarDateValidationException } from './core/CalendarDateValidationException';

export class HinduLunarModernCalendar {
  // Calculate Hindu Lunar Modern calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): HinduLunarModernDate {
    const jd0: number = jdn - J0000;
    const critical: number = hinduSunrise(jd0);
    const day: number = hinduLunarDayFromMoment(critical);
    const dayLeap: boolean = day === hinduLunarDayFromMoment(hinduSunrise(jd0 - 1));
    const lastNewMoon: number = hinduNewMoonBefore(critical);
    const nextNewMoon: number = hinduNewMoonBefore(Math.floor(lastNewMoon) + 35);
    const monthSolar: number = hinduZodiac(lastNewMoon);
    const monthLeap: boolean = monthSolar === hinduZodiac(nextNewMoon);
    const month: number = amod(monthSolar + 1, 12);
    const year: number = hinduDateYear(month <= 2 ? jd0 + 180 : jd0) - hindu.LUNAR_ERA;

    return new HinduLunarModernDate(jdn, year, month, monthLeap, day, dayLeap);
  }

  // Determine Julian day number (JDN) from Hindu Lunar Modern calendar date
  public static toJdn(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const jdn: number = this.calculateJdn(year, month, monthLeap, day, dayLeap);
    this.validate(year, month, monthLeap, day, dayLeap, jdn);

    return jdn;
  }

  private static validate(
    year: number,
    month: number,
    monthLeap: boolean,
    day: number,
    dayLeap: boolean,
    jdn: number,
  ): void {
    if (month < 1 || month > 12) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    if (day < 1 || day > 30) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }

    const date: HinduLunarModernDate = this.fromJdn(jdn);
    if (monthLeap !== date.isMonthLeap()) {
      throw new CalendarDateValidationException(INVALID_LEAP_MONTH);
    }

    if (dayLeap !== date.isDayLeap()) {
      throw new CalendarDateValidationException(INVALID_LEAP_DAY);
    }

    if (day !== date.getDay()) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }

  private static calculateJdn(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const approx: number = hindu.EPOCH_RD + hindu.SIDEREAL_YEAR * (year + hindu.LUNAR_ERA + (month - 1) / 12);
    const s: number = Math.floor(
      approx - hindu.SIDEREAL_YEAR * mod3(hinduSolarLongitude(approx) / 360 - (month - 1) / 12, -0.5, 0.5),
    );
    const k: number = hinduLunarDayFromMoment(s + 0.25);

    let temp: number;

    if (k > 3 && k < 27) {
      temp = k;
    } else {
      const mid: HinduLunarModernDate = this.fromJdn(s - 15 + J0000);
      temp = mid.getMonth() !== month || (mid.isMonthLeap() && !monthLeap) ? mod3(k, -15, 15) : mod3(k, 15, 45);
    }

    const est: number = s + day - temp;
    const tau: number = est - mod3(hinduLunarDayFromMoment(est + 0.25) - day, -15, 15);

    const date: number =
      next(tau - 1, (d: number): boolean => {
        const d1: number = hinduLunarDayFromMoment(hinduSunrise(d));
        const d2: number = amod(day + 1, 30);

        return d1 === day || d1 === d2;
      }) + (dayLeap ? 1 : 0);

    return date + J0000;
  }
}
