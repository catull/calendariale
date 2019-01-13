import { Symmetry454Calendar } from './Symmetry454Calendar';
import { LeapDate } from './core';

export class Symmetry454Date extends LeapDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day, Symmetry454Calendar.isLeapYear(year));
  }
}
