/* global describe it: true */
import { Symmetry454Calendar as cal } from '../../calendar/Symmetry454Calendar';
import { INVALID_DAY, INVALID_MONTH } from '../../Const';

const data1 = [
  { 'julianDay': 1507231.5, 'symmetry454': { 'year': -586, 'month':  7, 'day': 21 } },
  { 'julianDay': 1660037.5, 'symmetry454': { 'year': -168, 'month': 12, 'day':  3 } },
  { 'julianDay': 1746893.5, 'symmetry454': { 'year':   70, 'month':  9, 'day': 24 } },
  { 'julianDay': 1770641.5, 'symmetry454': { 'year':  135, 'month':  9, 'day': 28 } },
  { 'julianDay': 1892731.5, 'symmetry454': { 'year':  470, 'month':  1, 'day': 10 } },
  { 'julianDay': 1931579.5, 'symmetry454': { 'year':  576, 'month':  5, 'day': 22 } },
  { 'julianDay': 1974851.5, 'symmetry454': { 'year':  694, 'month': 11, 'day': 13 } },
  { 'julianDay': 2091164.5, 'symmetry454': { 'year': 1013, 'month':  4, 'day': 21 } },
  { 'julianDay': 2121509.5, 'symmetry454': { 'year': 1096, 'month':  5, 'day': 28 } },
  { 'julianDay': 2155779.5, 'symmetry454': { 'year': 1190, 'month':  3, 'day': 19 } },
  { 'julianDay': 2174029.5, 'symmetry454': { 'year': 1240, 'month':  3, 'day':  6 } },
  { 'julianDay': 2191584.5, 'symmetry454': { 'year': 1288, 'month':  4, 'day':  5 } },
  { 'julianDay': 2195261.5, 'symmetry454': { 'year': 1298, 'month':  4, 'day': 28 } },
  { 'julianDay': 2229274.5, 'symmetry454': { 'year': 1391, 'month':  6, 'day':  7 } },
  { 'julianDay': 2245580.5, 'symmetry454': { 'year': 1436, 'month':  2, 'day':  3 } },
  { 'julianDay': 2266100.5, 'symmetry454': { 'year': 1492, 'month':  4, 'day':  6 } },
  { 'julianDay': 2288542.5, 'symmetry454': { 'year': 1553, 'month':  9, 'day': 20 } },
  { 'julianDay': 2290901.5, 'symmetry454': { 'year': 1560, 'month':  2, 'day': 34 } },
  { 'julianDay': 2323140.5, 'symmetry454': { 'year': 1648, 'month':  6, 'day': 10 } },
  { 'julianDay': 2334848.5, 'symmetry454': { 'year': 1680, 'month':  6, 'day': 28 } },
  { 'julianDay': 2348020.5, 'symmetry454': { 'year': 1716, 'month':  7, 'day': 26 } },
  { 'julianDay': 2366978.5, 'symmetry454': { 'year': 1768, 'month':  6, 'day': 14 } },
  { 'julianDay': 2385648.5, 'symmetry454': { 'year': 1819, 'month':  8, 'day':  1 } },
  { 'julianDay': 2392825.5, 'symmetry454': { 'year': 1839, 'month':  3, 'day': 24 } },
  { 'julianDay': 2416223.5, 'symmetry454': { 'year': 1903, 'month':  4, 'day': 14 } },
  { 'julianDay': 2425848.5, 'symmetry454': { 'year': 1929, 'month':  8, 'day': 28 } },
  { 'julianDay': 2430266.5, 'symmetry454': { 'year': 1941, 'month': 10, 'day':  1 } },
  { 'julianDay': 2430833.5, 'symmetry454': { 'year': 1943, 'month':  4, 'day': 15 } },
  { 'julianDay': 2431004.5, 'symmetry454': { 'year': 1943, 'month': 10, 'day':  4 } },
  { 'julianDay': 2448698.5, 'symmetry454': { 'year': 1992, 'month':  3, 'day': 16 } },
  { 'julianDay': 2450138.5, 'symmetry454': { 'year': 1996, 'month':  2, 'day': 28 } },
  { 'julianDay': 2465737.5, 'symmetry454': { 'year': 2038, 'month': 11, 'day': 10 } },
  { 'julianDay': 2486076.5, 'symmetry454': { 'year': 2094, 'month':  7, 'day': 21 } }
];

describe ('Symmetry454 calendar spec', () => {
  let date;
  let expected;
  let actual;

  it ('should convert a Symmetry454 date to Julian day', () => {
    data1.forEach (dt => {
      date   = dt.symmetry454;
      actual = cal.toJdn (date.year, date.month, date.day);
      expect (dt.julianDay).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Symmetry454 date', () => {
    data1.forEach (dt => {
      date     = dt.symmetry454;
      expected = { 'jdn': dt.julianDay, 'year': date.year, 'month': date.month, 'day': date.day, 'yearLeap': cal.isLeapYear (date.year) };
      actual   = cal.fromJdn (dt.julianDay);

      expect (expected).toEqual (actual);
      // expect (expected.year).toBe (actual.year);
      // expect (expected.month).toBe (actual.month);
      // expect (expected.day).toBe (actual.day);
      // expect (expected.yearLeap).toBe (actual.yearLeap);
    });
  });

  it ('should determine whether a Symmetry454 year is leap year', () => {
    [ 1761, 1812, 1857, 1880, 1919, 1953, 1987, 2004, 2021, 2043, 2060 ].forEach (year => {
      expect (cal.isLeapYear (year)).toBe (true);
    });

    [ 1, 2, 5, 1599, 1700, 1800, 1900, 1969, 2001, 2010, 2020, 2030, 2040 ].forEach (year => {
      expect (cal.isLeapYear (year)).toBe (false);
    });
  });

  it ('throws validation exceptions', () => {
    expect (() => cal.toJdn (1999,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  7, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  2, 36)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (2004, 12, 36)).toThrow (INVALID_DAY);
   });
});
