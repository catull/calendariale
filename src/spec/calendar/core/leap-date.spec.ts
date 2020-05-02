import { LeapDate } from '../../../index';

describe('Leap date spec', () => {
  it('should determine a leap year of an instance of LeapDate', () => {
    let cal: LeapDate = new LeapDate(-1, 2000, 1, 1, true);
    expect(cal.isYearLeap()).toBe(true);

    cal = new LeapDate(-1, 1900, 1, 1, false);
    expect(cal.isYearLeap()).toBe(false);
  });
});
