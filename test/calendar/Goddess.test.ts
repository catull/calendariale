import { goddess, INVALID_DAY, INVALID_MONTH, INVALID_YEAR, J2000_JDN } from "../../src/Const";
import type { GoddessDate } from "../../src/calendar/index";
import { GoddessCalendar as cal } from "../../src/calendar/GoddessCalendar";

import { describe, expect, it } from "vite-plus/test";

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { cycle: -5, year: 454, month: 11, day: 12 } },
  { jdn: 1660037.5, rataDie: -61387, date: { cycle: -4, year: 382, month: 11, day: 27 } },
  { jdn: 1746894.5, rataDie: 25469, date: { cycle: -3, year: 139, month: 2, day: 3 } },
  { jdn: 1770641.5, rataDie: 49217, date: { cycle: -3, year: 200, month: 13, day: 8 } },
  { jdn: 1892731.5, rataDie: 171307, date: { cycle: -2, year: 48, month: 13, day: 19 } },
  { jdn: 1931579.5, rataDie: 210155, date: { cycle: -2, year: 150, month: 3, day: 4 } },
  { jdn: 1974851.5, rataDie: 253427, date: { cycle: -2, year: 262, month: 12, day: 15 } },
  { jdn: 2091164.5, rataDie: 369740, date: { cycle: -1, year: 95, month: 12, day: 6 } },
  { jdn: 2121509.5, rataDie: 400085, date: { cycle: -1, year: 174, month: 12, day: 23 } },
  { jdn: 2155779.5, rataDie: 434355, date: { cycle: -1, year: 264, month: 3, day: 9 } },
  { jdn: 2174029.5, rataDie: 452605, date: { cycle: -1, year: 311, month: 10, day: 9 } },
  { jdn: 2191584.5, rataDie: 470160, date: { cycle: -1, year: 357, month: 6, day: 22 } },
  { jdn: 2195261.5, rataDie: 473837, date: { cycle: -1, year: 367, month: 1, day: 8 } },
  { jdn: 2229274.5, rataDie: 507850, date: { cycle: -1, year: 455, month: 9, day: 2 } },
  { jdn: 2245580.5, rataDie: 524156, date: { cycle: 0, year: 28, month: 2, day: 6 } },
  { jdn: 2266100.5, rataDie: 544676, date: { cycle: 0, year: 81, month: 8, day: 3 } },
  { jdn: 2288542.5, rataDie: 567118, date: { cycle: 0, year: 140, month: 1, day: 1 } },
  { jdn: 2290901.5, rataDie: 569477, date: { cycle: 0, year: 146, month: 2, day: 27 } },
  { jdn: 2323140.5, rataDie: 601716, date: { cycle: 0, year: 230, month: 2, day: 18 } },
  { jdn: 2334848.5, rataDie: 613424, date: { cycle: 0, year: 260, month: 9, day: 4 } },
  { jdn: 2348020.5, rataDie: 626596, date: { cycle: 0, year: 294, month: 13, day: 6 } },
  { jdn: 2366978.5, rataDie: 645554, date: { cycle: 0, year: 344, month: 5, day: 5 } },
  { jdn: 2385648.5, rataDie: 664224, date: { cycle: 0, year: 392, month: 13, day: 12 } },
  { jdn: 2392825.5, rataDie: 671401, date: { cycle: 0, year: 411, month: 9, day: 13 } },
  { jdn: 2416223.5, rataDie: 694799, date: { cycle: 1, year: 2, month: 8, day: 22 } },
  { jdn: 2425848.5, rataDie: 704424, date: { cycle: 1, year: 27, month: 9, day: 20 } },
  { jdn: 2430266.5, rataDie: 708842, date: { cycle: 1, year: 39, month: 3, day: 8 } },
  { jdn: 2430833.5, rataDie: 709409, date: { cycle: 1, year: 40, month: 9, day: 14 } },
  { jdn: 2431004.5, rataDie: 709580, date: { cycle: 1, year: 41, month: 2, day: 8 } },
  { jdn: 2448698.5, rataDie: 727274, date: { cycle: 1, year: 87, month: 3, day: 13 } },
  { jdn: 2450138.5, rataDie: 728714, date: { cycle: 1, year: 90, month: 13, day: 6 } },
  { jdn: 2465737.5, rataDie: 744313, date: { cycle: 1, year: 131, month: 8, day: 13 } },
  { jdn: 2486076.5, rataDie: 764652, date: { cycle: 1, year: 184, month: 8, day: 5 } },
];

describe("goddess calendar spec", () => {
  it("should convert an Goddess date to Julian day number (JDN)", () => {
    dates.forEach(({ jdn, date }) =>
      expect(cal.toJdnCycle(date.cycle, date.year, date.month, date.day)).toBe(jdn),
    );
  });

  it("should convert a Julian day number (JDN) to an Goddess date", () => {
    dates.forEach(({ jdn, date }) => {
      const actual: GoddessDate = cal.fromJdn(jdn);

      expect(actual).toEqual({ jdn, ...date });
      expect(date.cycle).toBe(actual.getCycle());
      expect(date.year).toBe(actual.getYear());
      expect(date.month).toBe(actual.getMonth());
      expect(date.day).toBe(actual.getDay());
    });
  });

  it("should throw validation exceptions", () => {
    expect(() => cal.toJdn(-100, 1, 1)).toThrow(INVALID_YEAR);
    expect(() => cal.toJdn(0, 1, 1)).toThrow(INVALID_YEAR);
    expect(() => cal.toJdn(471, 1, 1)).toThrow(INVALID_YEAR);
    expect(() => cal.toJdn(100, 0, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(100, -2, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(100, 15, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(100, 7, 0)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(100, 7, -5)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(100, 7, 35)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(100, 13, 30)).toThrow(INVALID_DAY);
  });

  it("should calculate 1st of Athena", () => {
    expect(cal.toJdnCycle(0, 1, 1, 1)).toEqual(2235179.5);
    expect(cal.toJdnCycle(1, 1, 1, 1)).toEqual(2415611.5);
    expect(cal.toJdnCycle(-3, 1, 1, 1)).toEqual(1693883.5);
    expect(cal.toJdnCycle(-3, 10, 1, 1)).toEqual(1697339.5);
    expect(cal.toJdnCycle(-3, 20, 1, 1)).toEqual(1701178.5);
    expect(cal.toJdnCycle(-3, 193, 1, 1)).toEqual(1767592.5);
  });

  it("should handle some epochs", () => {
    expect(cal.fromJdn(J2000_JDN)).toEqual({
      jdn: 2451545.5,
      cycle: 1,
      year: 94,
      month: 8,
      day: 25,
    });
    expect(cal.fromJdn(goddess.EPOCH_CYCLE_1)).toEqual({
      jdn: 2415611.5,
      cycle: 1,
      year: 1,
      month: 1,
      day: 1,
    });
  });
});
