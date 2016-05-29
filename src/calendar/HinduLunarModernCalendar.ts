import { amod, mod, next } from '../Astro';
import { hindu, J0000, MEAN_SIDEREAL_YEAR } from '../Const';
import { hinduCalendarYear, hinduLunarDayFromMoment, hinduNewMoonBefore,
         hinduSolarLongitude, hinduSunrise, hinduZodiac } from '../HinduAlgorithms';
import { YearMonthCalendar } from '../Calendar';

export class HinduLunarModernCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, protected monthLeap: boolean, day: number, protected dayLeap: boolean) {
    super (jdn, year, month, day);
  }

  // Determine Julian day number from Hindu Lunar Modern calendar date
  public static toJdn (year: number, month: number, monthLeap: boolean, day: number, dayLeap: boolean): number {
      const approx = hindu.EPOCH_RD + hindu.SIDEREAL_YEAR * (year + hindu.LUNAR_ERA + (month - 1) / 12);
      const s0     = Math.floor (approx + 180 - hindu.SIDEREAL_YEAR *
                 mod (hinduSolarLongitude (approx) - (month - 1) * 30 + 180, 360) / 360);
      const k0     = hinduLunarDayFromMoment (s0 + 0.25);

      let temp, mid;

      if (k0 > 3 && k0 < 27) {
        temp = k0;
      } else {
        mid = this.fromJdn (s0 - 15 + J0000);

        if (mid.month !== month || (mid.monthLeap && !monthLeap)) {
          temp = mod (k0 + 15, 30) - 15;
        } else {
          temp = mod (k0 - 15, 30) + 15;
        }
      }

      const est = s0 + day - temp;
      const tau = est - mod (hinduLunarDayFromMoment (est + 0.25) - day + 15, 30) + 15;

      let date = next (tau - 1, function (d0) {
        const d1 = hinduLunarDayFromMoment (hinduSunrise (d0)),
            d2 = amod (day + 1, 30);

        return d1 === day || d1 === d2;
      });

      if (dayLeap) {
        date += 1;
      }

      return date + J0000;
  }

  // Calculate Hindu Lunar Modern calendar date from Julian day
  public static fromJdn (jdn: number) {
    const jd0         = jdn - J0000;
    const critical    = hinduSunrise (jd0);
    const day         = hinduLunarDayFromMoment (critical);
    const dayLeap     = day === hinduLunarDayFromMoment (hinduSunrise (jd0 - 1));
    const lastNewMoon = hinduNewMoonBefore (critical);
    const nextNewMoon = hinduNewMoonBefore (Math.floor (lastNewMoon) + 35);
    const monthSolar  = hinduZodiac (lastNewMoon);
    const monthLeap   = monthSolar === hinduZodiac (nextNewMoon);
    const month       = amod (monthSolar + 1, 12);
    const year        = hinduCalendarYear (month <= 2 ? jd0 + 180 : jd0) - hindu.LUNAR_ERA;

    return new HinduLunarModernCalendar (jdn, year, month, monthLeap, day, dayLeap);
  }
}
