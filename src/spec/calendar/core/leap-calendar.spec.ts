import { LeapCalendar } from '../../../index';

describe ('Leap calendar spec', () => {
  it ('should determine a leap year of an instance of LeapCalendar', () => {
    let cal: LeapCalendar = new LeapCalendar(-1, 2000, 1, 1, true);
    expect (cal.isYearLeap()).toBe(true);

    cal = new LeapCalendar(-1, 1900, 1, 1, false);
    expect (cal.isYearLeap()).toBe(false);
  });
});
