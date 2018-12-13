import { BaseCalendarDate } from '../../../index';

describe ('Base calendar spec', () => {
  it ('should instantiate a BaseCalendarDate', () => {
    const cal: BaseCalendarDate = new BaseCalendarDate(0);

    expect (cal.getJdn()).toBe(0);
  });
});
