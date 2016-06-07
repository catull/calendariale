import { mod, next } from '../Astro';
import { hinduCalendarYear, hinduSolarLongitude, hinduSunrise, hinduZodiac } from '../HinduAlgorithms';
import { hindu, J0000 } from '../Const';
import { CalendarValidationException, YearMonthCalendar } from '../Calendar';

export class HinduSolarModernCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, day: number) {
    super (jdn, year, month, day);
  }

  // Determine Julian day number from Hindu Solar Modern calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    this.validate (year, month, day);

    const begin = Math.floor ((year + hindu.SOLAR_ERA +
                 (month - 1) / 12) * hindu.SIDEREAL_YEAR + hindu.EPOCH_RD);

    return day - 1 + next (begin - 3, function (param) {
      const sunrise = hinduSunrise (param + 1);
      const zodiac = hinduZodiac (sunrise);

      return zodiac === month;
    }) + J0000;
  }

  public static validate (year: number, month: number, day: number) : void {
    if (month < 1 || month > 12) {
      throw new CalendarValidationException ('Invalid month');
    }

    const maxDays = (month < 7) ? 31 : 30;
    if (day < 1 || day > maxDays) {
      throw new CalendarValidationException ('Invalid day');
    }
  }

  // Calculate Hindu Solar Modern calendar date from Julian day
  public static fromJdn (jdn: number) {
    const jd0      = jdn - J0000;
    const critical = hinduSunrise (jd0 + 1);
    const month    = hinduZodiac (critical);
    const year     = hinduCalendarYear (critical) - hindu.SOLAR_ERA;
    const approx   = jd0 - 3 - mod (Math.floor (hinduSolarLongitude (critical)), 30);

    const begin    = next (approx, function (index) {
      return hinduZodiac (hinduSunrise (index + 1)) === month;
    });

    const day      = jd0 - begin + 1;

    return new HinduSolarModernCalendar (jdn, year, month, day);
  }
}
