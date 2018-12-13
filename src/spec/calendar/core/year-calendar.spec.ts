import { YearCalendarDate } from '../../../index';

describe ('Year calendar spec', () => {
  it ('should determine a year of an instance of YearCalendarDate', () => {
    let cal: YearCalendarDate = new YearCalendarDate(-1, 2000);
    expect (cal.getYear()).toBe(2000);

    cal = new YearCalendarDate(-1, 1900);
    expect (cal.getYear()).toBe(1900);
  });
});
