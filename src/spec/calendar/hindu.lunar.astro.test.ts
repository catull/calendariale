import { INVALID_DAY, INVALID_LEAP_DAY, INVALID_LEAP_MONTH, INVALID_MONTH } from '../../Const';
import { HinduLunarAstroCalendar as cal } from '../../calendar/HinduLunarAstroCalendar';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -529, month: 6, monthLeap: true, day: 11, dayLeap: false } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: -111, month: 9, monthLeap: false, day: 27, dayLeap: false } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: 127, month: 8, monthLeap: false, day: 3, dayLeap: true } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: 192, month: 8, monthLeap: false, day: 9, dayLeap: false } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: 526, month: 10, monthLeap: false, day: 20, dayLeap: false } },
  { jdn: 1931579.5, rataDie: 210155, date: { year: 633, month: 3, monthLeap: false, day: 5, dayLeap: false } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: 751, month: 8, monthLeap: false, day: 15, dayLeap: false } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: 1070, month: 2, monthLeap: false, day: 6, dayLeap: false } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: 1153, month: 2, monthLeap: false, day: 23, dayLeap: false } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: 1247, month: 1, monthLeap: false, day: 8, dayLeap: false } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: 1296, month: 12, monthLeap: false, day: 8, dayLeap: false } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: 1345, month: 1, monthLeap: false, day: 23, dayLeap: false } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: 1355, month: 2, monthLeap: false, day: 8, dayLeap: false } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: 1448, month: 4, monthLeap: false, day: 1, dayLeap: false } },
  { jdn: 2245580.5, rataDie: 524156, date: { year: 1492, month: 11, monthLeap: false, day: 7, dayLeap: false } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: 1549, month: 2, monthLeap: true, day: 4, dayLeap: false } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: 1610, month: 7, monthLeap: false, day: 2, dayLeap: false } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: 1616, month: 11, monthLeap: false, day: 29, dayLeap: false } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: 1705, month: 3, monthLeap: false, day: 20, dayLeap: false } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: 1737, month: 4, monthLeap: false, day: 5, dayLeap: false } },
  { jdn: 2348020.5, rataDie: 626596, date: { year: 1773, month: 5, monthLeap: false, day: 6, dayLeap: false } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: 1825, month: 4, monthLeap: false, day: 5, dayLeap: false } },
  { jdn: 2385648.5, rataDie: 664224, date: { year: 1876, month: 5, monthLeap: false, day: 11, dayLeap: false } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 1896, month: 1, monthLeap: false, day: 13, dayLeap: false } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 1960, month: 1, monthLeap: false, day: 22, dayLeap: false } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 1986, month: 5, monthLeap: false, day: 20, dayLeap: false } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 1998, month: 7, monthLeap: false, day: 9, dayLeap: false } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 2000, month: 1, monthLeap: false, day: 14, dayLeap: false } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 2000, month: 7, monthLeap: false, day: 8, dayLeap: false } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 2048, month: 12, monthLeap: false, day: 14, dayLeap: false } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 2052, month: 12, monthLeap: false, day: 7, dayLeap: false } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 2095, month: 8, monthLeap: false, day: 14, dayLeap: false } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 2151, month: 4, monthLeap: false, day: 6, dayLeap: false } },
];

describe('hindu Lunar Astro calendar spec', () => {
  it('should convert a Hindu Lunar Astro date to Julian day number (JDN)', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.toJdn(date.year, date.month, date.monthLeap, date.day, date.dayLeap);

      expect(actual).toBe(jdn);
    };
  });

  it('should convert a Julian day number (JDN) to a Hindu Lunar Astro date', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, ...date };

      expect(expected).toEqual(actual);
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.monthLeap).toBe(actual.isMonthLeap());
      expect(expected.day).toBe(actual.getDay());
      expect(expected.dayLeap).toBe(actual.isDayLeap());
    };
  });

  it('throws a validation exception', () => {
    expect(() => cal.toJdn(1549, 0, false, 1, false)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1549, 13, false, 1, false)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1549, 2, true, 3, false)).not.toThrow();
    expect(() => cal.toJdn(1549, 9, true, 1, false)).toThrow(INVALID_LEAP_MONTH);
    expect(() => cal.toJdn(1549, 2, true, 1, false)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1549, 4, false, 0, false)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1549, 4, false, 31, false)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1549, 6, false, 17, true)).toThrow(INVALID_LEAP_DAY);
  });

  it('should determine a valid leap year', () => {
    expect(cal.isLeapYear(127)).toBeTruthy();
    expect(cal.isLeapYear(1549)).toBeFalsy();
  });
});
