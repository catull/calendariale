import { amod, mod } from '../Astro';
import { yerm_ } from '../Const';
import { CalendarValidationException, YearMonthCalendar } from '../Calendar';

export class YermCalendar extends YearMonthCalendar {
  constructor(jdn: number, private cycle: number, private yerm: number, month: number, day: number) {
    super(jdn, 0, month, day);
  }

  // Determine Julian day number from Yerm calendar date
  public static toJdn(cycle: number, yerm: number, month: number, day: number): number {
    this.validate(cycle, yerm, month, day);

    const c1: number = cycle - 1;
    const y1: number = yerm - 1;
    const m1: number = month - 1;

    return yerm_.EPOCH + 25101 * c1 +
      1447 * Math.floor(y1 / 3) + (y1 % 3) * 502 +
      59 * Math.floor(m1 / 2) + (m1 % 2) * 30 +
      day - 1;
  }

  // Calculate Yerm calendar date from Julian day
  public static fromJdn(jdn: number): YermCalendar {
    let day = jdn - yerm_.EPOCH;

    const cycle: number = Math.floor(day / 25101) + 1;
    day = mod(day, 25101);
    let yerm: number = 3 * Math.floor(day / 1447) + 1;
    day = mod(day, 1447);
    yerm = yerm + Math.floor(day / 502);
    day = mod(day, 502);
    let month: number = 2 * Math.floor(day / 59) + 1;
    day = mod(day, 59);
    month = month + Math.floor(day / 30);
    day = mod(day, 30) + 1;

    return new YermCalendar(jdn, cycle, yerm, month, day);
  }

  public static validate(cycle: number, yerm: number, month: number, day: number): void {
    if (yerm < 1 || yerm > 52) {
      throw new CalendarValidationException('Invalid yerm');
    }

    const monthMax: number = (yerm % 3 === 0) ? 15 : 17;
    if (month < 1 || month > monthMax) {
      throw new CalendarValidationException('Invalid month');
    }

    const dayMax: number = (month % 2 === 1) ? 30 : 29;
    if (day < 1 || day > dayMax) {
      throw new CalendarValidationException('Invalid day');
    }
  }
}
