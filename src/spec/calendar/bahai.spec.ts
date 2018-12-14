import { INVALID_DAY, INVALID_MONTH, INVALID_VAHID, INVALID_YEAR, J0000 } from '../../Const';

import { BahaiCalendar as cal } from '../../calendar/BahaiCalendar';

const data2 = [
  { 'rataDie': -214193, 'bahai': { 'kullIShay': -6, 'vahid':  6, 'year':  3, 'month':  7, 'day': 12 } },
  { 'rataDie':  -61387, 'bahai': { 'kullIShay': -5, 'vahid':  9, 'year':  3, 'month': 14, 'day': 13 } },
  { 'rataDie':   25469, 'bahai': { 'kullIShay': -4, 'vahid':  2, 'year': 13, 'month': 10, 'day': 17 } },
  { 'rataDie':   49217, 'bahai': { 'kullIShay': -4, 'vahid':  6, 'year':  2, 'month': 11, 'day':  6 } },
  { 'rataDie':  171307, 'bahai': { 'kullIShay': -3, 'vahid':  4, 'year': 13, 'month': 16, 'day':  9 } },
  { 'rataDie':  210155, 'bahai': { 'kullIShay': -3, 'vahid': 10, 'year':  6, 'month':  4, 'day':  4 } },
  { 'rataDie':  253427, 'bahai': { 'kullIShay': -3, 'vahid': 16, 'year': 10, 'month': 13, 'day':  7 } },
  { 'rataDie':  369740, 'bahai': { 'kullIShay': -2, 'vahid': 14, 'year':  6, 'month':  2, 'day': 17 } },
  { 'rataDie':  400085, 'bahai': { 'kullIShay': -2, 'vahid': 18, 'year': 13, 'month':  4, 'day':  8 } },
  { 'rataDie':  434355, 'bahai': { 'kullIShay': -1, 'vahid':  4, 'year': 12, 'month':  1, 'day':  3 } },
  { 'rataDie':  452605, 'bahai': { 'kullIShay': -1, 'vahid':  7, 'year':  4, 'month': 19, 'day':  9 } },
  { 'rataDie':  470160, 'bahai': { 'kullIShay': -1, 'vahid':  9, 'year': 15, 'month':  1, 'day': 13 } },
  { 'rataDie':  473837, 'bahai': { 'kullIShay': -1, 'vahid': 10, 'year':  6, 'month':  2, 'day': 19 } },
  { 'rataDie':  507850, 'bahai': { 'kullIShay': -1, 'vahid': 15, 'year':  4, 'month':  5, 'day':  8 } },
  { 'rataDie':  524156, 'bahai': { 'kullIShay': -1, 'vahid': 17, 'year': 10, 'month': 17, 'day': 16 } },
  { 'rataDie':  544676, 'bahai': { 'kullIShay':  0, 'vahid':  1, 'year': 10, 'month':  2, 'day':  1 } },
  { 'rataDie':  567118, 'bahai': { 'kullIShay':  0, 'vahid':  4, 'year': 14, 'month': 10, 'day': 12 } },
  { 'rataDie':  569477, 'bahai': { 'kullIShay':  0, 'vahid':  5, 'year':  1, 'month': 19, 'day':  4 } },
  { 'rataDie':  601716, 'bahai': { 'kullIShay':  0, 'vahid':  9, 'year': 14, 'month':  5, 'day':  6 } },
  { 'rataDie':  613424, 'bahai': { 'kullIShay':  0, 'vahid': 11, 'year':  8, 'month':  6, 'day':  7 } },
  { 'rataDie':  626596, 'bahai': { 'kullIShay':  0, 'vahid': 13, 'year':  6, 'month':  7, 'day': 12 } },
  { 'rataDie':  645554, 'bahai': { 'kullIShay':  0, 'vahid': 16, 'year':  1, 'month':  5, 'day': 15 } },
  { 'rataDie':  664224, 'bahai': { 'kullIShay':  0, 'vahid': 18, 'year': 14, 'month':  8, 'day':  2 } },
  { 'rataDie':  671401, 'bahai': { 'kullIShay':  0, 'vahid': 19, 'year': 15, 'month':  1, 'day':  7 } },
  { 'rataDie':  694799, 'bahai': { 'kullIShay':  1, 'vahid':  4, 'year':  3, 'month':  2, 'day': 11 } },
  { 'rataDie':  704424, 'bahai': { 'kullIShay':  1, 'vahid':  5, 'year': 10, 'month':  9, 'day':  6 } },
  { 'rataDie':  708842, 'bahai': { 'kullIShay':  1, 'vahid':  6, 'year':  3, 'month': 11, 'day':  3 } },
  { 'rataDie':  709409, 'bahai': { 'kullIShay':  1, 'vahid':  6, 'year':  5, 'month':  2, 'day': 11 } },
  { 'rataDie':  709580, 'bahai': { 'kullIShay':  1, 'vahid':  6, 'year':  5, 'month': 11, 'day': 11 } },
  { 'rataDie':  727274, 'bahai': { 'kullIShay':  1, 'vahid':  8, 'year': 15, 'month': 19, 'day': 16 } },
  { 'rataDie':  728714, 'bahai': { 'kullIShay':  1, 'vahid':  8, 'year': 19, 'month': 18, 'day': 19 } },
  { 'rataDie':  744313, 'bahai': { 'kullIShay':  1, 'vahid': 11, 'year':  5, 'month': 13, 'day':  7 } },
  { 'rataDie':  764652, 'bahai': { 'kullIShay':  1, 'vahid': 14, 'year':  4, 'month':  7, 'day':  6 } }
];

describe ('Bahai calendar spec', () => {
  let date;
  let expected;
  let actual;
  let year;
  let julian = 2456435.5;

  it ('should convert a Bahai date to Julian day', () => {
    // expect (cal.bahaiToJdn ( 1,  9, 18,  6,  1)).toBe (julian);
    // expect (cal.bahaiToJdn ( 1, 10,  2,  0,  1)).toBe (2457810.5);

    data2.forEach (dt => {
      expected = dt.rataDie + J0000;
      date = dt.bahai;
      actual = cal.bahaiToJdn (date.kullIShay, date.vahid, date.year, date.month, date.day);
      expect (expected).toBe (actual);

      year = 361 * (date.kullIShay - 1) + 19 * (date.vahid - 1) + date.year;
      actual = cal.toJdn (year, date.month, date.day);
      expect (expected).toEqual (actual);
    });
  });

  it ('should convert a Julian day to a Bahai date', () => {
    // expect (cal.fromJdn (julian)).toBe ([ 1, 9, 18, 6, 1 ]);
    // expect (cal.fromJdn (2457810.5)).toBe ([ 1, 10,  2,  0,  1 ]);

    data2.forEach (dt => {
      julian = dt.rataDie + J0000;
      date = dt.bahai;
      expected = { jdn: julian, kullIShay: date.kullIShay, vahid: date.vahid, year: date.year, month: date.month, day: date.day, yearLeap: cal.isLeapYear(date.year) };
      actual = cal.fromJdn (julian);

      // expect (expected).toBe (actual);
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

  it ('throws validation exceptions', () => {
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
});
