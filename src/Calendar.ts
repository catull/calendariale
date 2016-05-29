
export class BaseCalendar {
  constructor (protected jdn: number) {
  }

  getJdn () {
    return this.jdn;
  }
}

export class MonthCalendar extends BaseCalendar {
  constructor (jdn: number, protected month: number, protected day: number) {
    super (jdn);
  }

  getMonth () {
    return this.month;
  }

  getDay () {
    return this.day;
  }
}

export class YearCalendar extends BaseCalendar {
  constructor (jdn: number, protected year: number) {
    super (jdn);
  }

  getYear () {
    return this.year;
  }
}

export class YearMonthCalendar extends MonthCalendar {
  constructor (jdn: number, protected year: number, month: number, day: number) {
    super (jdn, month, day);
  }

  getYear () {
    return this.year;
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

export class LeapMonthCalendar extends LeapCalendar {
  constructor (jdn: number, year: number, month: number, day: number, yearLeap: boolean, protected monthLeap: boolean) {
      super (jdn, year, month, day, yearLeap);
  }

  isMonthLeap () {
    return this.monthLeap;
  }
}
