import { mod } from '../Astro';
import { hindu, ARYA_LUNAR_DAY, ARYA_LUNAR_MONTH, ARYA_SOLAR_MONTH, ARYA_SOLAR_YEAR } from '../Const';
import { hinduDayCount } from '../HinduAlgorithms';
import { CalendarValidationException, LeapMonthCalendar } from '../Calendar';

export class HinduLunarOldCalendar extends LeapMonthCalendar {
  // Is a given year in the Hindu Lunar Old calendar a leap year?
  public static isLeapYear(year: number): boolean {
    return mod(year * ARYA_SOLAR_YEAR - ARYA_SOLAR_MONTH, ARYA_LUNAR_MONTH) >= 23902504679 / 1282400064;
  }

  // Calculate Hindu Lunar Old calendar date from Julian day
  public static fromJdn(jdn: number): HinduLunarOldCalendar {
    const sun: number = hinduDayCount(jdn) + 0.25;
    const newMoon: number = sun - mod(sun, ARYA_LUNAR_MONTH);
    const monthLeap: boolean = ARYA_SOLAR_MONTH - ARYA_LUNAR_MONTH >= mod(newMoon, ARYA_SOLAR_MONTH) &&
      mod(newMoon, ARYA_SOLAR_MONTH) > 0;
    const month: number = mod(Math.ceil(newMoon / ARYA_SOLAR_MONTH), 12) + 1;
    const day: number = mod(Math.floor(sun / ARYA_LUNAR_DAY), 30) + 1;
    const year: number = Math.ceil((newMoon + ARYA_SOLAR_MONTH) / ARYA_SOLAR_YEAR) - 1;

    return new HinduLunarOldCalendar(jdn, year, month, monthLeap, day);
  }

  // Determine Julian day number from Hindu Lunar Modern calendar date
  public static toJdn(year: number, month: number, monthLeap: boolean, day: number): number {
    const jdn: number = this.calculateJdn(year, month, monthLeap, day);
    this.validate(year, month, monthLeap, day, jdn);

    return jdn;
  }

  private static validate(year: number, month: number, monthLeap: boolean, day: number, jdn: number): void {
    if (month < 1 || month > 12) {
      throw new CalendarValidationException('Invalid month');
    }

    if (day < 1 || day > 30) {
      throw new CalendarValidationException('Invalid day');
    }

    const date: HinduLunarOldCalendar = this.fromJdn(jdn);
    if (monthLeap !== date.isMonthLeap()) {
      throw new CalendarValidationException('Invalid leap month');
    }

    if (day !== date.day) {
      throw new CalendarValidationException('Invalid day');
    }
  }

  // Determine Julian day number from Hindu Lunar Old calendar date
  private static calculateJdn(year: number, month: number, monthLeap: boolean, day: number): number {
    const mina: number = (12 * year - 1) * ARYA_SOLAR_MONTH;
    const lunarNewYear: number = ARYA_LUNAR_MONTH * Math.ceil(mina / ARYA_LUNAR_MONTH);

    let temp: number = Math.ceil((lunarNewYear - mina) / (ARYA_SOLAR_MONTH - ARYA_LUNAR_MONTH));

    if (monthLeap || temp > month) {
      temp = month - 1;
    } else {
      temp = month;
    }

    return Math.ceil(hindu.EPOCH + lunarNewYear + ARYA_LUNAR_MONTH * temp +
      (day - 1) * ARYA_LUNAR_DAY - 0.75) + 0.5;
  }

  constructor(jdn: number, year: number, month: number, monthLeap: boolean, day: number) {
    super(jdn, year, month, day, monthLeap);
  }

}
