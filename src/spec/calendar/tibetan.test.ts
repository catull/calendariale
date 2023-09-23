import { INVALID_DAY, INVALID_LEAP_DAY, INVALID_LEAP_MONTH, INVALID_MONTH } from '../../Const';
import { TibetanCalendar as cal } from '../../calendar/TibetanCalendar';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -459, month: 8, monthLeap: false, day: 11, dayLeap: false } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: -41, month: 12, monthLeap: false, day: 27, dayLeap: false } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: 197, month: 10, monthLeap: false, day: 3, dayLeap: false } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: 262, month: 10, monthLeap: false, day: 9, dayLeap: false } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: 596, month: 12, monthLeap: false, day: 19, dayLeap: false } },
  { jdn: 1931579.5, rataDie: 210155, date: { year: 703, month: 5, monthLeap: false, day: 4, dayLeap: false } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: 821, month: 10, monthLeap: false, day: 15, dayLeap: false } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: 1140, month: 4, monthLeap: false, day: 6, dayLeap: false } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: 1223, month: 4, monthLeap: false, day: 23, dayLeap: false } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: 1317, month: 3, monthLeap: false, day: 8, dayLeap: false } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: 1367, month: 2, monthLeap: false, day: 8, dayLeap: false } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: 1415, month: 2, monthLeap: false, day: 22, dayLeap: false } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: 1425, month: 4, monthLeap: false, day: 8, dayLeap: false } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: 1518, month: 5, monthLeap: false, day: 1, dayLeap: false } },
  { jdn: 2245580.5, rataDie: 524156, date: { year: 1563, month: 1, monthLeap: false, day: 7, dayLeap: false } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: 1619, month: 3, monthLeap: false, day: 3, dayLeap: false } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: 1680, month: 8, monthLeap: false, day: 2, dayLeap: false } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: 1687, month: 1, monthLeap: false, day: 29, dayLeap: false } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: 1775, month: 4, monthLeap: false, day: 20, dayLeap: false } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: 1807, month: 6, monthLeap: true, day: 4, dayLeap: false } },
  { jdn: 2348020.5, rataDie: 626596, date: { year: 1843, month: 6, monthLeap: false, day: 6, dayLeap: false } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: 1895, month: 5, monthLeap: false, day: 5, dayLeap: false } },
  { jdn: 2385648.5, rataDie: 664224, date: { year: 1946, month: 6, monthLeap: false, day: 11, dayLeap: false } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 1966, month: 2, monthLeap: false, day: 13, dayLeap: false } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 2030, month: 2, monthLeap: false, day: 22, dayLeap: false } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 2056, month: 7, monthLeap: false, day: 20, dayLeap: false } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 2068, month: 8, monthLeap: false, day: 9, dayLeap: false } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 2070, month: 3, monthLeap: true, day: 14, dayLeap: false } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 2070, month: 8, monthLeap: false, day: 8, dayLeap: false } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 2119, month: 1, monthLeap: false, day: 14, dayLeap: false } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 2123, month: 1, monthLeap: false, day: 7, dayLeap: false } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 2165, month: 9, monthLeap: false, day: 14, dayLeap: false } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 2221, month: 6, monthLeap: false, day: 6, dayLeap: false } },
];

describe('tibetan calendar spec', () => {
  it('should convert a Tibetan date to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.toJdn(date.year, date.month, date.monthLeap, date.day, date.dayLeap);

      expect(actual).toBe(jdn);
    });
  });

  it('should convert a Julian day number (JDN) to a Tibetan date', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, ...date };

      expect(expected).toEqual(actual);
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.monthLeap).toBe(actual.isMonthLeap());
      expect(expected.day).toBe(actual.getDay());
      expect(expected.dayLeap).toBe(actual.isDayLeap());
    });
  });

  it('should establish whether a Tibetan month is leap', () => {
    dates.forEach(({ date }) => {
      const actual = cal.isLeapMonth(date.year, date.month);
      const expected = date.monthLeap;

      expect(actual).toBe(expected);
    });
  });

  it('throws a validation exception', () => {
    expect(() => cal.toJdn(2143, 0, false, 1, false)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(2143, 14, false, 1, false)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(2143, 9, true, 1, false)).toThrow(INVALID_LEAP_MONTH);
    expect(() => cal.toJdn(2143, 4, false, 0, false)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(2143, 4, false, 31, false)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(2143, 4, false, 2, false)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(2143, 3, false, 29, false)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(2143, 6, false, 17, true)).toThrow(INVALID_LEAP_DAY);
  });

  it('reaches almost 100% code coverage with this filler', () => {
    const actual = cal.fromJdn(2434039); // 1952-01-27
    expect(actual).toEqual({
      jdn: 2434039,
      day: 30.5,
      dayLeap: false,
      month: 11,
      monthLeap: false,
      year: 2078,
    });
  });

  it('should raise code coverage, close the gap with 2 corner cases', () => {
    let actual = cal.fromJdn(2434423); // 1953-02-14
    expect(actual).toEqual({
      jdn: 2434423,
      day: 30.5,
      dayLeap: false,
      month: 12,
      monthLeap: false,
      year: 2079,
    });

    actual = cal.fromJdn(2434777.5); // 1954-02-04
    expect(actual).toEqual({
      jdn: 2434777.5,
      day: 1,
      dayLeap: false,
      month: 1,
      monthLeap: true,
      year: 2081,
    });
  });
});
