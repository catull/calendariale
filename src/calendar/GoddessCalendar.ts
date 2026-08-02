import { mod } from "../Astro";
import { INVALID_DAY, INVALID_MONTH, INVALID_YEAR, goddess } from "../Const";

import { GoddessDate } from "./GoddessDate";
import { CalendarDateValidationException } from "./core/index";

export class GoddessCalendar {
  // Calculate Goddess calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): GoddessDate {
    const gdn: number = jdn - goddess.EPOCH_CYCLE_0;
    const cycle: number = Math.floor(gdn / goddess.CYCLE_IN_DAYS);
    const cycleDays: number = mod(gdn, goddess.CYCLE_IN_DAYS);
    const shorts: number =
      Math.floor(cycleDays / goddess.DECADE_IN_DAYS) +
      (cycleDays >= goddess.CYCLE_IN_DAYS / 2 ? 1 : 0);
    const year: number = shorts + Math.floor((cycleDays - shorts * 383) / 384) + 1;
    const yearDays: number = cycleDays - (year - 1) * 384 + shorts;
    const month: number = Math.floor(yearDays / goddess.AVERAGE_MONTH_LENGTH) + 1;
    const day: number = yearDays - (month - 1) * 30 + Math.floor((month - 1) / 2) + 1;

    return new GoddessDate(jdn, cycle, year, month, day);
  }

  // Determine Julian day number (JDN) from Goddess calendar date
  public static toJdn(year: number, month: number, day: number): number {
    return this.toJdnCycle(1, year, month, day);
  }

  // Determine Julian day number (JDN) from Goddess calendar date
  public static toJdnCycle(cycle: number, year: number, month: number, day: number): number {
    this.validate(cycle, year, month, day);

    const shorts: number =
      Math.floor((year - 1) / 10) + (year >= goddess.CYCLE_IN_YEARS / 2 ? 1 : 0);

    return (
      goddess.EPOCH_CYCLE_0 +
      cycle * goddess.CYCLE_IN_DAYS +
      (year - 1) * goddess.DAYS_IN_YEAR -
      shorts +
      (month - 1) * 30 -
      Math.floor((month - 1) / 2) +
      day -
      1
    );
  }

  private static validate(_cycle: number, year: number, month: number, day: number): void {
    if (year < 1 || year > goddess.CYCLE_IN_YEARS) {
      throw new CalendarDateValidationException(INVALID_YEAR);
    }

    if (month < 1 || month > 13) {
      throw new CalendarDateValidationException(INVALID_MONTH);
    }

    const isShort: boolean = year % 10 === 0 || year % 235 === 0;
    const max = month % 2 === 0 || (month === 13 && isShort) ? 29 : 30;

    if (day < 1 || day > max) {
      throw new CalendarDateValidationException(INVALID_DAY);
    }
  }
}
