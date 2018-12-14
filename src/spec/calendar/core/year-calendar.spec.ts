import { YearDate } from '../../../index';

describe ('Year calendar spec', () => {
  it ('should determine a year of an instance of YearDate', () => {
    let cal: YearDate = new YearDate(-1, 2000);
    expect (cal.getYear()).toBe(2000);

    cal = new YearDate(-1, 1900);
    expect (cal.getYear()).toBe(1900);
  });
});
