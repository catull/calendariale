import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';

import { PersianAstronomicalCalendar as cal } from '../../calendar/PersianAstronomicalCalendar';

const data3 = [
  { 'rataDie': -214193, 'persianAstro': { 'year': -1208, 'month':  5, 'day':  1 } },
  { 'rataDie':  -61387, 'persianAstro': { 'year':  -790, 'month':  9, 'day': 14 } },
  { 'rataDie':   25469, 'persianAstro': { 'year':  -552, 'month':  7, 'day':  2 } },
  { 'rataDie':   49217, 'persianAstro': { 'year':  -487, 'month':  7, 'day':  9 } },
  { 'rataDie':  171307, 'persianAstro': { 'year':  -153, 'month': 10, 'day': 19 } },
  { 'rataDie':  210155, 'persianAstro': { 'year':   -46, 'month':  2, 'day': 31 } },
  { 'rataDie':  253427, 'persianAstro': { 'year':    73, 'month':  8, 'day': 19 } },
  { 'rataDie':  369740, 'persianAstro': { 'year':   392, 'month':  2, 'day':  5 } },
  { 'rataDie':  400085, 'persianAstro': { 'year':   475, 'month':  3, 'day':  4 } },
  { 'rataDie':  434355, 'persianAstro': { 'year':   569, 'month':  1, 'day':  3 } },
  { 'rataDie':  452605, 'persianAstro': { 'year':   618, 'month': 12, 'day': 20 } },
  { 'rataDie':  470160, 'persianAstro': { 'year':   667, 'month':  1, 'day': 14 } },
  { 'rataDie':  473837, 'persianAstro': { 'year':   677, 'month':  2, 'day':  8 } },
  { 'rataDie':  507850, 'persianAstro': { 'year':   770, 'month':  3, 'day': 22 } },
  { 'rataDie':  524156, 'persianAstro': { 'year':   814, 'month': 11, 'day': 13 } },
  { 'rataDie':  544676, 'persianAstro': { 'year':   871, 'month':  1, 'day': 21 } },
  { 'rataDie':  567118, 'persianAstro': { 'year':   932, 'month':  6, 'day': 28 } },
  { 'rataDie':  569477, 'persianAstro': { 'year':   938, 'month': 12, 'day': 14 } },
  { 'rataDie':  601716, 'persianAstro': { 'year':  1027, 'month':  3, 'day': 21 } },
  { 'rataDie':  613424, 'persianAstro': { 'year':  1059, 'month':  4, 'day': 10 } },
  { 'rataDie':  626596, 'persianAstro': { 'year':  1095, 'month':  5, 'day':  2 } },
  { 'rataDie':  645554, 'persianAstro': { 'year':  1147, 'month':  3, 'day': 30 } },
  { 'rataDie':  664224, 'persianAstro': { 'year':  1198, 'month':  5, 'day': 10 } },
  { 'rataDie':  671401, 'persianAstro': { 'year':  1218, 'month':  1, 'day':  7 } },
  { 'rataDie':  694799, 'persianAstro': { 'year':  1282, 'month':  1, 'day': 29 } },
  { 'rataDie':  704424, 'persianAstro': { 'year':  1308, 'month':  6, 'day':  3 } },
  { 'rataDie':  708842, 'persianAstro': { 'year':  1320, 'month':  7, 'day':  7 } },
  { 'rataDie':  709409, 'persianAstro': { 'year':  1322, 'month':  1, 'day': 29 } },
  { 'rataDie':  709580, 'persianAstro': { 'year':  1322, 'month':  7, 'day': 14 } },
  { 'rataDie':  727274, 'persianAstro': { 'year':  1370, 'month': 12, 'day': 27 } },
  { 'rataDie':  728714, 'persianAstro': { 'year':  1374, 'month': 12, 'day':  6 } },
  { 'rataDie':  744313, 'persianAstro': { 'year':  1417, 'month':  8, 'day': 19 } },
  { 'rataDie':  764652, 'persianAstro': { 'year':  1473, 'month':  4, 'day': 28 } }
];

describe ('Persian Astronomical calendar spec', () => {
  let date;
  let expected;
  let actual;
  let julian;

  it ('should convert a Persian Astronomical date to Julian day', () => {
    data3.forEach (dt => {
      julian = dt.rataDie + J0000;
      date   = dt.persianAstro;
      actual = cal.toJdn (date.year, date.month, date.day);
      expect (julian).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Persian Astronomical date', () => {
    data3.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.persianAstro;
      expected = { 'jdn': julian, 'year': date.year, 'month': date.month, 'day': date.day, 'yearLeap': cal.isLeapYear (date.year) };
      actual   = cal.fromJdn (julian);

      expect (expected).toEqual (actual);
      // expect (expected.year).toBe (actual.year);
      // expect (expected.month).toBe (actual.month);
      // expect (expected.day).toBe (actual.day);
    });
  });

  it ('should determine whether a Persian Astronomical year is leap year', () => {
    [ 38, 75, 112, 149, 186, 223, 260, 1111, 1148, 1185, 1222, 1259, 1296, 1333, 1370 ].forEach (year => {
      expect (cal.isLeapYear (year)).toBe (true);
    });

    [ 165, 206, 247, 288, 329, 370, 411, 452, 493, 534, 575, 616, 821, 862, 903, 944, 985, 1026, 1067, 1108, 1149, 1190, 1231, 1272 ].forEach (year => {
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
