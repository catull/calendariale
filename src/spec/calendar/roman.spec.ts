/* global describe it: true */
import { INVALID_COUNT, INVALID_LEAP_DAY, INVALID_MONTH, RomanEvent } from '../../Const';
import { RomanCalendarDate as cal } from '../../calendar/RomanCalendarDate';

const data1 = [
  { 'julianDay': 1507231.5, 'roman': { 'year': -587, 'month':  8, 'event':  RomanEvent.KALENDS, 'count':  3, 'leap': false } },
  { 'julianDay': 1660037.5, 'roman': { 'year': -169, 'month': 12, 'event':  RomanEvent.IDES,    'count':  6, 'leap': false } },
  { 'julianDay': 1746893.5, 'roman': { 'year':   70, 'month': 10, 'event':  RomanEvent.KALENDS, 'count':  6, 'leap': false } },
  { 'julianDay': 1770641.5, 'roman': { 'year':  135, 'month': 10, 'event':  RomanEvent.NONES,   'count':  5, 'leap': false } },
  { 'julianDay': 1892731.5, 'roman': { 'year':  470, 'month':  1, 'event':  RomanEvent.IDES,    'count':  7, 'leap': false } },
  { 'julianDay': 1931579.5, 'roman': { 'year':  576, 'month':  6, 'event':  RomanEvent.KALENDS, 'count': 15, 'leap': false } },
  { 'julianDay': 1974851.5, 'roman': { 'year':  694, 'month': 11, 'event':  RomanEvent.IDES,    'count':  7, 'leap': false } },
  { 'julianDay': 2091164.5, 'roman': { 'year': 1013, 'month':  5, 'event':  RomanEvent.KALENDS, 'count': 13, 'leap': false } },
  { 'julianDay': 2121509.5, 'roman': { 'year': 1096, 'month':  6, 'event':  RomanEvent.KALENDS, 'count': 15, 'leap': false } },
  { 'julianDay': 2155779.5, 'roman': { 'year': 1190, 'month':  4, 'event':  RomanEvent.KALENDS, 'count': 17, 'leap': false } },
  { 'julianDay': 2174029.5, 'roman': { 'year': 1240, 'month':  3, 'event':  RomanEvent.NONES,   'count':  5, 'leap': false } },
  { 'julianDay': 2191584.5, 'roman': { 'year': 1288, 'month':  4, 'event':  RomanEvent.KALENDS, 'count':  7, 'leap': false } },
  { 'julianDay': 2195261.5, 'roman': { 'year': 1298, 'month':  5, 'event':  RomanEvent.KALENDS, 'count': 12, 'leap': false } },
  { 'julianDay': 2229274.5, 'roman': { 'year': 1391, 'month':  6, 'event':  RomanEvent.NONES,   'count':  2, 'leap': false } },
  { 'julianDay': 2245580.5, 'roman': { 'year': 1436, 'month':  2, 'event':  RomanEvent.KALENDS, 'count':  8, 'leap': false } },
  { 'julianDay': 2266100.5, 'roman': { 'year': 1492, 'month':  4, 'event':  RomanEvent.KALENDS, 'count':  2, 'leap': false } },
  { 'julianDay': 2288542.5, 'roman': { 'year': 1553, 'month':  9, 'event':  RomanEvent.IDES,    'count':  5, 'leap': false } },
  { 'julianDay': 2290901.5, 'roman': { 'year': 1560, 'month':  3, 'event':  RomanEvent.KALENDS, 'count':  6, 'leap': false } },
  { 'julianDay': 2323140.5, 'roman': { 'year': 1648, 'month':  6, 'event':  RomanEvent.KALENDS, 'count':  2, 'leap': false } },
  { 'julianDay': 2334848.5, 'roman': { 'year': 1680, 'month':  7, 'event':  RomanEvent.KALENDS, 'count': 12, 'leap': false } },
  { 'julianDay': 2348020.5, 'roman': { 'year': 1716, 'month':  7, 'event':  RomanEvent.IDES,    'count':  3, 'leap': false } },
  { 'julianDay': 2366978.5, 'roman': { 'year': 1768, 'month':  6, 'event':  RomanEvent.IDES,    'count':  6, 'leap': false } },
  { 'julianDay': 2385648.5, 'roman': { 'year': 1819, 'month':  8, 'event':  RomanEvent.KALENDS, 'count': 12, 'leap': false } },
  { 'julianDay': 2392825.5, 'roman': { 'year': 1839, 'month':  3, 'event':  RomanEvent.IDES,    'count':  1, 'leap': false } },
  { 'julianDay': 2416223.5, 'roman': { 'year': 1903, 'month':  4, 'event':  RomanEvent.IDES,    'count':  8, 'leap': false } },
  { 'julianDay': 2425848.5, 'roman': { 'year': 1929, 'month':  8, 'event':  RomanEvent.IDES,    'count':  2, 'leap': false } },
  { 'julianDay': 2430266.5, 'roman': { 'year': 1941, 'month': 10, 'event':  RomanEvent.KALENDS, 'count': 16, 'leap': false } },
  { 'julianDay': 2430833.5, 'roman': { 'year': 1943, 'month':  4, 'event':  RomanEvent.IDES,    'count':  8, 'leap': false } },
  { 'julianDay': 2431004.5, 'roman': { 'year': 1943, 'month': 10, 'event':  RomanEvent.KALENDS, 'count':  8, 'leap': false } },
  { 'julianDay': 2448698.5, 'roman': { 'year': 1992, 'month':  3, 'event':  RomanEvent.NONES,   'count':  4, 'leap': false } },
  { 'julianDay': 2450138.5, 'roman': { 'year': 1996, 'month':  2, 'event':  RomanEvent.IDES,    'count':  2, 'leap': false } },
  { 'julianDay': 2465737.5, 'roman': { 'year': 2038, 'month': 11, 'event':  RomanEvent.KALENDS, 'count':  5, 'leap': false } },
  { 'julianDay': 2486076.5, 'roman': { 'year': 2094, 'month':  7, 'event':  RomanEvent.NONES,   'count':  3, 'leap': false } }
];


describe ('Roman calendar spec', () => {
  let date;
  let expected;
  let actual;

  it ('should convert a Roman date to Julian day', () => {
    data1.forEach (dt => {
      date   = dt.roman;
      actual = cal.toJdn (date.year, date.month, date.event, date.count, date.leap);

      expect (dt.julianDay).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Roman date', () => {
    data1.forEach (dt => {
      date     = dt.roman;
      expected = { 'jdn': dt.julianDay, 'day': -1, 'year': date.year, 'month': date.month, 'event': date.event, 'count': date.count, 'leap': date.leap };
      actual   = cal.fromJdn (dt.julianDay);

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.event).toBe (actual.getEvent());
      expect (expected.count).toBe (actual.getCount());
      expect (expected.leap).toBe (actual.isLeap());
    });
  });

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (1,  0, RomanEvent.KALENDS,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,  0, RomanEvent.NONES,    1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,  0, RomanEvent.IDES,     1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1, 13, RomanEvent.KALENDS,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1, 13, RomanEvent.NONES,    1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1, 13, RomanEvent.IDES,     1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,  3, RomanEvent.KALENDS,  0, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  3, RomanEvent.KALENDS, 19, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  3, RomanEvent.NONES,    0, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  3, RomanEvent.NONES,    7, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  3, RomanEvent.IDES,     0, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  3, RomanEvent.IDES,     9, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  3, RomanEvent.KALENDS,  6, true )).toThrow (INVALID_LEAP_DAY);
    expect (() => cal.toJdn (1,  3, RomanEvent.NONES,    6, true )).toThrow (INVALID_LEAP_DAY);
    expect (() => cal.toJdn (1,  3, RomanEvent.IDES,     6, true )).toThrow (INVALID_LEAP_DAY);
    expect (() => cal.toJdn (4,  3, RomanEvent.KALENDS,  6, true )).not.toThrow ();
    expect (() => cal.toJdn (4,  3, RomanEvent.NONES,    6, true )).toThrow (INVALID_LEAP_DAY);
    expect (() => cal.toJdn (4,  3, RomanEvent.IDES,     6, true )).toThrow (INVALID_LEAP_DAY);
  });
});
