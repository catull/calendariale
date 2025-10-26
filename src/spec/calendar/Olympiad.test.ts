import { INVALID_YEAR } from '../../Const';
import { OlympiadCalendar as cal } from '../../calendar/OlympiadCalendar';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { cycle: 48, year: 2 } },
  { jdn: 1660037.5, rataDie: -61387, date: { cycle: 152, year: 4 } },
  { jdn: 1746893.5, rataDie: 25469, date: { cycle: 212, year: 2 } },
  { jdn: 1770641.5, rataDie: 49217, date: { cycle: 228, year: 3 } },
  { jdn: 1892731.5, rataDie: 171307, date: { cycle: 312, year: 2 } },
  { jdn: 1931579.5, rataDie: 210155, date: { cycle: 338, year: 4 } },
  { jdn: 1974851.5, rataDie: 253427, date: { cycle: 368, year: 2 } },
  { jdn: 2091164.5, rataDie: 369740, date: { cycle: 448, year: 1 } },
  { jdn: 2121509.5, rataDie: 400085, date: { cycle: 468, year: 4 } },
  { jdn: 2155779.5, rataDie: 434355, date: { cycle: 492, year: 2 } },
  { jdn: 2174029.5, rataDie: 452605, date: { cycle: 504, year: 4 } },
  { jdn: 2191584.5, rataDie: 470160, date: { cycle: 516, year: 4 } },
  { jdn: 2195261.5, rataDie: 473837, date: { cycle: 519, year: 2 } },
  { jdn: 2229274.5, rataDie: 507850, date: { cycle: 542, year: 3 } },
  { jdn: 2245580.5, rataDie: 524156, date: { cycle: 553, year: 4 } },
  { jdn: 2266100.5, rataDie: 544676, date: { cycle: 567, year: 4 } },
  { jdn: 2288542.5, rataDie: 567118, date: { cycle: 583, year: 1 } },
  { jdn: 2290901.5, rataDie: 569477, date: { cycle: 584, year: 4 } },
  { jdn: 2323140.5, rataDie: 601716, date: { cycle: 606, year: 4 } },
  { jdn: 2334848.5, rataDie: 613424, date: { cycle: 614, year: 4 } },
  { jdn: 2348020.5, rataDie: 626596, date: { cycle: 623, year: 4 } },
  { jdn: 2366978.5, rataDie: 645554, date: { cycle: 636, year: 4 } },
  { jdn: 2385648.5, rataDie: 664224, date: { cycle: 649, year: 3 } },
  { jdn: 2392825.5, rataDie: 671401, date: { cycle: 654, year: 3 } },
  { jdn: 2416223.5, rataDie: 694799, date: { cycle: 670, year: 3 } },
  { jdn: 2425848.5, rataDie: 704424, date: { cycle: 677, year: 1 } },
  { jdn: 2430266.5, rataDie: 708842, date: { cycle: 680, year: 1 } },
  { jdn: 2430833.5, rataDie: 709409, date: { cycle: 680, year: 3 } },
  { jdn: 2431004.5, rataDie: 709580, date: { cycle: 680, year: 3 } },
  { jdn: 2448698.5, rataDie: 727274, date: { cycle: 692, year: 4 } },
  { jdn: 2450138.5, rataDie: 728714, date: { cycle: 693, year: 4 } },
  { jdn: 2465737.5, rataDie: 744313, date: { cycle: 704, year: 2 } },
  { jdn: 2486076.5, rataDie: 764652, date: { cycle: 718, year: 2 } },
];

describe('olympiad calendar spec', () => {
  it('should convert a Olympiad to Julian day number (JDN)', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.toJdn(date.cycle, date.year) - jdn;

      expect(Math.abs(actual)).toBeLessThan(365);
    };
  });

  it('should convert a Julian day number (JDN) to a Olympiad', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, ...date };

      expect(expected).toEqual(actual);
      expect(expected.cycle).toBe(actual.getCycle());
      expect(expected.year).toBe(actual.getYear());
    };
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1, -1)).toThrow(INVALID_YEAR);
    expect(() => cal.toJdn(1, 0)).toThrow(INVALID_YEAR);
    expect(() => cal.toJdn(1, 5)).toThrow(INVALID_YEAR);
    expect(() => cal.toJdn(1, 99)).toThrow(INVALID_YEAR);
  });
});
