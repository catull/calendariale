import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';
import { FrenchArithmeticCalendar as cal } from '../../calendar/FrenchArithmeticCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { year: -2378, month: 11, day:  4 } },
  { jdn:  -61387 + J0000, date: { year: -1959, month:  3, day: 13 } },
  { jdn:   25469 + J0000, date: { year: -1721, month:  1, day:  2 } },
  { jdn:   49217 + J0000, date: { year: -1656, month:  1, day: 10 } },
  { jdn:  171307 + J0000, date: { year: -1322, month:  4, day: 18 } },
  { jdn:  210155 + J0000, date: { year: -1216, month:  9, day:  1 } },
  { jdn:  253427 + J0000, date: { year: -1097, month:  2, day: 19 } },
  { jdn:  369740 + J0000, date: { year:  -779, month:  8, day:  4 } },
  { jdn:  400085 + J0000, date: { year:  -696, month:  9, day:  5 } },
  { jdn:  434355 + J0000, date: { year:  -602, month:  7, day:  1 } },
  { jdn:  452605 + J0000, date: { year:  -552, month:  6, day: 20 } },
  { jdn:  470160 + J0000, date: { year:  -504, month:  7, day: 13 } },
  { jdn:  473837 + J0000, date: { year:  -494, month:  8, day:  8 } },
  { jdn:  507850 + J0000, date: { year:  -401, month:  9, day: 23 } },
  { jdn:  524156 + J0000, date: { year:  -356, month:  5, day: 13 } },
  { jdn:  544676 + J0000, date: { year:  -300, month:  7, day: 19 } },
  { jdn:  567118 + J0000, date: { year:  -239, month:  0, day:  1 } },
  { jdn:  569477 + J0000, date: { year:  -232, month:  6, day: 14 } },
  { jdn:  601716 + J0000, date: { year:  -144, month:  9, day: 22 } },
  { jdn:  613424 + J0000, date: { year:  -112, month: 10, day: 12 } },
  { jdn:  626596 + J0000, date: { year:   -76, month: 11, day:  6 } },
  { jdn:  645554 + J0000, date: { year:   -24, month: 10, day:  1 } },
  { jdn:  664224 + J0000, date: { year:    27, month: 11, day: 14 } },
  { jdn:  671401 + J0000, date: { year:    47, month:  7, day:  6 } },
  { jdn:  694799 + J0000, date: { year:   111, month:  7, day: 29 } },
  { jdn:  704424 + J0000, date: { year:   137, month: 12, day:  7 } },
  { jdn:  708842 + J0000, date: { year:   150, month:  1, day:  7 } },
  { jdn:  709409 + J0000, date: { year:   151, month:  7, day: 29 } },
  { jdn:  709580 + J0000, date: { year:   152, month:  1, day: 15 } },
  { jdn:  727274 + J0000, date: { year:   200, month:  6, day: 27 } },
  { jdn:  728714 + J0000, date: { year:   204, month:  6, day:  7 } },
  { jdn:  744313 + J0000, date: { year:   247, month:  2, day: 20 } },
  { jdn:  764652 + J0000, date: { year:   302, month: 11, day:  1 } },
];

describe ('French Arithmetic calendar spec', () => {
  it ('should convert a French Arithmetic date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a French Arithmetic date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const yearLeap = cal.isLeapYear(date.year);
      const expected = { jdn, ...date, yearLeap };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should determine whether a French Arithmetic year is leap year', () => {
    [ 4, 20, 1600, 1760, 1840, 1904, 1980, 2000 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).toBe (true);
    });

    [ 0, 1, 2, 3, 5, 1000, 1599, 1700, 1800, 1900, 1970, 2001, 3000, 4000 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).toBe (false);
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1000, -1, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000,  7,  0)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, 35)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  0,  6)).toThrow (INVALID_DAY);
   });
});
