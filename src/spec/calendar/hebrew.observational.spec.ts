import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';
import { HebrewObservationalCalendar as cal } from '../../calendar/HebrewObservationalCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { year: 3174, month:  5, day: 11 } },
  { jdn:  -61387 + J0000, date: { year: 3593, month:  9, day: 24 } },
  { jdn:   25469 + J0000, date: { year: 3831, month:  7, day:  2 } },
  { jdn:   49217 + J0000, date: { year: 3896, month:  7, day:  7 } },
  { jdn:  171307 + J0000, date: { year: 4230, month: 10, day: 18 } },
  { jdn:  210155 + J0000, date: { year: 4336, month:  3, day:  3 } },
  { jdn:  253427 + J0000, date: { year: 4455, month:  9, day: 13 } },
  { jdn:  369740 + J0000, date: { year: 4773, month:  2, day:  5 } },
  { jdn:  400085 + J0000, date: { year: 4856, month:  2, day: 22 } },
  { jdn:  434355 + J0000, date: { year: 4950, month:  1, day:  7 } },
  { jdn:  452605 + J0000, date: { year: 5000, month: 13, day:  7 } },
  { jdn:  470160 + J0000, date: { year: 5048, month:  1, day: 21 } },
  { jdn:  473837 + J0000, date: { year: 5058, month:  2, day:  7 } },
  { jdn:  507850 + J0000, date: { year: 5151, month:  3, day: 30 } },
  { jdn:  524156 + J0000, date: { year: 5196, month: 12, day:  6 } },
  { jdn:  544676 + J0000, date: { year: 5252, month:  2, day:  2 } },
  { jdn:  567118 + J0000, date: { year: 5313, month:  6, day: 30 } },
  { jdn:  569477 + J0000, date: { year: 5320, month: 12, day: 27 } },
  { jdn:  601716 + J0000, date: { year: 5408, month:  3, day: 18 } },
  { jdn:  613424 + J0000, date: { year: 5440, month:  4, day:  3 } },
  { jdn:  626596 + J0000, date: { year: 5476, month:  5, day:  4 } },
  { jdn:  645554 + J0000, date: { year: 5528, month:  4, day:  4 } },
  { jdn:  664224 + J0000, date: { year: 5579, month:  5, day: 10 } },
  { jdn:  671401 + J0000, date: { year: 5599, month:  1, day: 11 } },
  { jdn:  694799 + J0000, date: { year: 5663, month:  1, day: 20 } },
  { jdn:  704424 + J0000, date: { year: 5689, month:  6, day: 19 } },
  { jdn:  708842 + J0000, date: { year: 5702, month:  7, day:  7 } },
  { jdn:  709409 + J0000, date: { year: 5703, month:  2, day: 14 } },
  { jdn:  709580 + J0000, date: { year: 5704, month:  8, day:  7 } },
  { jdn:  727274 + J0000, date: { year: 5752, month:  1, day: 12 } },
  { jdn:  728714 + J0000, date: { year: 5756, month: 12, day:  5 } },
  { jdn:  744313 + J0000, date: { year: 5799, month:  9, day: 12 } },
  { jdn:  764652 + J0000, date: { year: 5854, month:  5, day:  5 } },
];

describe ('Hebrew Observational calendar spec', () => {
  it ('should convert a Hebrew Observational date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hebrew Observational date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (5000,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (5000, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (5000, 15, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (5000,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5000,  7, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5000,  2, 30)).toBeDefined ();
    expect (() => cal.toJdn (5000, 12, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5000, 12, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5001, 12, 30)).toBeDefined ();
    expect (() => cal.toJdn (5102,  8, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5103,  9, 30)).toBeDefined ();
  });
});
