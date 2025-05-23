import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { PersianArithmeticCalendar as cal } from '../../calendar/PersianArithmeticCalendar';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -1208, month: 5, day: 1 } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: -790, month: 9, day: 14 } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: -552, month: 7, day: 2 } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: -487, month: 7, day: 9 } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: -153, month: 10, day: 18 } },
  { jdn: 1931579.5, rataDie: 210155, date: { year: -46, month: 2, day: 30 } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: 73, month: 8, day: 19 } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: 392, month: 2, day: 5 } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: 475, month: 3, day: 3 } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: 569, month: 1, day: 3 } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: 618, month: 12, day: 20 } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: 667, month: 1, day: 14 } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: 677, month: 2, day: 8 } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: 770, month: 3, day: 22 } },
  { jdn: 2245580.5, rataDie: 524156, date: { year: 814, month: 11, day: 13 } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: 871, month: 1, day: 21 } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: 932, month: 6, day: 28 } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: 938, month: 12, day: 14 } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: 1027, month: 3, day: 21 } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: 1059, month: 4, day: 10 } },
  { jdn: 2348020.5, rataDie: 626596, date: { year: 1095, month: 5, day: 2 } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: 1147, month: 3, day: 30 } },
  { jdn: 2385648.5, rataDie: 664224, date: { year: 1198, month: 5, day: 10 } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 1218, month: 1, day: 7 } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 1282, month: 1, day: 29 } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 1308, month: 6, day: 3 } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 1320, month: 7, day: 7 } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 1322, month: 1, day: 29 } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 1322, month: 7, day: 14 } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 1370, month: 12, day: 27 } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 1374, month: 12, day: 6 } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 1417, month: 8, day: 19 } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 1473, month: 4, day: 28 } },
];

describe('persian Arithmetic calendar spec', () => {
  it('should convert a Persian Arithmetic date to Julian day number (JDN)', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.toJdn(date.year, date.month, date.day);

      expect(actual).toBe(jdn);
    };
  });

  it('should convert a Julian day number (JDN) to a Persian Arithmetic year', () => {
    for (const { jdn, date } of dates) {
      const expected = date.year;
      const actual = cal.jdnToYear(jdn);

      expect(actual).toBe(expected);
    };
  });

  it('should convert a Julian day number (JDN) to a Persian Arithmetic date', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.fromJdn(jdn);
      const yearLeap = cal.isLeapYear(date.year);
      const expected = { jdn, ...date, yearLeap };

      expect(expected).toEqual(actual);
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.day).toBe(actual.getDay());
      expect(expected.yearLeap).toBe(actual.isYearLeap());
    };
  });

  it('should determine that a Persian Arithmetic year is a leap year', () => {
    for (const year of [4, 124, 165, 206, 739, 780, 821, 1313, 1354, 1395]) {
      expect(cal.isLeapYear(year)).toBeTruthy();
    };
  });

  it('should determine that a Persian Arithmetic year is not a leap year', () => {
    for (const year of [
      1, 48, 142, 189, 236, 283, 377, 424, 471, 518, 612, 659, 753, 800, 847, 894, 988, 1035, 1082, 1129, 1223, 1270,
      1364,
    ]) {
      expect(cal.isLeapYear(year)).toBeFalsy();
    };
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1333, 0, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1333, -2, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1333, 13, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1333, 7, -5)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1333, 7, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1333, 12, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1334, 12, 30)).toThrow(INVALID_DAY);
  });

  it('should correctly handle the last Persian Arithmetic date in the cycle', () => {
    const jdn = 1029982 + cal.toJdn(475, 1, 1);
    const actual = cal.fromJdn(jdn);
    const expected = {
      jdn: 3151427.5,
      year: 3294,
      month: 12,
      day: 30,
      yearLeap: true,
    };
    expect(expected).toEqual(actual);
    expect(expected.year).toBe(actual.getYear());
    expect(expected.month).toBe(actual.getMonth());
    expect(expected.day).toBe(actual.getDay());
    expect(expected.yearLeap).toBe(actual.isYearLeap());
  });
});
