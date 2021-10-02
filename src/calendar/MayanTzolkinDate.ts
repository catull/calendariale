import { MonthDate } from './core/MonthDate';

export class MayanTzolkinDate extends MonthDate {
  constructor(jdn: number, month: number, day: number) {
    super(jdn, month, day);
  }
}
