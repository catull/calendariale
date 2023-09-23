import { INVALID_DAY, INVALID_WEEK } from '../../Const';
import { IsoWeekCalendar as cal } from '../../calendar/IsoWeekCalendar';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -586, week: 29, day: 7 } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: -168, week: 49, day: 3 } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: 70, week: 39, day: 3 } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: 135, week: 39, day: 7 } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: 470, week: 2, day: 3 } },
  { jdn: 1931579.5, rataDie: 210155, date: { year: 576, week: 21, day: 1 } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: 694, week: 45, day: 6 } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: 1013, week: 16, day: 7 } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: 1096, week: 21, day: 7 } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: 1190, week: 12, day: 5 } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: 1240, week: 10, day: 6 } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: 1288, week: 14, day: 5 } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: 1298, week: 17, day: 7 } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: 1391, week: 23, day: 7 } },
  { jdn: 2245580.5, rataDie: 524156, date: { year: 1436, week: 5, day: 3 } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: 1492, week: 14, day: 6 } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: 1553, week: 38, day: 6 } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: 1560, week: 9, day: 6 } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: 1648, week: 24, day: 3 } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: 1680, week: 26, day: 7 } },
  { jdn: 2348020.5, rataDie: 626596, date: { year: 1716, week: 30, day: 5 } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: 1768, week: 24, day: 7 } },
  { jdn: 2385648.5, rataDie: 664224, date: { year: 1819, week: 31, day: 1 } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 1839, week: 13, day: 3 } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 1903, week: 16, day: 7 } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 1929, week: 34, day: 7 } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 1941, week: 40, day: 1 } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 1943, week: 16, day: 1 } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 1943, week: 40, day: 4 } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 1992, week: 12, day: 2 } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 1996, week: 8, day: 7 } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 2038, week: 45, day: 3 } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 2094, week: 28, day: 7 } },
];

describe('iSO Week calendar spec', () => {
  it('should convert an ISO Week date to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.toJdn(date.year, date.week, date.day);

      expect(actual).toBe(jdn);
    });
  });

  it('should convert a Julian day number (JDN) to an ISO Week date', () => {
    dates.forEach(({ jdn, date }) => {
      const expected = { jdn, ...date };
      const actual = cal.fromJdn(jdn);

      expect(expected).toEqual(actual);
      expect(expected.year).toBe(actual.getYear());
      expect(expected.week).toBe(actual.getWeek());
      expect(expected.day).toBe(actual.getDay());
    });
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1999, 0, 2)).toThrow(INVALID_WEEK);
    expect(() => cal.toJdn(1999, -2, 2)).toThrow(INVALID_WEEK);
    expect(() => cal.toJdn(1999, 54, 1)).toThrow(INVALID_WEEK);
    expect(() => cal.toJdn(1999, 52, 0)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 1, 8)).toThrow(INVALID_DAY);
  });

  it('should reach 100% code coverage', () => {
    const actual = cal.fromJdn(2454832.5);
    const expected = {
      jdn: 2454832.5,
      year: 2009,
      day: 4,
      week: 1,
    };
    expect(expected).toEqual(actual);
    expect(expected.year).toBe(actual.getYear());
    expect(expected.week).toBe(actual.getWeek());
    expect(expected.day).toBe(actual.getDay());
  });
});
