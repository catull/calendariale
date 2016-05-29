import { amod, final, mod } from '../Astro';
import { tibetan } from '../Const';
import { YearMonthCalendar } from '../Calendar';

export class TibetanCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, protected monthLeap: boolean, day: number, protected dayLeap: boolean) {
    super (jdn, year, month, day);
  }

  public static isLeapMonth (year: number, month: number) : boolean {
    return month === this.fromJdn (this.toJdn (year, month, true, 2, false)).getMonth ();
  }

  // Determine Julian day number from Tibetan calendar date
  public static toJdn (year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean) : number {
    const months     = Math.floor (804 / 65 * (year - 1) + 67 / 65 * month + (monthLeap ? -1 : 0) + 64 / 65);
    const days       = 30 * months + day;
    const mean       = days * 11135 / 11312 - 30 + (dayLeap ? 0 : -1) + 1071 / 1616;
    const solAnomaly = mod (days * 13 / 4824 + 2117 / 4824, 1);
    const lunAnomaly = mod (days * 3781 / 105840 + 2837 / 15120, 1);
    const sun        = this.tibetanSunEquation (12 * solAnomaly);
    const moon       = this.tibetanMoonEquation (28 * lunAnomaly);

    return Math.floor (tibetan.EPOCH + mean - sun + moon - 0.5) + 0.5;
  }

  // Calculate Tibetan calendar date from Julian day
  public static fromJdn (jdn: number) {
    const capY = 365 + 4975 / 18382;
    const years = Math.ceil ((jdn - tibetan.EPOCH) / capY);

    let year0 = years;

    while (jdn >= this.toJdn (year0, 1, false, 1, false)) {
      year0 += 1;
    }

    year0 -= 1;
    let month0 = 1;
    while (jdn >= this.toJdn (year0, month0, false, 1, false)) {
      month0 += 1;
    }

    month0 -= 1;
    const est = jdn - this.toJdn (year0, month0, false, 1, false);
    let day0 = est - 2;

    while (jdn >= this.toJdn (year0, month0, false, day0, false)) {
      day0 += 1;
    }

    day0 -= 1;
    let monthLeap = day0 > 30;
    const day = amod (day0, 30);

    let temp;

    if (day > day0) {
      temp = month0 - 1;
    } else if (monthLeap) {
      temp = month0 + 1;
    } else {
      temp = month0;
    }

    const month = amod (temp, 12);
    let year;

    if (day > day0 && month0 === 1) {
      year = year0 - 1;
    } else if (monthLeap && month0 === 12) {
      year = year0 + 1;
    } else {
      year = year0;
    }

    const dayLeap = jdn === this.toJdn (year, month, monthLeap, day, true);

    return new TibetanCalendar (jdn, year, month, monthLeap, day, dayLeap);
  }

  /**
   * Determine if num is a non-integer number.
   * @param {float|int} num a number
   * @return {boolean} is it float ?
   */
  private static isFloat (num: number) : boolean {
    return Boolean (Boolean (num % 1));
  }

  /**
   * Return the interpolated tabular sine of lunar anomaly alpha.
   * @param {float} alpha lunar anomaly
   * @return {float} sine value
   */
  private static tibetanMoonEquation (alpha: number) : number {
    const alphaInt = Math.floor (alpha);

    if (alpha > 14) {
      return -this.tibetanMoonEquation (alpha - 14);
    }

    if (alpha > 7) {
      return this.tibetanMoonEquation (14 - alpha);
    }

    if (!this.isFloat (alpha)) {
      return [ 0, 5, 10, 15, 19, 22, 24, 25 ][alphaInt] / 60;
    }

    return mod ( alpha, 1) * this.tibetanMoonEquation (Math.ceil (alpha)) +
           mod (-alpha, 1) * this.tibetanMoonEquation (alphaInt);
  }

  /**
   * Return the interpolated tabular sine of solar anomaly alpha.
   * @param {float} alpha solar anomaly
   * @return {float} sine value
   */
  private static tibetanSunEquation (alpha: number) : number {
    const alphaInt = Math.floor (alpha);

    if (alpha > 6) {
      return -this.tibetanSunEquation (alpha - 6);
    }

    if (alpha > 3) {
      return this.tibetanSunEquation (6 - alpha);
    }

    if (!this.isFloat (alpha)) {
      return [ 0, 6, 10, 11 ][alphaInt] / 60;
    }

    return mod ( alpha, 1) * this.tibetanSunEquation (Math.ceil (alpha)) +
           mod (-alpha, 1) * this.tibetanSunEquation (alphaInt);
  }
}
