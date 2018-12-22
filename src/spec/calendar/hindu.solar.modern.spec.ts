import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';
import { HinduSolarModernCalendar as cal } from '../../calendar/HinduSolarModernCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { year: -664, month:  5, day: 19 } },
  { jdn:  -61387 + J0000, date: { year: -246, month:  9, day: 26 } },
  { jdn:   25469 + J0000, date: { year:   -8, month:  7, day:  9 } },
  { jdn:   49217 + J0000, date: { year:   57, month:  7, day: 16 } },
  { jdn:  171307 + J0000, date: { year:  391, month: 10, day: 21 } },
  { jdn:  210155 + J0000, date: { year:  498, month:  2, day: 31 } },
  { jdn:  253427 + J0000, date: { year:  616, month:  8, day: 16 } },
  { jdn:  369740 + J0000, date: { year:  935, month:  1, day: 28 } },
  { jdn:  400085 + J0000, date: { year: 1018, month:  2, day: 26 } },
  { jdn:  434355 + J0000, date: { year: 1111, month: 12, day: 23 } },
  { jdn:  452605 + J0000, date: { year: 1161, month: 12, day: 10 } },
  { jdn:  470160 + J0000, date: { year: 1210, month:  1, day:  2 } },
  { jdn:  473837 + J0000, date: { year: 1220, month:  1, day: 27 } },
  { jdn:  507850 + J0000, date: { year: 1313, month:  3, day:  8 } },
  { jdn:  524156 + J0000, date: { year: 1357, month: 10, day: 30 } },
  { jdn:  544676 + J0000, date: { year: 1414, month:  1, day:  5 } },
  { jdn:  567118 + J0000, date: { year: 1475, month:  6, day: 10 } },
  { jdn:  569477 + J0000, date: { year: 1481, month: 11, day: 29 } },
  { jdn:  601716 + J0000, date: { year: 1570, month:  3, day:  3 } },
  { jdn:  613424 + J0000, date: { year: 1602, month:  3, day: 22 } },
  { jdn:  626596 + J0000, date: { year: 1638, month:  4, day: 13 } },
  { jdn:  645554 + J0000, date: { year: 1690, month:  3, day: 10 } },
  { jdn:  664224 + J0000, date: { year: 1741, month:  4, day: 20 } },
  { jdn:  671401 + J0000, date: { year: 1760, month: 12, day: 16 } },
  { jdn:  694799 + J0000, date: { year: 1825, month:  1, day:  7 } },
  { jdn:  704424 + J0000, date: { year: 1851, month:  5, day: 10 } },
  { jdn:  708842 + J0000, date: { year: 1863, month:  6, day: 14 } },
  { jdn:  709409 + J0000, date: { year: 1865, month:  1, day:  7 } },
  { jdn:  709580 + J0000, date: { year: 1865, month:  6, day: 21 } },
  { jdn:  727274 + J0000, date: { year: 1913, month: 12, day:  4 } },
  { jdn:  728714 + J0000, date: { year: 1917, month: 11, day: 13 } },
  { jdn:  744313 + J0000, date: { year: 1960, month:  7, day: 24 } },
  { jdn:  764652 + J0000, date: { year: 2016, month:  4, day:  2 } },
];

describe ('Hindu Solar Modern calendar spec', () => {
  it ('should convert a Hindu Solar Modern date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hindu Solar Modern date', () => {
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
    expect (() => cal.toJdn (1999,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  1, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  2, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  3, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  4, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  5, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  6, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  7, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  8, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  9, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999, 10, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999, 11, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999, 12, 31)).toThrow (INVALID_DAY);
  });
});
