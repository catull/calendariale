import { MonthDate } from './core/MonthDate';

export class AztecXihuitlDate extends MonthDate {
  constructor(jdn: number, month: number, day: number) {
    super(jdn, month, day);
  }
}
