import { MonthDate } from './core';

export class MayanTzolkinDate extends MonthDate {
  constructor(jdn: number, month: number, day: number) {
    super(jdn, month, day);
  }
}
