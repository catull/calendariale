import { YearMonthDate } from './core/index';

export class FrenchRevolutionaryDate extends YearMonthDate {
  constructor(
    jdn: number,
    an: number,
    mois: number,
    private readonly decade: number,
    jour: number,
  ) {
    super(jdn, an, mois, jour);
  }

  public getDecade(): number {
    return this.decade;
  }
}
