import { mod, next } from '../Astro';
import { hinduCalendarYear, hinduSolarLongitude, hinduSunrise, hinduZodiac } from '../HinduAlgorithms';
import { hindu, J0000 } from '../Const';
import { Calendar } from '../Calendar';

export class HinduSolarModernCalendar extends Calendar {
  constructor (year: number, month: number, day: number) {
    super (year, month, day);

    this.jdn = HinduSolarModernCalendar.toJdn (year, month, day);
  }

  // Determine Julian day number from Hindu Solar Modern calendar date
  public static toJdn (year: number, month: number, day: number) : number {
    const begin = Math.floor ((year + hindu.SOLAR_ERA +
                 (month - 1) / 12) * hindu.SIDEREAL_YEAR + hindu.EPOCH_RD);

    return day - 1 + next (begin - 3, function (param) {
      const sunrise = hinduSunrise (param + 1);
      const zodiac = hinduZodiac (sunrise);

      return zodiac === month;
    }) + J0000;
  }

  // Calculate Hindu Solar Modern calendar date from Julian day
  public static fromJdn (jdn: number) : Calendar {
    const jd0      = jdn - J0000;
    const critical = hinduSunrise (jd0 + 1);
    const month    = hinduZodiac (critical);
    const year     = hinduCalendarYear (critical) - hindu.SOLAR_ERA;
    const approx   = jd0 - 3 - mod (Math.floor (hinduSolarLongitude (critical)), 30);

    const begin    = next (approx, function (index) {
      return hinduZodiac (hinduSunrise (index + 1)) === month;
    });

    const day      = jd0 - begin + 1;

    return new HinduSolarModernCalendar (year, month, day);
  }
}
