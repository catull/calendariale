import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';
import { PersianAstronomicalCalendar as cal } from '../../calendar/PersianAstronomicalCalendar';
import { PersianAstronomicalDate } from '../../calendar/PersianAstronomicalDate';

const dates = [
  { rataDie: -214193, date: { year: -1208, month:  5, day:  1 } },
  { rataDie:  -61387, date: { year:  -790, month:  9, day: 14 } },
  { rataDie:   25469, date: { year:  -552, month:  7, day:  2 } },
  { rataDie:   49217, date: { year:  -487, month:  7, day:  9 } },
  { rataDie:  171307, date: { year:  -153, month: 10, day: 19 } },
  { rataDie:  210155, date: { year:   -46, month:  2, day: 31 } },
  { rataDie:  253427, date: { year:    73, month:  8, day: 19 } },
  { rataDie:  369740, date: { year:   392, month:  2, day:  5 } },
  { rataDie:  400085, date: { year:   475, month:  3, day:  4 } },
  { rataDie:  434355, date: { year:   569, month:  1, day:  3 } },
  { rataDie:  452605, date: { year:   618, month: 12, day: 20 } },
  { rataDie:  470160, date: { year:   667, month:  1, day: 14 } },
  { rataDie:  473837, date: { year:   677, month:  2, day:  8 } },
  { rataDie:  507850, date: { year:   770, month:  3, day: 22 } },
  { rataDie:  524156, date: { year:   814, month: 11, day: 13 } },
  { rataDie:  544676, date: { year:   871, month:  1, day: 21 } },
  { rataDie:  567118, date: { year:   932, month:  6, day: 28 } },
  { rataDie:  569477, date: { year:   938, month: 12, day: 14 } },
  { rataDie:  601716, date: { year:  1027, month:  3, day: 21 } },
  { rataDie:  613424, date: { year:  1059, month:  4, day: 10 } },
  { rataDie:  626596, date: { year:  1095, month:  5, day:  2 } },
  { rataDie:  645554, date: { year:  1147, month:  3, day: 30 } },
  { rataDie:  664224, date: { year:  1198, month:  5, day: 10 } },
  { rataDie:  671401, date: { year:  1218, month:  1, day:  7 } },
  { rataDie:  694799, date: { year:  1282, month:  1, day: 29 } },
  { rataDie:  704424, date: { year:  1308, month:  6, day:  3 } },
  { rataDie:  708842, date: { year:  1320, month:  7, day:  7 } },
  { rataDie:  709409, date: { year:  1322, month:  1, day: 29 } },
  { rataDie:  709580, date: { year:  1322, month:  7, day: 14 } },
  { rataDie:  727274, date: { year:  1370, month: 12, day: 27 } },
  { rataDie:  728714, date: { year:  1374, month: 12, day:  6 } },
  { rataDie:  744313, date: { year:  1417, month:  8, day: 19 } },
  { rataDie:  764652, date: { year:  1473, month:  4, day: 28 } },
  { rataDie: 1430002, date: { year:  3294, month: 12, day: 28 } },
];

describe ('Persian Astronomical calendar spec', () => {
  it ('should convert a Persian Astronomical date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Persian Astronomical date', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.fromRd (rataDie) as PersianAstronomicalDate;
      const jdn      = actual.getJdn();
      const yearLeap =  cal.isLeapYear (date.year);
      const expected = { jdn, ...date, yearLeap };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
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

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1333,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1333, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1333, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1333,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1333,  7, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1333, 12, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1334, 12, 30)).toThrow (INVALID_DAY);
   });
});
