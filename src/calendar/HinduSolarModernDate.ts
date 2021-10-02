import { YearMonthDate } from './core/YearMonthDate';

export class HinduSolarModernDate extends YearMonthDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day);
  }
}
