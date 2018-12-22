import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';
import { EthiopicCalendar as cal } from '../../calendar/EthiopicCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { year: -594, month: 12, day:  6 } },
  { jdn:  -61387 + J0000, date: { year: -175, month:  4, day: 12 } },
  { jdn:   25469 + J0000, date: { year:   63, month:  1, day: 29 } },
  { jdn:   49217 + J0000, date: { year:  128, month:  2, day:  5 } },
  { jdn:  171307 + J0000, date: { year:  462, month:  5, day: 12 } },
  { jdn:  210155 + J0000, date: { year:  568, month:  9, day: 23 } },
  { jdn:  253427 + J0000, date: { year:  687, month:  3, day: 11 } },
  { jdn:  369740 + J0000, date: { year: 1005, month:  8, day: 24 } },
  { jdn:  400085 + J0000, date: { year: 1088, month:  9, day: 23 } },
  { jdn:  434355 + J0000, date: { year: 1182, month:  7, day: 20 } },
  { jdn:  452605 + J0000, date: { year: 1232, month:  7, day:  7 } },
  { jdn:  470160 + J0000, date: { year: 1280, month:  7, day: 30 } },
  { jdn:  473837 + J0000, date: { year: 1290, month:  8, day: 25 } },
  { jdn:  507850 + J0000, date: { year: 1383, month: 10, day: 10 } },
  { jdn:  524156 + J0000, date: { year: 1428, month:  5, day: 29 } },
  { jdn:  544676 + J0000, date: { year: 1484, month:  8, day:  5 } },
  { jdn:  567118 + J0000, date: { year: 1546, month:  1, day: 12 } },
  { jdn:  569477 + J0000, date: { year: 1552, month:  6, day: 29 } },
  { jdn:  601716 + J0000, date: { year: 1640, month: 10, day:  6 } },
  { jdn:  613424 + J0000, date: { year: 1672, month: 10, day: 26 } },
  { jdn:  626596 + J0000, date: { year: 1708, month: 11, day: 19 } },
  { jdn:  645554 + J0000, date: { year: 1760, month: 10, day: 14 } },
  { jdn:  664224 + J0000, date: { year: 1811, month: 11, day: 27 } },
  { jdn:  671401 + J0000, date: { year: 1831, month:  7, day: 19 } },
  { jdn:  694799 + J0000, date: { year: 1895, month:  8, day: 11 } },
  { jdn:  704424 + J0000, date: { year: 1921, month: 12, day: 19 } },
  { jdn:  708842 + J0000, date: { year: 1934, month:  1, day: 19 } },
  { jdn:  709409 + J0000, date: { year: 1935, month:  8, day: 11 } },
  { jdn:  709580 + J0000, date: { year: 1936, month:  1, day: 26 } },
  { jdn:  727274 + J0000, date: { year: 1984, month:  7, day:  8 } },
  { jdn:  728714 + J0000, date: { year: 1988, month:  6, day: 17 } },
  { jdn:  744313 + J0000, date: { year: 2031, month:  3, day:  1 } },
  { jdn:  764652 + J0000, date: { year: 2086, month: 11, day: 11 } },
];

describe ('Ethiopic calendar spec', () => {
  it ('should convert an Ethiopic date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to an Ethiopic date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (actual).toEqual (expected);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1000,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, 15, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000,  7,  0)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, 35)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000, 13,  7)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1001, 13,  6)).toThrow (INVALID_DAY);
   });
});
