/* global describe it: true */

import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { ArmenianCalendarDate as cal } from '../../calendar/ArmenianCalendarDate';

const data1 = [
  { 'julianDay': 1507231.5, 'armenian': { 'year': -1138, 'month':  4, 'day': 10 } },
  { 'julianDay': 1660037.5, 'armenian': { 'year':  -720, 'month': 12, 'day':  6 } },
  { 'julianDay': 1746893.5, 'armenian': { 'year':  -482, 'month': 11, 'day': 22 } },
  { 'julianDay': 1770641.5, 'armenian': { 'year':  -417, 'month': 12, 'day': 15 } },
  { 'julianDay': 1892731.5, 'armenian': { 'year':   -82, 'month':  6, 'day': 10 } },
  { 'julianDay': 1931579.5, 'armenian': { 'year':    24, 'month': 11, 'day': 18 } },
  { 'julianDay': 1974851.5, 'armenian': { 'year':   143, 'month':  6, 'day':  5 } },
  { 'julianDay': 2091164.5, 'armenian': { 'year':   462, 'month':  2, 'day':  3 } },
  { 'julianDay': 2121509.5, 'armenian': { 'year':   545, 'month':  3, 'day': 23 } },
  { 'julianDay': 2155779.5, 'armenian': { 'year':   639, 'month':  2, 'day': 13 } },
  { 'julianDay': 2174029.5, 'armenian': { 'year':   689, 'month':  2, 'day': 13 } },
  { 'julianDay': 2191584.5, 'armenian': { 'year':   737, 'month':  3, 'day': 18 } },
  { 'julianDay': 2195261.5, 'armenian': { 'year':   747, 'month':  4, 'day': 15 } },
  { 'julianDay': 2229274.5, 'armenian': { 'year':   840, 'month':  6, 'day': 23 } },
  { 'julianDay': 2245580.5, 'armenian': { 'year':   885, 'month':  2, 'day': 24 } },
  { 'julianDay': 2266100.5, 'armenian': { 'year':   941, 'month':  5, 'day': 14 } },
  { 'julianDay': 2288542.5, 'armenian': { 'year':  1002, 'month': 11, 'day': 11 } },
  { 'julianDay': 2290901.5, 'armenian': { 'year':  1009, 'month':  4, 'day': 25 } },
  { 'julianDay': 2323140.5, 'armenian': { 'year':  1097, 'month':  8, 'day': 24 } },
  { 'julianDay': 2334848.5, 'armenian': { 'year':  1129, 'month':  9, 'day': 22 } },
  { 'julianDay': 2348020.5, 'armenian': { 'year':  1165, 'month': 10, 'day': 24 } },
  { 'julianDay': 2366978.5, 'armenian': { 'year':  1217, 'month': 10, 'day':  2 } },
  { 'julianDay': 2385648.5, 'armenian': { 'year':  1268, 'month': 11, 'day': 27 } },
  { 'julianDay': 2392825.5, 'armenian': { 'year':  1288, 'month':  7, 'day': 24 } },
  { 'julianDay': 2416223.5, 'armenian': { 'year':  1352, 'month':  9, 'day':  2 } },
  { 'julianDay': 2425848.5, 'armenian': { 'year':  1379, 'month':  1, 'day': 12 } },
  { 'julianDay': 2430266.5, 'armenian': { 'year':  1391, 'month':  2, 'day': 20 } },
  { 'julianDay': 2430833.5, 'armenian': { 'year':  1392, 'month':  9, 'day': 12 } },
  { 'julianDay': 2431004.5, 'armenian': { 'year':  1393, 'month':  2, 'day': 28 } },
  { 'julianDay': 2448698.5, 'armenian': { 'year':  1441, 'month':  8, 'day': 22 } },
  { 'julianDay': 2450138.5, 'armenian': { 'year':  1445, 'month':  8, 'day':  2 } },
  { 'julianDay': 2465737.5, 'armenian': { 'year':  1488, 'month':  4, 'day': 26 } },
  { 'julianDay': 2486076.5, 'armenian': { 'year':  1544, 'month':  1, 'day': 15 } }
];

describe ('Armenian calendar spec', () => {
  let date;
  let expected;
  let actual;

  it ('should convert an Armenian date to Julian day', () => {
    data1.forEach (dt => {
      date = dt.armenian;
      expected = dt.julianDay;
      actual = cal.toJdn (date.year, date.month, date.day);

      expect (expected).toBe (actual);
    });
  });

  it ('should convert a Julian day to an Armenian date', () => {
    data1.forEach (dt => {
      date = dt.armenian;
      expected = { jdn: dt.julianDay, year: date.year, month: date.month, day: date.day };
      actual = cal.fromJdn (dt.julianDay);

      expect (expected).toEqual (actual);
      // expect (expected.year).toBe (actual.year);
      // expect (expected.month).toBe (actual.month);
      // expect (expected.day).toBe (actual.day);
    });
  });

  it ('throws validation exceptions', () => {
    expect (() => cal.toJdn (1000,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, 15, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000,  7,  0)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, 35)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000, 13,  6)).toThrow (INVALID_DAY);
   });
});
