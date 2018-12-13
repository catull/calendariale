/* global describe it: true */
import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';

import { PersianArithmeticCalendarDate as cal } from '../../calendar/PersianArithmeticCalendarDate';

const data3 = [
  { 'rataDie': -214193, 'persianArith': { 'year': -1208, 'month':  5, 'day':  1 } },
  { 'rataDie':  -61387, 'persianArith': { 'year':  -790, 'month':  9, 'day': 14 } },
  { 'rataDie':   25469, 'persianArith': { 'year':  -552, 'month':  7, 'day':  2 } },
  { 'rataDie':   49217, 'persianArith': { 'year':  -487, 'month':  7, 'day':  9 } },
  { 'rataDie':  171307, 'persianArith': { 'year':  -153, 'month': 10, 'day': 18 } },
  { 'rataDie':  210155, 'persianArith': { 'year':   -46, 'month':  2, 'day': 30 } },
  { 'rataDie':  253427, 'persianArith': { 'year':    73, 'month':  8, 'day': 19 } },
  { 'rataDie':  369740, 'persianArith': { 'year':   392, 'month':  2, 'day':  5 } },
  { 'rataDie':  400085, 'persianArith': { 'year':   475, 'month':  3, 'day':  3 } },
  { 'rataDie':  434355, 'persianArith': { 'year':   569, 'month':  1, 'day':  3 } },
  { 'rataDie':  452605, 'persianArith': { 'year':   618, 'month': 12, 'day': 20 } },
  { 'rataDie':  470160, 'persianArith': { 'year':   667, 'month':  1, 'day': 14 } },
  { 'rataDie':  473837, 'persianArith': { 'year':   677, 'month':  2, 'day':  8 } },
  { 'rataDie':  507850, 'persianArith': { 'year':   770, 'month':  3, 'day': 22 } },
  { 'rataDie':  524156, 'persianArith': { 'year':   814, 'month': 11, 'day': 13 } },
  { 'rataDie':  544676, 'persianArith': { 'year':   871, 'month':  1, 'day': 21 } },
  { 'rataDie':  567118, 'persianArith': { 'year':   932, 'month':  6, 'day': 28 } },
  { 'rataDie':  569477, 'persianArith': { 'year':   938, 'month': 12, 'day': 14 } },
  { 'rataDie':  601716, 'persianArith': { 'year':  1027, 'month':  3, 'day': 21 } },
  { 'rataDie':  613424, 'persianArith': { 'year':  1059, 'month':  4, 'day': 10 } },
  { 'rataDie':  626596, 'persianArith': { 'year':  1095, 'month':  5, 'day':  2 } },
  { 'rataDie':  645554, 'persianArith': { 'year':  1147, 'month':  3, 'day': 30 } },
  { 'rataDie':  664224, 'persianArith': { 'year':  1198, 'month':  5, 'day': 10 } },
  { 'rataDie':  671401, 'persianArith': { 'year':  1218, 'month':  1, 'day':  7 } },
  { 'rataDie':  694799, 'persianArith': { 'year':  1282, 'month':  1, 'day': 29 } },
  { 'rataDie':  704424, 'persianArith': { 'year':  1308, 'month':  6, 'day':  3 } },
  { 'rataDie':  708842, 'persianArith': { 'year':  1320, 'month':  7, 'day':  7 } },
  { 'rataDie':  709409, 'persianArith': { 'year':  1322, 'month':  1, 'day': 29 } },
  { 'rataDie':  709580, 'persianArith': { 'year':  1322, 'month':  7, 'day': 14 } },
  { 'rataDie':  727274, 'persianArith': { 'year':  1370, 'month': 12, 'day': 27 } },
  { 'rataDie':  728714, 'persianArith': { 'year':  1374, 'month': 12, 'day':  6 } },
  { 'rataDie':  744313, 'persianArith': { 'year':  1417, 'month':  8, 'day': 19 } },
  { 'rataDie':  764652, 'persianArith': { 'year':  1473, 'month':  4, 'day': 28 } }
];

describe ('Persian Arithmetic calendar spec', () => {
  let date;
  let expected;
  let actual;
  let julian;

  it ('should convert a Persian Arithmetic date to Julian day', () => {
    data3.forEach (dt => {
      julian = dt.rataDie + J0000;
      date   = dt.persianArith;
      actual = cal.toJdn (date.year, date.month, date.day);
      expect (julian).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Persian Arithmetic year', () => {
    data3.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.persianArith;
      expected = date.year;
      actual   = cal.jdnToYear (julian);
      expect (expected).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Persian Arithmetic date', () => {
    data3.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.persianArith;
      expected = { 'jdn': julian, 'year': date.year, 'month': date.month, 'day': date.day, 'yearLeap': cal.isLeapYear (date.year) };
      actual   = cal.fromJdn (julian);

      expect (expected).toEqual (actual);
      // expect (expected.year).toBe (actual.year);
      // expect (expected.month).toBe (actual.month);
      // expect (expected.day).toBe (actual.day);
    });
  });

  it ('should determine whether a Persian Arithmetic year is leap year', () => {
    [ 4, 124, 165, 206, 739, 780, 821, 1313, 1354, 1395 ].forEach (year => {
      expect (cal.isLeapYear (year)).toBe (true);
    });

    [ 1, 48, 142, 189, 236, 283, 377, 424, 471, 518, 612, 659, 753, 800, 847,
        894, 988, 1035, 1082, 1129, 1223, 1270, 1364 ].forEach (year => {
          expect (cal.isLeapYear (year)).toBe (false);
    });
  });

  it ('throws validation exceptions', () => {
    expect (() => cal.toJdn (1333,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1333, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1333, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1333,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1333,  7, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1333, 12, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1334, 12, 30)).toThrow (INVALID_DAY);
   });
});
