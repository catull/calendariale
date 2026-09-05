import { InternationalFixedCalendar } from "./InternationalFixedCalendar";
import { LeapDate } from "./core/index";

export class InternationalFixedDate extends LeapDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, InternationalFixedCalendar.isLeapYear(year));
  }
}
