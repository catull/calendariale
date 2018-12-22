import { INVALID_DAY, INVALID_MONTH, INVALID_VAHID, INVALID_YEAR, J0000 } from '../../Const';
import { BahaiCalendar as cal } from '../../calendar/BahaiCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { kullIShay: -6, vahid:  6, year:  3, month:  7, day: 12 } },
  { jdn:  -61387 + J0000, date: { kullIShay: -5, vahid:  9, year:  3, month: 14, day: 13 } },
  { jdn:   25469 + J0000, date: { kullIShay: -4, vahid:  2, year: 13, month: 10, day: 17 } },
  { jdn:   49217 + J0000, date: { kullIShay: -4, vahid:  6, year:  2, month: 11, day:  6 } },
  { jdn:  171307 + J0000, date: { kullIShay: -3, vahid:  4, year: 13, month: 16, day:  9 } },
  { jdn:  210155 + J0000, date: { kullIShay: -3, vahid: 10, year:  6, month:  4, day:  4 } },
  { jdn:  253427 + J0000, date: { kullIShay: -3, vahid: 16, year: 10, month: 13, day:  7 } },
  { jdn:  369740 + J0000, date: { kullIShay: -2, vahid: 14, year:  6, month:  2, day: 17 } },
  { jdn:  400085 + J0000, date: { kullIShay: -2, vahid: 18, year: 13, month:  4, day:  8 } },
  { jdn:  434355 + J0000, date: { kullIShay: -1, vahid:  4, year: 12, month:  1, day:  3 } },
  { jdn:  452605 + J0000, date: { kullIShay: -1, vahid:  7, year:  4, month: 19, day:  9 } },
  { jdn:  470160 + J0000, date: { kullIShay: -1, vahid:  9, year: 15, month:  1, day: 13 } },
  { jdn:  473837 + J0000, date: { kullIShay: -1, vahid: 10, year:  6, month:  2, day: 19 } },
  { jdn:  507850 + J0000, date: { kullIShay: -1, vahid: 15, year:  4, month:  5, day:  8 } },
  { jdn:  524156 + J0000, date: { kullIShay: -1, vahid: 17, year: 10, month: 17, day: 16 } },
  { jdn:  544676 + J0000, date: { kullIShay:  0, vahid:  1, year: 10, month:  2, day:  1 } },
  { jdn:  567118 + J0000, date: { kullIShay:  0, vahid:  4, year: 14, month: 10, day: 12 } },
  { jdn:  569477 + J0000, date: { kullIShay:  0, vahid:  5, year:  1, month: 19, day:  4 } },
  { jdn:  601716 + J0000, date: { kullIShay:  0, vahid:  9, year: 14, month:  5, day:  6 } },
  { jdn:  613424 + J0000, date: { kullIShay:  0, vahid: 11, year:  8, month:  6, day:  7 } },
  { jdn:  626596 + J0000, date: { kullIShay:  0, vahid: 13, year:  6, month:  7, day: 12 } },
  { jdn:  645554 + J0000, date: { kullIShay:  0, vahid: 16, year:  1, month:  5, day: 15 } },
  { jdn:  664224 + J0000, date: { kullIShay:  0, vahid: 18, year: 14, month:  8, day:  2 } },
  { jdn:  671401 + J0000, date: { kullIShay:  0, vahid: 19, year: 15, month:  1, day:  7 } },
  { jdn:  694799 + J0000, date: { kullIShay:  1, vahid:  4, year:  3, month:  2, day: 11 } },
  { jdn:  704424 + J0000, date: { kullIShay:  1, vahid:  5, year: 10, month:  9, day:  6 } },
  { jdn:  708842 + J0000, date: { kullIShay:  1, vahid:  6, year:  3, month: 11, day:  3 } },
  { jdn:  709409 + J0000, date: { kullIShay:  1, vahid:  6, year:  5, month:  2, day: 11 } },
  { jdn:  709580 + J0000, date: { kullIShay:  1, vahid:  6, year:  5, month: 11, day: 11 } },
  { jdn:  727274 + J0000, date: { kullIShay:  1, vahid:  8, year: 15, month: 19, day: 16 } },
  { jdn:  728714 + J0000, date: { kullIShay:  1, vahid:  8, year: 19, month: 18, day: 19 } },
  { jdn:  744313 + J0000, date: { kullIShay:  1, vahid: 11, year:  5, month: 13, day:  7 } },
  { jdn:  764652 + J0000, date: { kullIShay:  1, vahid: 14, year:  4, month:  7, day:  6 } },
];

describe ('Bahai calendar spec', () => {
  it ('should convert a Bahai date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.bahaiToJdn (date.kullIShay, date.vahid, date.year, date.month, date.day);
      expect (jdn).toBe (actual);

      const year    = 361 * (date.kullIShay - 1) + 19 * (date.vahid - 1) + date.year;
      const actual2 = cal.toJdn (year, date.month, date.day);
      expect (jdn).toEqual (actual2);
    });
  });

  it ('should convert a Julian day to a Bahai date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const yearLeap = cal.isLeapYear(date.year);
      const expected = { jdn, ...date, yearLeap };

      expect (expected).toEqual (actual);
      expect (expected.kullIShay).toBe (actual.getKullIshay());
      expect (expected.vahid).toBe (actual.getVahid());
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should determine whether a Bahai year is leap year', () => {
    // the Bahai years 1 and 169 are the limits of the old leap rule
    expect (cal.isLeapYear (1)).toBe (true);
    expect (cal.isLeapYear (168)).toBe (false);
    expect (cal.isLeapYear (169)).toBe (true);
    expect (cal.isLeapYear (170)).toBe (false);

    // starting with the Bahai year 172, the new rule is in place
    expect (cal.isLeapYear (173)).toBe (false);
    expect (cal.isLeapYear (174)).toBe (true);
    expect (cal.isLeapYear (220)).toBe (true);
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.bahaiToJdn (1, -9, 10, 10, 10)).toThrow (INVALID_VAHID);
    expect (() => cal.bahaiToJdn (1, 20, 10, 10, 10)).toThrow (INVALID_VAHID);
    expect (() => cal.bahaiToJdn (1,  9,  0, 10, 10)).toThrow (INVALID_YEAR);
    expect (() => cal.bahaiToJdn (1, 10, 21, 10, 10)).toThrow (INVALID_YEAR);
    expect (() => cal.bahaiToJdn (1,  9, 10, -1, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.bahaiToJdn (1, 12, 11, 20, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.bahaiToJdn (1,  9, 10, 10,  0)).toThrow (INVALID_DAY);
    expect (() => cal.bahaiToJdn (1, 16, 11, 12, 22)).toThrow (INVALID_DAY);
    expect (() => cal.bahaiToJdn (1,  9, 10,  0,  0)).toThrow (INVALID_DAY);
    expect (() => cal.bahaiToJdn (1, 16, 11,  0,  6)).toThrow (INVALID_DAY);
    expect (() => cal.bahaiToJdn (1,  9, 16,  0,  6)).toThrow (INVALID_DAY);
    expect (() => cal.bahaiToJdn (1, 16, 11,  0,  5)).toThrow (INVALID_DAY);
   });

   it ('should determine the Bahai year from a Julian day number', () => {
     expect (cal.jdnToYear(2394350.5)).toBe(0);
     expect (cal.jdnToYear(2457810.5)).toBe(173);
     expect (cal.jdnToYear(2465737.5)).toBe(195);
   });
});
