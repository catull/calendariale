export class BaseCalendarDate {
  constructor(protected jdn: number) {
  }

  public getJdn(): number {
    return this.jdn;
  }
}
