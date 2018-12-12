export class BaseCalendar {
  constructor(protected jdn: number) {
  }

  public getJdn(): number {
    return this.jdn;
  }
}
