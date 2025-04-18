import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { CopticCalendar as cal } from '../../calendar/CopticCalendar';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -870, month: 12, day: 6 } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: -451, month: 4, day: 12 } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: -213, month: 1, day: 29 } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: -148, month: 2, day: 5 } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: 186, month: 5, day: 12 } },
  { jdn: 1931579.5, rataDie: 210155, date: { year: 292, month: 9, day: 23 } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: 411, month: 3, day: 11 } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: 729, month: 8, day: 24 } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: 812, month: 9, day: 23 } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: 906, month: 7, day: 20 } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: 956, month: 7, day: 7 } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: 1004, month: 7, day: 30 } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: 1014, month: 8, day: 25 } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: 1107, month: 10, day: 10 } },
  { jdn: 2245580.5, rataDie: 524156, date: { year: 1152, month: 5, day: 29 } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: 1208, month: 8, day: 5 } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: 1270, month: 1, day: 12 } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: 1276, month: 6, day: 29 } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: 1364, month: 10, day: 6 } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: 1396, month: 10, day: 26 } },
  { jdn: 2348020.5, rataDie: 626596, date: { year: 1432, month: 11, day: 19 } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: 1484, month: 10, day: 14 } },
  { jdn: 2385648.5, rataDie: 664224, date: { year: 1535, month: 11, day: 27 } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 1555, month: 7, day: 19 } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 1619, month: 8, day: 11 } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 1645, month: 12, day: 19 } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 1658, month: 1, day: 19 } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 1659, month: 8, day: 11 } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 1660, month: 1, day: 26 } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 1708, month: 7, day: 8 } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 1712, month: 6, day: 17 } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 1755, month: 3, day: 1 } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 1810, month: 11, day: 11 } },
];

describe('coptic calendar spec', () => {
  it('should convert a Coptic date to Julian day number (JDN)', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.toJdn(date.year, date.month, date.day);
      expect(jdn).toBe(actual);
    };
  });

  it('should convert a Julian day number (JDN) to a Coptic date', () => {
    for (const { jdn, date } of dates) {
      const yearLeap = cal.isLeapYear(date.year);
      const expected = { jdn, ...date, yearLeap };
      const actual = cal.fromJdn(jdn);

      expect(expected).toEqual(actual);
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.day).toBe(actual.getDay());
    };
  });

  it('should determine whether a Coptic year is leap year', () => {
    for (const year of [3, 7, 23, 1603, 1763, 1843, 1907, 1991, 2007]) {
      expect(cal.isLeapYear(year)).toBeTruthy();
    };

    for (const year of [0, 1, 2, 4, 5, 1598, 1700, 1800, 1900, 1970, 2001]) {
      expect(cal.isLeapYear(year)).toBeFalsy();
    };
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1000, 0, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1000, -2, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1000, 15, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1000, 7, 0)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1000, 7, -5)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1000, 7, 35)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1000, 13, 6)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1003, 13, 7)).toThrow(INVALID_DAY);
  });
});
