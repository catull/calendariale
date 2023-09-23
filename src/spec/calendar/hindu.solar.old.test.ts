import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { HinduSolarOldCalendar as cal } from '../../calendar/HinduSolarOldCalendar';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: 2515, month: 5, day: 19 } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: 2933, month: 9, day: 26 } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: 3171, month: 7, day: 11 } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: 3236, month: 7, day: 17 } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: 3570, month: 10, day: 19 } },
  { jdn: 1931579.5, rataDie: 210155, date: { year: 3677, month: 2, day: 28 } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: 3795, month: 8, day: 17 } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: 4114, month: 1, day: 26 } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: 4197, month: 2, day: 24 } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: 4290, month: 12, day: 20 } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: 4340, month: 12, day: 7 } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: 4388, month: 12, day: 30 } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: 4399, month: 1, day: 24 } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: 4492, month: 3, day: 7 } },
  { jdn: 2245580.5, rataDie: 524156, date: { year: 4536, month: 10, day: 28 } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: 4593, month: 1, day: 3 } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: 4654, month: 6, day: 12 } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: 4660, month: 11, day: 27 } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: 4749, month: 3, day: 1 } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: 4781, month: 3, day: 21 } },
  { jdn: 2348020.5, rataDie: 626596, date: { year: 4817, month: 4, day: 13 } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: 4869, month: 3, day: 8 } },
  { jdn: 2385648.5, rataDie: 664224, date: { year: 4920, month: 4, day: 20 } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 4939, month: 12, day: 13 } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 5004, month: 1, day: 4 } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 5030, month: 5, day: 11 } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 5042, month: 6, day: 15 } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 5044, month: 1, day: 4 } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 5044, month: 6, day: 23 } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 5092, month: 12, day: 2 } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 5096, month: 11, day: 11 } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 5139, month: 7, day: 26 } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 5195, month: 4, day: 2 } },
];

describe('hindu Solar Old calendar spec', () => {
  it('should convert a Hindu Solar Old date to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.toJdn(date.year, date.month, date.day);

      expect(actual).toBe(jdn);
    });
  });

  it('should convert a Julian day number (JDN) to a Hindu Solar Old date', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, ...date };

      expect(expected).toEqual(actual);
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.day).toBe(actual.getDay());
    });
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1999, 0, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1999, -2, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1999, 13, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1999, 7, -5)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 1, 32)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 2, 32)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 3, 32)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 4, 32)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 5, 32)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 6, 32)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 7, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 8, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 9, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 10, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 11, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1999, 12, 31)).toThrow(INVALID_DAY);
  });
});
