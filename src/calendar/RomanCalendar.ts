import { amod } from '../Astro';
import { julian, Month, RomanEvent } from '../Const';
import { Calendar } from '../Calendar';
import { JulianCalendar } from './JulianCalendar';


export class RomanCalendar extends Calendar {
  constructor (year : number, month : number, private event : number, private count : number, private leap : boolean) {
    super (year, month, -1);

     this.jdn = RomanCalendar.toJdn (year, month, event, count, leap);
  }

  // Determine Julian day number from Roman calendar date
  public static toJdn (year : number, month : number, event : RomanEvent, count : number, leap : boolean): number {
    const day =
      event === RomanEvent.KALENDS ? 1 :
        event === RomanEvent.NONES ? this.nonesOfMonth (month) :
          this.idesOfMonth (month);
    let jdn = JulianCalendar.toJdn (year, month, day) - count;

    if (leap) {
      jdn += 1;
    }

    if (!JulianCalendar.isLeapYear (year) ||
       month !== Month.MARCH ||
       event !== RomanEvent.KALENDS ||
       count < 6 ||
       count > 16) {
      jdn += 1;
    }

    return jdn;
  }

  // Calculate Roman calendar date from Julian day
  public static fromJdn (jdn: number): Calendar {
    const date = JulianCalendar.fromJdn (jdn);
    let year   = date.getYear ();
    let month  = date.getMonth ();
    let count  = date.getDay ();

    let event : RomanEvent, leap = false;

    if (count === 1) {
      event = RomanEvent.KALENDS;
    } else if (count <= this.nonesOfMonth (month)) {
      event = RomanEvent.NONES;
      count   = this.nonesOfMonth (month) - count + 1;
    } else if (count <= this.idesOfMonth (month)) {
      event = RomanEvent.IDES;
      count   = this.idesOfMonth (month) - count + 1;
    } else if (month !== Month.FEBRUARY || !JulianCalendar.isLeapYear (year)) {
      const month_ = amod (month + 1, 12);
      const year_  = month_ !== 1 ? year : year !== -1 ? year + 1 : 1;
      const kalends1 = this.toJdn (year_, month_, RomanEvent.KALENDS, 1, false);
      year  = year_;
      month = month_;
      event = RomanEvent.KALENDS;
      count   = kalends1 - jdn + 1;
    } else if (count < 25) {
      month = Month.MARCH;
      event = RomanEvent.KALENDS;
      count   = 30 - count;
    } else {
      month = Month.MARCH;
      event = RomanEvent.KALENDS;
      count   = 31 - count;
      leap = (count === 25);
    }

    return new RomanCalendar (year, month, event, count, leap);
  }

  /**
   * Return the date of the Ides in Roman month.
   * @param {number} month the month
   * @result {number} either the 15th or 13th
   */
  public static idesOfMonth (month : number) : number {
    if (month === Month.MARCH ||
      month === Month.MAY ||
      month === Month.JULY ||
      month === Month.OCTOBER) {
      return 15;
    }

    return 13;
  }

  /**
   * Return the date of the Nones in Roman month.
   * @param {number} month the month
   * @result {number} either the 7th or 5th
   */
  public static nonesOfMonth (month : number) : number {
    return this.idesOfMonth (month) - 8;
  }

/*
YEAR_ROME_FOUNDED = bce(753)

def julian_year_from_auc_year(year):
    """Return the Julian year equivalent to AUC year 'year'."""
    return ((year + YEAR_ROME_FOUNDED - 1)
            if (1 <= year <= (year - YEAR_ROME_FOUNDED))
            else (year + YEAR_ROME_FOUNDED))

def auc_year_from_julian_year(year):
    """Return the AUC year equivalent to Julian year 'year'."""
    return ((year - YEAR_ROME_FOUNDED - 1)
            if (YEAR_ROME_FOUNDED <= year <= -1)
            else (year - YEAR_ROME_FOUNDED))
*/
}
