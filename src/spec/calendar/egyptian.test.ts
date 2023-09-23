import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { EgyptianCalendar as cal } from '../../calendar/EgyptianCalendar';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: 161, month: 7, day: 15 } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: 580, month: 3, day: 6 } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: 818, month: 2, day: 22 } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: 883, month: 3, day: 15 } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: 1217, month: 9, day: 15 } },
  { jdn: 1931579.5, rataDie: 210155, date: { year: 1324, month: 2, day: 18 } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: 1442, month: 9, day: 10 } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: 1761, month: 5, day: 8 } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: 1844, month: 6, day: 28 } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: 1938, month: 5, day: 18 } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: 1988, month: 5, day: 18 } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: 2036, month: 6, day: 23 } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: 2046, month: 7, day: 20 } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: 2139, month: 9, day: 28 } },
  { jdn: 2245580.5, rataDie: 524156, date: { year: 2184, month: 5, day: 29 } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: 2240, month: 8, day: 19 } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: 2302, month: 2, day: 11 } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: 2308, month: 7, day: 30 } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: 2396, month: 11, day: 29 } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: 2428, month: 12, day: 27 } },
  { jdn: 2348020.5, rataDie: 626596, date: { year: 2465, month: 1, day: 24 } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: 2517, month: 1, day: 2 } },
  { jdn: 2385648.5, rataDie: 664224, date: { year: 2568, month: 2, day: 27 } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 2587, month: 10, day: 29 } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 2651, month: 12, day: 7 } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 2678, month: 4, day: 17 } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 2690, month: 5, day: 25 } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 2691, month: 12, day: 17 } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 2692, month: 6, day: 3 } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 2740, month: 11, day: 27 } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 2744, month: 11, day: 7 } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 2787, month: 8, day: 1 } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 2843, month: 4, day: 20 } },
];

describe('egyptian calendar spec', () => {
  it('should convert an Egyptian date to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.toJdn(date.year, date.month, date.day);
      expect(jdn).toBe(actual);
    });
  });

  it('should convert a Julian day number (JDN) to an Egyptian date', () => {
    dates.forEach(({ jdn, date }) => {
      const expected = { jdn, ...date };
      const actual = cal.fromJdn(jdn);

      expect(expected).toEqual(actual);
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.day).toBe(actual.getDay());
    });
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1000, 0, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1000, -2, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1000, 15, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1000, 7, 0)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1000, 7, -5)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1000, 7, 35)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1000, 13, 6)).toThrow(INVALID_DAY);
  });
});
