import { YearMonthDate } from './core/index';

export class HinduSolarAstroDate extends YearMonthDate {
  constructor(jdn: number, year: number, month: number, day: number) {
    super(jdn, year, month, day);
  }
}
