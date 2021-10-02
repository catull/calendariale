import { LeapDate } from './core/LeapDate';

export class BabylonianDate extends LeapDate {
  constructor(jdn: number, year: number, month: number, leap: boolean, day: number) {
    super(jdn, year, month, day, leap);
  }
}
