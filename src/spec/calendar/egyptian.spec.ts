/* global describe it: true */
import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { EgyptianCalendarDate as cal } from '../../calendar/EgyptianCalendarDate';

const data1 = [
  { 'julianDay': 1507231.5, 'egyptian': { 'year':  161, 'month':  7, 'day': 15 } },
  { 'julianDay': 1660037.5, 'egyptian': { 'year':  580, 'month':  3, 'day':  6 } },
  { 'julianDay': 1746893.5, 'egyptian': { 'year':  818, 'month':  2, 'day': 22 } },
  { 'julianDay': 1770641.5, 'egyptian': { 'year':  883, 'month':  3, 'day': 15 } },
  { 'julianDay': 1892731.5, 'egyptian': { 'year': 1217, 'month':  9, 'day': 15 } },
  { 'julianDay': 1931579.5, 'egyptian': { 'year': 1324, 'month':  2, 'day': 18 } },
  { 'julianDay': 1974851.5, 'egyptian': { 'year': 1442, 'month':  9, 'day': 10 } },
  { 'julianDay': 2091164.5, 'egyptian': { 'year': 1761, 'month':  5, 'day':  8 } },
  { 'julianDay': 2121509.5, 'egyptian': { 'year': 1844, 'month':  6, 'day': 28 } },
  { 'julianDay': 2155779.5, 'egyptian': { 'year': 1938, 'month':  5, 'day': 18 } },
  { 'julianDay': 2174029.5, 'egyptian': { 'year': 1988, 'month':  5, 'day': 18 } },
  { 'julianDay': 2191584.5, 'egyptian': { 'year': 2036, 'month':  6, 'day': 23 } },
  { 'julianDay': 2195261.5, 'egyptian': { 'year': 2046, 'month':  7, 'day': 20 } },
  { 'julianDay': 2229274.5, 'egyptian': { 'year': 2139, 'month':  9, 'day': 28 } },
  { 'julianDay': 2245580.5, 'egyptian': { 'year': 2184, 'month':  5, 'day': 29 } },
  { 'julianDay': 2266100.5, 'egyptian': { 'year': 2240, 'month':  8, 'day': 19 } },
  { 'julianDay': 2288542.5, 'egyptian': { 'year': 2302, 'month':  2, 'day': 11 } },
  { 'julianDay': 2290901.5, 'egyptian': { 'year': 2308, 'month':  7, 'day': 30 } },
  { 'julianDay': 2323140.5, 'egyptian': { 'year': 2396, 'month': 11, 'day': 29 } },
  { 'julianDay': 2334848.5, 'egyptian': { 'year': 2428, 'month': 12, 'day': 27 } },
  { 'julianDay': 2348020.5, 'egyptian': { 'year': 2465, 'month':  1, 'day': 24 } },
  { 'julianDay': 2366978.5, 'egyptian': { 'year': 2517, 'month':  1, 'day':  2 } },
  { 'julianDay': 2385648.5, 'egyptian': { 'year': 2568, 'month':  2, 'day': 27 } },
  { 'julianDay': 2392825.5, 'egyptian': { 'year': 2587, 'month': 10, 'day': 29 } },
  { 'julianDay': 2416223.5, 'egyptian': { 'year': 2651, 'month': 12, 'day':  7 } },
  { 'julianDay': 2425848.5, 'egyptian': { 'year': 2678, 'month':  4, 'day': 17 } },
  { 'julianDay': 2430266.5, 'egyptian': { 'year': 2690, 'month':  5, 'day': 25 } },
  { 'julianDay': 2430833.5, 'egyptian': { 'year': 2691, 'month': 12, 'day': 17 } },
  { 'julianDay': 2431004.5, 'egyptian': { 'year': 2692, 'month':  6, 'day':  3 } },
  { 'julianDay': 2448698.5, 'egyptian': { 'year': 2740, 'month': 11, 'day': 27 } },
  { 'julianDay': 2450138.5, 'egyptian': { 'year': 2744, 'month': 11, 'day':  7 } },
  { 'julianDay': 2465737.5, 'egyptian': { 'year': 2787, 'month':  8, 'day':  1 } },
  { 'julianDay': 2486076.5, 'egyptian': { 'year': 2843, 'month':  4, 'day': 20 } }
];

describe ('Egyptian calendar spec', () => {
  let date;
  let expected;
  let actual;

  it ('should convert an Egyptian date to Julian day', () => {
    data1.forEach (dt => {
      date = dt.egyptian;
      expected = dt.julianDay;
      actual = cal.toJdn (date.year, date.month, date.day);

      expect (expected).toBe (actual);
    });
  });

  it ('should convert a Julian day to an Egyptian date', () => {
    data1.forEach (dt => {
      date = dt.egyptian;
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
