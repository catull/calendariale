import { INVALID_DAY, INVALID_MONTH, INVALID_VAHID, INVALID_YEAR } from '../../Const';
import { BahaiAstroCalendar as cal } from '../../calendar/BahaiAstroCalendar';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { kullIShay: -6, vahid: 6, year: 3, month: 7, day: 11 } },
  { jdn: 1660037.5, rataDie: -61387, date: { kullIShay: -5, vahid: 9, year: 3, month: 14, day: 13 } },
  { jdn: 1746893.5, rataDie: 25469, date: { kullIShay: -4, vahid: 2, year: 13, month: 10, day: 17 } },
  { jdn: 1770641.5, rataDie: 49217, date: { kullIShay: -4, vahid: 6, year: 2, month: 11, day: 6 } },
  { jdn: 1892731.5, rataDie: 171307, date: { kullIShay: -3, vahid: 4, year: 13, month: 16, day: 10 } },
  { jdn: 1931579.5, rataDie: 210155, date: { kullIShay: -3, vahid: 10, year: 6, month: 4, day: 5 } },
  { jdn: 1974851.5, rataDie: 253427, date: { kullIShay: -3, vahid: 16, year: 10, month: 13, day: 7 } },
  { jdn: 2091164.5, rataDie: 369740, date: { kullIShay: -2, vahid: 14, year: 6, month: 2, day: 17 } },
  { jdn: 2121509.5, rataDie: 400085, date: { kullIShay: -2, vahid: 18, year: 13, month: 4, day: 9 } },
  { jdn: 2155779.5, rataDie: 434355, date: { kullIShay: -1, vahid: 4, year: 12, month: 1, day: 3 } },
  { jdn: 2174029.5, rataDie: 452605, date: { kullIShay: -1, vahid: 7, year: 4, month: 19, day: 10 } },
  { jdn: 2191584.5, rataDie: 470160, date: { kullIShay: -1, vahid: 9, year: 15, month: 1, day: 14 } },
  { jdn: 2195261.5, rataDie: 473837, date: { kullIShay: -1, vahid: 10, year: 6, month: 3, day: 1 } },
  { jdn: 2229274.5, rataDie: 507850, date: { kullIShay: -1, vahid: 15, year: 4, month: 5, day: 8 } },
  { jdn: 2245580.5, rataDie: 524156, date: { kullIShay: -1, vahid: 17, year: 10, month: 17, day: 16 } },
  { jdn: 2266100.5, rataDie: 544676, date: { kullIShay: 0, vahid: 1, year: 10, month: 2, day: 2 } },
  { jdn: 2288542.5, rataDie: 567118, date: { kullIShay: 0, vahid: 4, year: 14, month: 10, day: 12 } },
  { jdn: 2290901.5, rataDie: 569477, date: { kullIShay: 0, vahid: 5, year: 1, month: 19, day: 4 } },
  { jdn: 2323140.5, rataDie: 601716, date: { kullIShay: 0, vahid: 9, year: 14, month: 5, day: 7 } },
  { jdn: 2334848.5, rataDie: 613424, date: { kullIShay: 0, vahid: 11, year: 8, month: 6, day: 8 } },
  { jdn: 2348020.5, rataDie: 626596, date: { kullIShay: 0, vahid: 13, year: 6, month: 7, day: 13 } },
  { jdn: 2366978.5, rataDie: 645554, date: { kullIShay: 0, vahid: 16, year: 1, month: 5, day: 16 } },
  { jdn: 2385648.5, rataDie: 664224, date: { kullIShay: 0, vahid: 18, year: 14, month: 8, day: 2 } },
  { jdn: 2392825.5, rataDie: 671401, date: { kullIShay: 0, vahid: 19, year: 15, month: 1, day: 7 } },
  { jdn: 2416223.5, rataDie: 694799, date: { kullIShay: 1, vahid: 4, year: 3, month: 2, day: 10 } },
  { jdn: 2425848.5, rataDie: 704424, date: { kullIShay: 1, vahid: 5, year: 10, month: 9, day: 6 } },
  { jdn: 2430266.5, rataDie: 708842, date: { kullIShay: 1, vahid: 6, year: 3, month: 11, day: 3 } },
  { jdn: 2430833.5, rataDie: 709409, date: { kullIShay: 1, vahid: 6, year: 5, month: 2, day: 11 } },
  { jdn: 2431004.5, rataDie: 709580, date: { kullIShay: 1, vahid: 6, year: 5, month: 11, day: 11 } },
  { jdn: 2448698.5, rataDie: 727274, date: { kullIShay: 1, vahid: 8, year: 15, month: 19, day: 17 } },
  { jdn: 2450138.5, rataDie: 728714, date: { kullIShay: 1, vahid: 8, year: 19, month: 18, day: 19 } },
  { jdn: 2465737.5, rataDie: 744313, date: { kullIShay: 1, vahid: 11, year: 5, month: 13, day: 8 } },
  { jdn: 2486076.5, rataDie: 764652, date: { kullIShay: 1, vahid: 14, year: 4, month: 7, day: 7 } },
];

describe('Bahai Astro calendar spec', () => {
  it('should convert a Bahai Astro date to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.bahaiToJdn(date.kullIShay, date.vahid, date.year, date.month, date.day);
      expect(jdn).toBe(actual);

      const year = 361 * (date.kullIShay - 1) + 19 * (date.vahid - 1) + date.year;
      const actual2 = cal.toJdn(year, date.month, date.day);
      expect(jdn).toEqual(actual2);
    });
  });

  it('should convert a Julian day number (JDN) to a Bahai Astro date', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.fromJdn(jdn);
      const yearLeap = cal.isLeapYear(date.year);
      const expected = { jdn, ...date, yearLeap };

      expect(expected).toEqual(actual);
      expect(expected.kullIShay).toBe(actual.getKullIShay());
      expect(expected.vahid).toBe(actual.getVahid());
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.day).toBe(actual.getDay());
    });
  });

  it('should determine whether a Bahai Astro year is leap year', () => {
    // the Bahai years 1 and 169 are the limits of the old leap rule
    expect(cal.isLeapYear(1)).toBe(true);
    expect(cal.isLeapYear(168)).toBe(false);
    expect(cal.isLeapYear(169)).toBe(false);
    expect(cal.isLeapYear(170)).toBe(true);

    // starting with the Bahai year 172, the new rule is in place
    expect(cal.isLeapYear(173)).toBe(false);
    expect(cal.isLeapYear(174)).toBe(true);
    expect(cal.isLeapYear(220)).toBe(true);
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.bahaiToJdn(1, -9, 10, 10, 10)).toThrow(INVALID_VAHID);
    expect(() => cal.bahaiToJdn(1, 20, 10, 10, 10)).toThrow(INVALID_VAHID);
    expect(() => cal.bahaiToJdn(1, 9, 0, 10, 10)).toThrow(INVALID_YEAR);
    expect(() => cal.bahaiToJdn(1, 10, 21, 10, 10)).toThrow(INVALID_YEAR);
    expect(() => cal.bahaiToJdn(1, 9, 10, -1, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.bahaiToJdn(1, 12, 11, 20, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.bahaiToJdn(1, 9, 10, 10, 0)).toThrow(INVALID_DAY);
    expect(() => cal.bahaiToJdn(1, 16, 11, 12, 22)).toThrow(INVALID_DAY);
    expect(() => cal.bahaiToJdn(1, 9, 10, 0, 0)).toThrow(INVALID_DAY);
    expect(() => cal.bahaiToJdn(1, 16, 11, 0, 6)).toThrow(INVALID_DAY);
    expect(() => cal.bahaiToJdn(1, 9, 16, 0, 6)).toThrow(INVALID_DAY);
    expect(() => cal.bahaiToJdn(1, 16, 11, 0, 5)).toThrow(INVALID_DAY);
  });
});
