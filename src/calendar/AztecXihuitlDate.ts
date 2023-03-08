import { MonthDate } from './core/index';

export class AztecXihuitlDate extends MonthDate {
  constructor(jdn: number, month: number, day: number) {
    super(jdn, month, day);
  }
}
