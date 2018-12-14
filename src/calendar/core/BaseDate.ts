export class BaseDate {
  constructor(protected jdn: number) {
  }

  public getJdn(): number {
    return this.jdn;
  }
}
