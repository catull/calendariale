import { amod, mod } from '../Astro';
import { persian } from '../Const';
import { Calendar } from '../Calendar';

export class PersianArithmeticCalendar extends Calendar {
  constructor (year : number, month : number, day : number) {
    super (year, month, day);

     this.jdn = PersianArithmeticCalendar.toJdn (year, month, day);
     this.yearLeap = PersianArithmeticCalendar.isLeapYear (year);
  }

  // Is a given year in the Persian Arithmetic calendar a leap year?
  public static isLeapYear (year: number): boolean {
    const y0 = year > 0 ? year - 474 : year - 473,
        y1 = mod (y0, 2820) + 474;

    return mod ((y1 + 38) * 31, 128) < 31;
  }

  // Determine Julian day number from Persian Arithmetic calendar date
  public static toJdn (year: number, month: number, day: number): number {
    const y0     = year > 0 ? year - 474 : year - 473,
          y1     = mod (y0, 2820) + 474,
          offset = month <= 7 ? 31 * (month - 1) : 30 * (month - 1) + 6;

      return persian.EPOCH - 1 + 1029983 * Math.floor (y0 / 2820) +
             365 * (y1 - 1) + Math.floor ((31 * y1 - 5) / 128) + offset + day;
  }

  // Calculate Persian Arithmetic calendar date from Julian day
  public static fromJdn (jdn: number): Calendar {
    let year, month, yDay, day;

    year  = this.jdnToYear (jdn);
    yDay  = jdn - this.toJdn (year, 1, 1) + 1;

    if (yDay <= 186) {
      month = Math.ceil (yDay / 31);
      day   = amod (yDay, 31);
    } else {
      yDay -= 6;
      month = Math.ceil (yDay / 30);
      day   = amod (yDay, 30);
    }

    return new PersianArithmeticCalendar (year, month, day);
  }

  // Determine the year in the Persian Arithmetic calendar in which a
  // given Julian day falls.
  public static jdnToYear (jdn: number): number {
    let d0, n2820, d1, y2820, year;

    d0    = jdn - this.toJdn (475, 1, 1);
    n2820 = Math.floor (d0 / 1029983);
    d1    = mod (d0, 1029983);
    y2820 = d1 === 1029982 ? 2820 : Math.floor ((128 * d1 + 46878) / 46751);
    year  = 474 + 2820 * n2820 + y2820;

    return year > 0 ? year : year - 1;
  }
}
