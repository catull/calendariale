import { BaseDate } from '../../../calendar/core/BaseDate';

describe('Base date spec', () => {
  it('should instantiate a BaseDate', () => {
    const cal: BaseDate = new BaseDate(0);

    expect(cal.getJdn()).toBe(0);
  });
});
