import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { FrenchArithmeticCalendar as cal } from '../../calendar/FrenchArithmeticCalendar';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -2378, month: 11, day: 4 } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: -1959, month: 3, day: 13 } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: -1721, month: 1, day: 2 } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: -1656, month: 1, day: 10 } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: -1322, month: 4, day: 18 } },
  { jdn: 1931579.5, rataDie: 210155, date: { year: -1216, month: 9, day: 1 } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: -1097, month: 2, day: 19 } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: -779, month: 8, day: 4 } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: -696, month: 9, day: 5 } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: -602, month: 7, day: 1 } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: -552, month: 6, day: 20 } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: -504, month: 7, day: 13 } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: -494, month: 8, day: 8 } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: -401, month: 9, day: 23 } },
  { jdn: 2245580.5, rataDie: 524156, date: { year: -356, month: 5, day: 13 } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: -300, month: 7, day: 19 } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: -239, month: 0, day: 1 } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: -232, month: 6, day: 14 } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: -144, month: 9, day: 22 } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: -112, month: 10, day: 12 } },
  { jdn: 2348020.5, rataDie: 626596, date: { year: -76, month: 11, day: 6 } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: -24, month: 10, day: 1 } },
  { jdn: 2385648.5, rataDie: 664224, date: { year: 27, month: 11, day: 14 } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 47, month: 7, day: 6 } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 111, month: 7, day: 29 } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 137, month: 12, day: 7 } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 150, month: 1, day: 7 } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 151, month: 7, day: 29 } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 152, month: 1, day: 15 } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 200, month: 6, day: 27 } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 204, month: 6, day: 7 } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 247, month: 2, day: 20 } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 302, month: 11, day: 1 } },
];

describe('french Arithmetic calendar spec', () => {
  it('should convert a French Arithmetic date to Julian day number (JDN)', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.toJdn(date.year, date.month, date.day);

      expect(actual).toBe(jdn);
    };
  });

  it('should convert a Julian day number (JDN) to a French Arithmetic date', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.fromJdn(jdn);
      const yearLeap = cal.isLeapYear(date.year);
      const expected = { jdn, ...date, yearLeap };

      expect(expected).toEqual(actual);
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.day).toBe(actual.getDay());
    };
  });

  it('should determine whether a French Arithmetic year is leap year', () => {
    for (const year of [4, 20, 1600, 1760, 1840, 1904, 1980, 2000]) {
      expect(cal.isLeapYear(year)).toBeTruthy();
    };

    for (const year of [0, 1, 2, 3, 5, 1000, 1599, 1700, 1800, 1900, 1970, 2001, 3000, 4000]) {
      expect(cal.isLeapYear(year)).toBeFalsy();
    };
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1000, -1, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1000, 13, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1000, 7, 0)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1000, 7, -5)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1000, 7, 35)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1000, 0, 6)).toThrow(INVALID_DAY);
  });

  it('should handle intercalary day - "les jours complémentaires"', () => {
    const actual = cal.fromJdn(2441216.5);
    const expected = {
      jdn: 2441216.5,
      year: 179,
      month: 0,
      day: 5,
      yearLeap: false,
    };
    expect(expected).toEqual(actual);
    expect(expected.year).toBe(actual.getYear());
    expect(expected.month).toBe(actual.getMonth());
    expect(expected.day).toBe(actual.getDay());
  });
});
