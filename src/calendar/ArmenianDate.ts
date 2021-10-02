import { YearMonthDate } from './core/YearMonthDate';

export class ArmenianDate extends YearMonthDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day);
  }
}
