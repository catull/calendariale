import { MonthDate } from './core';

export class MayanHaabDate extends MonthDate {
  constructor(jdn: number, month: number, day: number) {
    super(jdn, month, day);
  }
}
