import { amod, estimatePriorSolarLongitude, midDay, mod, next, solarLongitude,
         standardToUniversal } from '../Astro';
import { persian, J0000, MEAN_TROPICAL_YEAR, Season } from '../Const';
import { Calendar } from '../Calendar';

export class PersianAstronomicalCalendar extends Calendar {
  constructor (year : number, month : number, day : number) {
    super (year, month, day);

     this.jdn = PersianAstronomicalCalendar.toJdn (year, month, day);
     this.yearLeap = PersianAstronomicalCalendar.isLeapYear (year);
  }

  // Is a given year in the Persian Astronmical calendar a leap year?
  public static isLeapYear (year: number): boolean {
      return this.toJdn (year + 1, 1, 1) -
        this.toJdn (year, 1, 1) > 365;
  }

  // Determine day number from Persian Astronmical calendar date
  public static toJdn (year: number, month: number, day: number): number {
    let temp, nowRuz;

    temp = year > 0 ? year - 1 : year;
    nowRuz = this.persianNewYearOnOrBefore (persian.EPOCH_RD + 180 +
        Math.floor (MEAN_TROPICAL_YEAR * temp));

    return nowRuz - 1 + day +
            ((month <= 7) ? 31 * (month - 1) : 30 * (month - 1) + 6) + J0000;
  }

  // Calculate Persian Astronmical calendar date from Julian day
  public static fromJdn (jdn: number): Calendar {
    let year, month, day, depoch, cycle, cyear, ycycle, aux1, aux2, yday;

    depoch = jdn - this.toJdn (475, 1, 1);
    cycle  = Math.floor (depoch / 1029983);
    cyear  = mod (depoch, 1029983);

    if (cyear === 1029982) {
        ycycle = 2820;
    } else {
        aux1 = Math.floor (cyear / 366);
        aux2 = mod (cyear, 366);
        ycycle = Math.floor ((2134 * aux1 + 2816 * aux2 + 2815) / 1028522) + aux1 + 1;
    }

    year = ycycle + 2820 * cycle + 474;

    if (year <= 0) {
        year -= 1;
    }

    yday  = jdn - this.toJdn (year, 1, 1) + 1;

    if (yday <= 186) {
        month = Math.ceil (yday / 31);
        day   = amod (yday, 31);
    } else {
        yday -= 6;
        month = Math.ceil (yday / 30);
        day   = amod (yday, 30);
    }

    return new PersianAstronomicalCalendar (year, month, day);
  }

  // Return the fixed date of Astronomical Persian New Year on or before fixed date
  private static persianNewYearOnOrBefore (jdn: number): number {
    let approx = estimatePriorSolarLongitude (Season.SPRING, this.midDayInTehran (jdn));

    return next (Math.floor (approx) - 1, function (day) {
      return solarLongitude (PersianAstronomicalCalendar.midDayInTehran (day)) <= Season.SPRING + 2;
    });
  };

  // Return  Universal time of midday on fixed date, date, in Tehran
  private static midDayInTehran (jdn: number): number {
    return standardToUniversal (
          midDay (jdn, persian.TEHRAN_LOCATION), persian.TEHRAN_LOCATION);
  }
}
