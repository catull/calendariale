import { LeapCalendarDate } from '../../../index';

describe ('Leap calendar spec', () => {
  it ('should determine a leap year of an instance of LeapCalendarDate', () => {
    let cal: LeapCalendarDate = new LeapCalendarDate(-1, 2000, 1, 1, true);
    expect (cal.isYearLeap()).toBe(true);

    cal = new LeapCalendarDate(-1, 1900, 1, 1, false);
    expect (cal.isYearLeap()).toBe(false);
  });
});
