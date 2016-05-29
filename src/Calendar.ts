
export class BaseCalendar {
  constructor (protected jdn: number) {
  }

  getJdn () {
    return this.jdn;
  }
}

export class YearCalendar extends BaseCalendar {
  protected dayLeap: boolean = false;
  protected monthLeap: boolean = false;
  protected yearLeap: boolean = false;

  constructor (jdn: number, protected year: number) {
    super (jdn);
  }

  getYear () {
    return this.year;
  }
}

export class YearMonthCalendar extends YearCalendar {
  constructor (jdn: number, year: number, protected month: number, protected day: number) {
    super (jdn, year);
  }

  getMonth () {
    return this.month;
  }

  getDay () {
    return this.day;
  }
}

export class LeapCalendar extends YearMonthCalendar {
  constructor (jdn: number, year: number, month: number, day: number, protected yearLeap: boolean) {
    super (jdn, year, month, day);
  }

  isYearLeap () {
    return this.yearLeap;
  }
}

export class LeapDayCalendar extends LeapCalendar {
  constructor (jdn: number, year: number, month: number, day: number, yearLeap: boolean, protected dayLeap: boolean) {
    super (jdn, year, month, day, yearLeap);
  }

  isDayLeap () {
    return this.dayLeap;
  }
}

export class LeapMonthCalendar extends LeapCalendar {
  constructor (jdn: number, year: number, month: number, day: number, yearLeap: boolean, protected monthLeap: boolean) {
      super (jdn, year, month, day, yearLeap);
  }

  isMonthLeap () {
    return this.monthLeap;
  }
}
