import { INVALID_DAY, INVALID_MONTH, INVALID_YERM } from '../../Const';
import { YermCalendar as cal } from '../../calendar/YermCalendar';

import { describe, expect, it } from 'vitest';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { cycle: -17, yerm: 23, month: 2, day: 10.5 } },
  { jdn: 1660037.5, rataDie: -61387, date: { cycle: -11, yerm: 27, month: 10, day: 25.5 } },
  { jdn: 1746893.5, rataDie: 25469, date: { cycle: -8, yerm: 51, month: 10, day: 2.5 } },
  { jdn: 1770641.5, rataDie: 49217, date: { cycle: -7, yerm: 48, month: 13, day: 8.5 } },
  { jdn: 1892731.5, rataDie: 171307, date: { cycle: -2, yerm: 41, month: 12, day: 18.5 } },
  { jdn: 1931579.5, rataDie: 210155, date: { cycle: 0, yerm: 18, month: 3, day: 4.5 } },
  { jdn: 1974851.5, rataDie: 253427, date: { cycle: 2, yerm: 3, month: 13, day: 14.5 } },
  { jdn: 2091164.5, rataDie: 369740, date: { cycle: 6, yerm: 36, month: 13, day: 6.5 } },
  { jdn: 2121509.5, rataDie: 400085, date: { cycle: 7, yerm: 47, month: 11, day: 23.5 } },
  { jdn: 2155779.5, rataDie: 434355, date: { cycle: 9, yerm: 14, month: 11, day: 8.5 } },
  { jdn: 2174029.5, rataDie: 452605, date: { cycle: 9, yerm: 52, month: 9, day: 8.5 } },
  { jdn: 2191584.5, rataDie: 470160, date: { cycle: 10, yerm: 36, month: 13, day: 22.5 } },
  { jdn: 2195261.5, rataDie: 473837, date: { cycle: 10, yerm: 44, month: 8, day: 7.5 } },
  { jdn: 2229274.5, rataDie: 507850, date: { cycle: 12, yerm: 10, month: 16, day: 1.5 } },
  { jdn: 2245580.5, rataDie: 524156, date: { cycle: 12, yerm: 44, month: 12, day: 6.5 } },
  { jdn: 2266100.5, rataDie: 544676, date: { cycle: 13, yerm: 35, month: 4, day: 2.5 } },
  { jdn: 2288542.5, rataDie: 567118, date: { cycle: 14, yerm: 29, month: 12, day: 1.5 } },
  { jdn: 2290901.5, rataDie: 569477, date: { cycle: 14, yerm: 34, month: 10, day: 27.5 } },
  { jdn: 2323140.5, rataDie: 601716, date: { cycle: 15, yerm: 49, month: 7, day: 19.5 } },
  { jdn: 2334848.5, rataDie: 613424, date: { cycle: 16, yerm: 21, month: 10, day: 3.5 } },
  { jdn: 2348020.5, rataDie: 626596, date: { cycle: 16, yerm: 48, month: 15, day: 5.5 } },
  { jdn: 2366978.5, rataDie: 645554, date: { cycle: 17, yerm: 36, month: 3, day: 4.5 } },
  { jdn: 2385648.5, rataDie: 664224, date: { cycle: 18, yerm: 22, month: 15, day: 11.5 } },
  { jdn: 2392825.5, rataDie: 671401, date: { cycle: 18, yerm: 37, month: 13, day: 12.5 } },
  { jdn: 2416223.5, rataDie: 694799, date: { cycle: 19, yerm: 34, month: 4, day: 21.5 } },
  { jdn: 2425848.5, rataDie: 704424, date: { cycle: 20, yerm: 2, month: 2, day: 19.5 } },
  { jdn: 2430266.5, rataDie: 708842, date: { cycle: 20, yerm: 11, month: 5, day: 8.5 } },
  { jdn: 2430833.5, rataDie: 709409, date: { cycle: 20, yerm: 12, month: 7, day: 14.5 } },
  { jdn: 2431004.5, rataDie: 709580, date: { cycle: 20, yerm: 12, month: 13, day: 8.5 } },
  { jdn: 2448698.5, rataDie: 727274, date: { cycle: 20, yerm: 49, month: 9, day: 13.5 } },
  { jdn: 2450138.5, rataDie: 728714, date: { cycle: 20, yerm: 52, month: 9, day: 6.5 } },
  { jdn: 2465737.5, rataDie: 744313, date: { cycle: 21, yerm: 32, month: 13, day: 13.5 } },
  { jdn: 2486076.5, rataDie: 764652, date: { cycle: 22, yerm: 22, month: 16, day: 5.5 } },
];

describe('yerm calendar spec', () => {
  it('should convert an Yerm date to Julian day number (JDN)', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.toJdn(date.cycle, date.yerm, date.month, date.day);

      expect(actual).toBe(jdn);
    };
  });

  it('should convert a Julian day number (JDN) to an Yerm date', () => {
    for (const { jdn, date } of dates) {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, year: 0, ...date };

      expect(expected).toEqual(actual);
      expect(expected.cycle).toBe(actual.getCycle());
      expect(expected.yerm).toBe(actual.getYerm());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.day).toBe(actual.getDay());
    };
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1, 0, 1, 1)).toThrow(INVALID_YERM);
    expect(() => cal.toJdn(1, 53, 1, 1)).toThrow(INVALID_YERM);
    expect(() => cal.toJdn(1, 1, 0, 1)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1, 1, 18, 1)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1, 3, 16, 1)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1, 1, 1, 0)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1, 1, 1, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1, 1, 2, 30)).toThrow(INVALID_DAY);
  });
});
