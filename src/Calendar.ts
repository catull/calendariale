
export class BaseCalendar {
  constructor(protected jdn: number) {
  }

  getJdn(): number {
    return this.jdn;
  }
}

export class MonthCalendar extends BaseCalendar {
  constructor(jdn: number, protected month: number, protected day: number) {
    super(jdn);
  }

  getMonth(): number {
    return this.month;
  }

  getDay(): number {
    return this.day;
  }
}

export class YearCalendar extends BaseCalendar {
  constructor(jdn: number, protected year: number) {
    super(jdn);
  }

  getYear(): number {
    return this.year;
  }
}

export class YearMonthCalendar extends MonthCalendar {
  constructor(jdn: number, protected year: number, month: number, day: number) {
    super(jdn, month, day);
  }

  getYear(): number {
    return this.year;
  }
}

export class LeapCalendar extends YearMonthCalendar {
  constructor(jdn: number, year: number, month: number, day: number, protected yearLeap: boolean) {
    super(jdn, year, month, day);
  }

  isYearLeap(): boolean {
    return this.yearLeap;
  }
}

export class LeapMonthCalendar extends YearMonthCalendar {
  constructor(jdn: number, year: number, month: number, day: number, protected monthLeap: boolean) {
    super(jdn, year, month, day);
  }

  isMonthLeap(): boolean {
    return this.monthLeap;
  }
}

export class LeapDayMonthCalendar extends LeapMonthCalendar {
  constructor(jdn: number, year: number, month: number, day: number, monthLeap: boolean, protected dayLeap: boolean) {
    super(jdn, year, month, day, monthLeap);
  }

  isDayLeap(): boolean {
    return this.dayLeap;
  }
}

export class CalendarValidationException extends Error {
  constructor(public error: string) {
    super(error);
  }
}
