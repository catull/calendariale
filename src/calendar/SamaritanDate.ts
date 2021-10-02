import { SamaritanCalendar } from './SamaritanCalendar';
import { LeapDate } from './core/LeapDate';

export class SamaritanDate extends LeapDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, SamaritanCalendar.isLeapYear(year));
  }
}
