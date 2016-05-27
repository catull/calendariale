export interface CalendarValidator {
  validate (): void;
}

export class Calendar implements CalendarValidator {
  protected jdn: number;
  protected dayLeap: boolean = false;
  protected monthLeap: boolean = false;
  protected yearLeap: boolean = false;

  public static fromJdn (jdn: number): Calendar {
    let y = -1, m = -1, d = -1;

    const cal = new Calendar (y, m, d);
    cal.validate ();

    return cal;
  }

  constructor (protected year: number, protected month: number, protected day: number) {
  }

  public getJdn (): number {
    return this.jdn;
  }

  public getYear (): number {
    return this.year;
  }

  public getMonth (): number {
    return this.month;
  }

  public getMonthLeap () : boolean {
    return this.monthLeap;
  }

  public getDay (): number {
    return this.day;
  }

  validate () {
    return;
  }
}
