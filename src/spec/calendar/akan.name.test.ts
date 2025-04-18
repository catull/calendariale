import { mod } from '../../Astro';
import { akan } from '../../Const';
import { AkanNameCalendar as cal } from '../../calendar/AkanNameCalendar';
import type { AkanNameDate } from '../../calendar/AkanNameDate';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { prefix: 6, stem: 5 } },
  { jdn: 1660037.5, rataDie: -61387, date: { prefix: 4, stem: 1 } },
  { jdn: 1746893.5, rataDie: 25469, date: { prefix: 4, stem: 1 } },
  { jdn: 1770641.5, rataDie: 49217, date: { prefix: 4, stem: 5 } },
  { jdn: 1892731.5, rataDie: 171307, date: { prefix: 6, stem: 1 } },
  { jdn: 1931579.5, rataDie: 210155, date: { prefix: 4, stem: 6 } },
  { jdn: 1974851.5, rataDie: 253427, date: { prefix: 4, stem: 4 } },
  { jdn: 2091164.5, rataDie: 369740, date: { prefix: 1, stem: 5 } },
  { jdn: 2121509.5, rataDie: 400085, date: { prefix: 4, stem: 5 } },
  { jdn: 2155779.5, rataDie: 434355, date: { prefix: 2, stem: 3 } },
  { jdn: 2174029.5, rataDie: 452605, date: { prefix: 6, stem: 4 } },
  { jdn: 2191584.5, rataDie: 470160, date: { prefix: 5, stem: 3 } },
  { jdn: 2195261.5, rataDie: 473837, date: { prefix: 4, stem: 5 } },
  { jdn: 2229274.5, rataDie: 507850, date: { prefix: 3, stem: 5 } },
  { jdn: 2245580.5, rataDie: 524156, date: { prefix: 1, stem: 1 } },
  { jdn: 2266100.5, rataDie: 544676, date: { prefix: 1, stem: 4 } },
  { jdn: 2288542.5, rataDie: 567118, date: { prefix: 3, stem: 4 } },
  { jdn: 2290901.5, rataDie: 569477, date: { prefix: 4, stem: 4 } },
  { jdn: 2323140.5, rataDie: 601716, date: { prefix: 5, stem: 1 } },
  { jdn: 2334848.5, rataDie: 613424, date: { prefix: 1, stem: 5 } },
  { jdn: 2348020.5, rataDie: 626596, date: { prefix: 3, stem: 3 } },
  { jdn: 2366978.5, rataDie: 645554, date: { prefix: 1, stem: 5 } },
  { jdn: 2385648.5, rataDie: 664224, date: { prefix: 5, stem: 6 } },
  { jdn: 2392825.5, rataDie: 671401, date: { prefix: 6, stem: 1 } },
  { jdn: 2416223.5, rataDie: 694799, date: { prefix: 4, stem: 5 } },
  { jdn: 2425848.5, rataDie: 704424, date: { prefix: 5, stem: 5 } },
  { jdn: 2430266.5, rataDie: 708842, date: { prefix: 1, stem: 6 } },
  { jdn: 2430833.5, rataDie: 709409, date: { prefix: 4, stem: 6 } },
  { jdn: 2431004.5, rataDie: 709580, date: { prefix: 1, stem: 2 } },
  { jdn: 2448698.5, rataDie: 727274, date: { prefix: 1, stem: 7 } },
  { jdn: 2450138.5, rataDie: 728714, date: { prefix: 1, stem: 5 } },
  { jdn: 2465737.5, rataDie: 744313, date: { prefix: 6, stem: 1 } },
  { jdn: 2486076.5, rataDie: 764652, date: { prefix: 5, stem: 5 } },
];
describe('akan Name calendar spec', () => {
  it('should convert a Julian day number (JDN) to a Akan Name date', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, ...date };

      expect(expected).toEqual(actual);
      expect(expected.prefix).toBe(actual.getPrefix());
      expect(expected.stem).toBe(actual.getStem());
    };
  });

  it('should handle modulo arithmetic', () => {
    const modulo: number = mod(akan.EPOCH, 42);
    const epochStart: AkanNameDate = cal.fromJdn(akan.EPOCH);
    const epochNext: AkanNameDate = cal.fromJdn(akan.EPOCH + 1);

    expect(modulo).toBe(7.5);
    expect(epochStart).toEqual({ jdn: akan.EPOCH, prefix: 6, stem: 7 });
    expect(epochNext).toEqual({ jdn: akan.EPOCH + 1, prefix: 1, stem: 1 });
  });
});
