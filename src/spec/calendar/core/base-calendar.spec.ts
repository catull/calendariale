import { BaseCalendar } from '../../../index';

describe ('Base calendar spec', () => {
  it ('should instantiate a BaseCalendar', () => {
    const cal: BaseCalendar = new BaseCalendar(0);

    expect (cal.getJdn()).toBe(0);
  });
});
