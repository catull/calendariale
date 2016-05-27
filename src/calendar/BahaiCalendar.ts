import { amod, deltaT, equationOfTime, equinox, mod } from '../Astro';
import { bahai, gregorian, TROPICAL_YEAR } from '../Const';
import { Calendar } from '../Calendar';
import { GregorianCalendar } from './GregorianCalendar';

export class BahaiCalendar extends Calendar {
    constructor (
      private kull_i_shay: number,
      private vahid: number,
      year: number,
      month: number,
      day : number) {
        super (year, month, day);

        this.jdn = BahaiCalendar.toJdn (year, month, day);
        this.yearLeap = BahaiCalendar.isLeapYear (year);
    }

    // Determine the year in the Bahai // astronomical calendar in which a
    // given Julian day falls.
    public static jdnToYear (jdn: number): number {
      return this.jdnToYearAndOffset (jdn)[0];
    }

    // Determine the year in the Bahai // astronomical calendar in which a
    // given Julian day falls.
    // Returns an array of two elements:
    //
    // **[0]** Bahai year
    // **[1]** Julian day number containing equinox for this year.
    private static jdnToYearAndOffset (jdn: number): number[] {
      return this.lastTehranEquinox (jdn, bahai.EPOCH);
    }

    // Determine Julian day number from Bahai calendar date, where the year is
    // pre-calculated as
    //    1844 + 361 * (kull-i-shay - 1) + 19 * (vahid - 1) + year - 1
    public static toJdn (year: number, month: number, day: number): number {
        let gy, jd, leap, yearDays;

        gy = year + GregorianCalendar.fromJdn (bahai.EPOCH).getYear () - 1;

        if (year < 172) {
          leap = GregorianCalendar.isLeapYear (gy + 1);
          jd = GregorianCalendar.toJdn (gy, 3, 20);
        } else {
          leap = this.isLeapYear (year);
          jd = this.tehranEquinoxJd (gy);
        }

        if (month === 0) {
          yearDays = 342;
        } else if (month === 19) {
          yearDays = 342 + (leap ? 5 : 4);
        } else {
          yearDays = (month - 1) * 19;
        }

        return jd + yearDays + day;
    }

    // Determine Julian day from Bahai date
    public static bahaiToJdn (major: number, vahid: number, year: number, month: number, day: number) {
        return this.toJdn (361 * (major - 1) + 19 * (vahid - 1) + year, month, day);
    }

    // Is a given year in the Bahai calendar a leap year?
    // Bahai uses same leap rule as Gregorian until 171 Bahai Era
    // From 172 onwards, it uses the Bahai leap year algorithm
    // The year 171 of the Bahai Era corresponds to Gregorian year 2015
    public static isLeapYear (year: number): boolean {
      const gy = 1843 + year;

      if (gy < 2015) {
        return GregorianCalendar.isLeapYear (gy);
      }

      const eq1 = Math.floor (equinox (gy, 0) - 0.115192) + 0.5;
      const eq2 = Math.floor (equinox (gy + 1, 0) - 0.115192) + 0.5;
      const days = eq2 - eq1;

      return days > 365;
    }

    // Calculate Bahai calendar date from Julian day
    public static fromJdn (jdn: number): Calendar {
        let jd0, major, vahid, year, month, day, gy, bstarty, by, bys, days, old, leap, leapDays;

        jd0 = Math.floor (jdn - 0.5) + 0.5;
        old = jd0 < bahai.EPOCH172;

        if (old) {
          gy      = GregorianCalendar.fromJdn (jd0).getYear ();
          leap    = GregorianCalendar.isLeapYear (gy + 1);
          bstarty = GregorianCalendar.fromJdn (bahai.EPOCH).getYear ();
          bys     = gy - (bstarty + (GregorianCalendar.toJdn (gy, 1, 1) <= jd0 &&
                        jd0 <= GregorianCalendar.toJdn (gy, 3, 20) ? 1 : 0)) + 1;
        } else {
          by      = this.jdnToYearAndOffset (jd0);
          bys     = by[0];
          leap    = this.isLeapYear (bys);
          days    = jd0 - by[1];
        }

        major     = Math.floor (bys / 361) + 1;
        vahid     = Math.floor (mod (bys - 1, 361) / 19) + 1;
        year      = amod (bys, 19);
        leapDays  = leap ? 5 : 4;

        if (old) {
          days    = jd0 - this.bahaiToJdn (major, vahid, year, 1, 1) + 1;
        }

        if (days <= 18 * 19) {
          month = 1 + Math.floor ((days - 1) / 19);
          day   = amod (days, 19);
        } else if (days > 18 * 19 + leapDays) {
          month = 19;
          day   = amod (days - leapDays - 1, 19);
        } else {
          month = 0;
          day   = days - 18 * 19;
        }

        return new BahaiCalendar (major, vahid, year, month, day);
    }

    // Determine Julian day and fraction of the
    // March equinox at the Tehran meridian in
    // a given Gregorian year.
    private static tehranEquinox (year: number): number {
      let equJED, equJD, equAPP, equTehran, dtTehran;

      // March equinox in dynamical time
      equJED = equinox (year, 0);

      // Correct for delta T to obtain Universal time
      equJD = equJED - deltaT (year) / (24 * 60 * 60);

      // Apply the equation of time to yield the apparent time at Greenwich
      equAPP = equJD + equationOfTime (equJED);

      // Finally, we must correct for the constant difference between
      // the Greenwich meridian andthe time zone standard for
      // Iran Standard time, 52°30' to the East.
      dtTehran  = 52.5 / 360;
      equTehran = equAPP + dtTehran;

      return equTehran;
    }

    // Calculate Julian day during which the
    // March equinox, reckoned from the Tehran
    // meridian, occurred for a given Gregorian year.
    private static tehranEquinoxJd (year: number): number {
      let ep, epg;

      ep  = this.tehranEquinox (year);
      epg = Math.floor (ep - 0.5) + 0.5;

      return epg;
    }

    // Determine the year in the astronomical calendar in which a
    // given Julian day falls, given the epoch.
    // Returns an array of two elements:
    //
    // **[0]** Persian year
    // **[1]** Julian day number containing equinox for this year.
    private static lastTehranEquinox (jd: number, epoch: number): number[] {
      let guess = GregorianCalendar.fromJdn (jd).getYear () - 2,
        lasteq, nexteq, adr;

      lasteq = this.tehranEquinoxJd (guess);

      while (lasteq > jd) {
        guess -= 1;
        lasteq = this.tehranEquinoxJd (guess);
      }

      nexteq = lasteq - 1;

      while (lasteq > jd || jd >= nexteq) {
        lasteq = nexteq;
        guess += 1;
        nexteq = this.tehranEquinoxJd (guess);
      }

      adr = Math.round ((lasteq - epoch) / TROPICAL_YEAR) + 1;

      return [ adr, lasteq ];
    }
}
