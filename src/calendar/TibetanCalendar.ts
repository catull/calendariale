import { amod, mod } from '../Astro';
import { tibetan } from '../Const';
import { CalendarValidationException, LeapDayMonthCalendar } from '../Calendar';

export class TibetanCalendar extends LeapDayMonthCalendar {
  constructor(jdn: number, year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean) {
    super(jdn, year, month, day, monthLeap, dayLeap);
  }

  public static isLeapMonth(year: number, month: number): boolean {
    return month === this.fromJdn(this.calculateJdn(year, month, true, 2, false)).getMonth();
  }

  // Determine Julian day number from Tibetan calendar date
  public static toJdn(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const jdn: number = this.calculateJdn(year, month, monthLeap, day, dayLeap);
    this.validate(year, month, monthLeap, day, dayLeap, jdn);

    return jdn;
  }

  private static validate(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean, jdn: number) {
    if (month < 1 || month > 13) {
      throw new CalendarValidationException('Invalid month');
    }

    if (monthLeap && !this.isLeapMonth(year, month)) {
      throw new CalendarValidationException('Invalid leap month');
    }

    const date: TibetanCalendar = this.fromJdn(jdn);
    if (date.isDayLeap() !== dayLeap) {
      throw new CalendarValidationException('Invalid leap day');
    }
    if (date.getDay() !== day || day < 1 || day > 30) {
      throw new CalendarValidationException('Invalid day');
    }
  }

  // Determine Julian day number from Tibetan calendar date
  private static calculateJdn(year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
    const months: number = Math.floor(804 / 65 * (year - 1) + 67 / 65 * month + (monthLeap ? -1 : 0) + 64 / 65);
    const days: number = 30 * months + day;
    const mean: number = days * 11135 / 11312 - 30 + (dayLeap ? 0 : -1) + 1071 / 1616;
    const solAnomaly: number = mod(days * 13 / 4824 + 2117 / 4824, 1);
    const lunAnomaly: number = mod(days * 3781 / 105840 + 2837 / 15120, 1);
    const sun: number = this.tibetanSunEquation(12 * solAnomaly);
    const moon: number = this.tibetanMoonEquation(28 * lunAnomaly);

    return Math.floor(tibetan.EPOCH + mean - sun + moon - 0.5) + 0.5;
  }

  // Calculate Tibetan calendar date from Julian day
  public static fromJdn(jdn: number): TibetanCalendar {
    const capY: number = 365 + 4975 / 18382;
    const years: number = Math.ceil((jdn - tibetan.EPOCH) / capY);

    let year0: number = years;

    while (jdn >= this.calculateJdn(year0, 1, false, 1, false)) {
      year0 += 1;
    }

    year0 -= 1;
    let month0: number = 1;
    while (jdn >= this.calculateJdn(year0, month0, false, 1, false)) {
      month0 += 1;
    }

    month0 -= 1;
    const est: number = jdn - this.calculateJdn(year0, month0, false, 1, false);
    let day0: number = est - 2;

    while (jdn >= this.calculateJdn(year0, month0, false, day0, false)) {
      day0 += 1;
    }

    day0 -= 1;
    let monthLeap: boolean = day0 > 30;
    const day: number = amod(day0, 30);

    let temp: number;

    if (day > day0) {
      temp = month0 - 1;
    } else if (monthLeap) {
      temp = month0 + 1;
    } else {
      temp = month0;
    }

    const month: number = amod(temp, 12);
    let year: number;

    if (day > day0 && month0 === 1) {
      year = year0 - 1;
    } else if (monthLeap && month0 === 12) {
      year = year0 + 1;
    } else {
      year = year0;
    }

    const dayLeap: boolean = jdn === this.calculateJdn(year, month, monthLeap, day, true);

    return new TibetanCalendar(jdn, year, month, monthLeap, day, dayLeap);
  }

  /**
   * Determine if num is a non-integer number.
   * @param {float|int} num a number
   * @return {boolean} is it float ?
   */
  private static isFloat(num: number): boolean {
    return Boolean(Boolean(num % 1));
  }

  /**
   * Return the interpolated tabular sine of lunar anomaly alpha.
   * @param {float} alpha lunar anomaly
   * @return {float} sine value
   */
  private static tibetanMoonEquation(alpha: number): number {
    const alphaInt: number = Math.floor(alpha);

    if (alpha > 14) {
      return -this.tibetanMoonEquation(alpha - 14);
    }

    if (alpha > 7) {
      return this.tibetanMoonEquation(14 - alpha);
    }

    if (!this.isFloat(alpha)) {
      return [0, 5, 10, 15, 19, 22, 24, 25][alphaInt] / 60;
    }

    return mod(alpha, 1) * this.tibetanMoonEquation(Math.ceil(alpha)) +
      mod(-alpha, 1) * this.tibetanMoonEquation(alphaInt);
  }

  /**
   * Return the interpolated tabular sine of solar anomaly alpha.
   * @param {float} alpha solar anomaly
   * @return {float} sine value
   */
  private static tibetanSunEquation(alpha: number): number {
    const alphaInt: number = Math.floor(alpha);

    if (alpha > 6) {
      return -this.tibetanSunEquation(alpha - 6);
    }

    if (alpha > 3) {
      return this.tibetanSunEquation(6 - alpha);
    }

    if (!this.isFloat(alpha)) {
      return [0, 6, 10, 11][alphaInt] / 60;
    }

    return mod(alpha, 1) * this.tibetanSunEquation(Math.ceil(alpha)) +
      mod(-alpha, 1) * this.tibetanSunEquation(alphaInt);
  }
}
