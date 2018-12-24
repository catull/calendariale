import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { IslamicCalendar as cal } from '../../calendar/IslamicCalendar';

const dates = [
  { jdn: 1507231.5, date: { year: -1245, month: 12, day:  9 } },
  { jdn: 1660037.5, date: { year:  -813, month:  2, day: 23 } },
  { jdn: 1746893.5, date: { year:  -568, month:  4, day:  1 } },
  { jdn: 1770641.5, date: { year:  -501, month:  4, day:  6 } },
  { jdn: 1892731.5, date: { year:  -157, month: 10, day: 17 } },
  { jdn: 1931579.5, date: { year:   -47, month:  6, day:  3 } },
  { jdn: 1974851.5, date: { year:    75, month:  7, day: 13 } },
  { jdn: 2091164.5, date: { year:   403, month: 10, day:  5 } },
  { jdn: 2121509.5, date: { year:   489, month:  5, day: 22 } },
  { jdn: 2155779.5, date: { year:   586, month:  2, day:  7 } },
  { jdn: 2174029.5, date: { year:   637, month:  8, day:  7 } },
  { jdn: 2191584.5, date: { year:   687, month:  2, day: 20 } },
  { jdn: 2195261.5, date: { year:   697, month:  7, day:  7 } },
  { jdn: 2229274.5, date: { year:   793, month:  7, day:  1 } },
  { jdn: 2245580.5, date: { year:   839, month:  7, day:  6 } },
  { jdn: 2266100.5, date: { year:   897, month:  6, day:  1 } },
  { jdn: 2288542.5, date: { year:   960, month:  9, day: 30 } },
  { jdn: 2290901.5, date: { year:   967, month:  5, day: 27 } },
  { jdn: 2323140.5, date: { year:  1058, month:  5, day: 18 } },
  { jdn: 2334848.5, date: { year:  1091, month:  6, day:  2 } },
  { jdn: 2348020.5, date: { year:  1128, month:  8, day:  4 } },
  { jdn: 2366978.5, date: { year:  1182, month:  2, day:  3 } },
  { jdn: 2385648.5, date: { year:  1234, month: 10, day: 10 } },
  { jdn: 2392825.5, date: { year:  1255, month:  1, day: 11 } },
  { jdn: 2416223.5, date: { year:  1321, month:  1, day: 21 } },
  { jdn: 2425848.5, date: { year:  1348, month:  3, day: 19 } },
  { jdn: 2430266.5, date: { year:  1360, month:  9, day:  8 } },
  { jdn: 2430833.5, date: { year:  1362, month:  4, day: 13 } },
  { jdn: 2431004.5, date: { year:  1362, month: 10, day:  7 } },
  { jdn: 2448698.5, date: { year:  1412, month:  9, day: 13 } },
  { jdn: 2450138.5, date: { year:  1416, month: 10, day:  5 } },
  { jdn: 2465737.5, date: { year:  1460, month: 10, day: 12 } },
  { jdn: 2486076.5, date: { year:  1518, month:  3, day:  5 } },
];

describe ('Islamic calendar spec', () => {
  it ('should convert a Islamic date to Julian day number (JDN)', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day number (JDN) to a Islamic date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const yearLeap = cal.isLeapYear (date.year);
      const expected = { jdn, ...date, yearLeap };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should determine whether a Islamic year is leap year', () => {
    expect (cal.isLeapYear (  1)).toBe (false);
    expect (cal.isLeapYear (168)).toBe (true);
    expect (cal.isLeapYear (169)).toBe (false);
    expect (cal.isLeapYear (170)).toBe (false);
    expect (cal.isLeapYear (173)).toBe (false);
    expect (cal.isLeapYear (174)).toBe (true);
    expect (cal.isLeapYear (220)).toBe (true);
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (220,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (220, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (220, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (220,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  1, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  2, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  3, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  4, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  5, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  6, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  7, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  8, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  9, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220, 10, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220, 11, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220, 12, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (221, 12, 30)).toThrow (INVALID_DAY);
  });
});
