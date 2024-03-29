import { YearDate } from '../../../index';

import { describe, expect, it } from 'vitest';

describe('Year date spec', () => {
  it('should determine a year of an instance of YearDate', () => {
    let cal: YearDate = new YearDate(-1, 2000);
    expect(cal.getYear()).toBe(2000);

    cal = new YearDate(-1, 1900);
    expect(cal.getYear()).toBe(1900);
  });
});
