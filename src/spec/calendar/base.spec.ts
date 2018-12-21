import { BaseCalendar as cal } from '../../calendar/BaseCalendar';
import { BaseDate } from '../../calendar/core';

describe('Base calendar spec', () => {
  it('should instantiate a BaseDate', () => {
    const date: BaseDate = cal.fromJdn(0);
    expect(date.getJdn()).toBe(0);
  });
});
