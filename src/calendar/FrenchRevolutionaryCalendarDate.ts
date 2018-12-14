import { YearMonthCalendarDate } from './core';

export class FrenchRevolutionaryCalendarDate extends YearMonthCalendarDate {

  constructor(jdn: number, an: number, mois: number, private decade: number, jour: number) {
    super(jdn, an, mois, jour);
  }

  public getDecade (): number {
    return this.decade;
  }

}
