import { YearCalendar } from '../../../index';

describe ('Year calendar spec', () => {
  it ('should determine a year of an instance of YearCalendar', () => {
    let cal: YearCalendar = new YearCalendar(-1, 2000);
    expect (cal.getYear()).toBe(2000);

    cal = new YearCalendar(-1, 1900);
    expect (cal.getYear()).toBe(1900);
  });
});
