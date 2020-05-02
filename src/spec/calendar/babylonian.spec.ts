import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { BabylonianCalendar as cal } from '../../calendar/BabylonianCalendar';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -275, month: 4, yearLeap: false, day: 10 } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: 143, month: 8, yearLeap: false, day: 24 } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: 381, month: 7, yearLeap: false, day: 1 } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: 446, month: 7, yearLeap: false, day: 7 } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: 780, month: 10, yearLeap: false, day: 17 } }, // day: 17 !!
  { jdn: 1931579.5, rataDie: 210155, date: { year: 887, month: 2, yearLeap: false, day: 3 } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: 1005, month: 8, yearLeap: false, day: 13 } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: 1324, month: 1, yearLeap: false, day: 5 } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: 1407, month: 2, yearLeap: false, day: 22 } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: 1500, month: 12, yearLeap: false, day: 7 } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: 1550, month: 12, yearLeap: false, day: 7 } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: 1598, month: 12, yearLeap: false, day: 21 } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: 1609, month: 1, yearLeap: false, day: 7 } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: 1702, month: 2, yearLeap: false, day: 29 } }, // day: 29 !!
  { jdn: 2245580.5, rataDie: 524156, date: { year: 1746, month: 11, yearLeap: false, day: 6 } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: 1803, month: 1, yearLeap: false, day: 2 } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: 1864, month: 5, yearLeap: false, day: 30 } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: 1870, month: 11, yearLeap: false, day: 27 } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: 1959, month: 2, yearLeap: false, day: 18 } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: 1991, month: 4, yearLeap: false, day: 3 } }, // day: 2 ??
  { jdn: 2348020.5, rataDie: 626596, date: { year: 2027, month: 4, yearLeap: false, day: 4 } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: 2079, month: 3, yearLeap: false, day: 3 } }, // day: 3 !!
  { jdn: 2385648.5, rataDie: 664224, date: { year: 2130, month: 4, yearLeap: false, day: 10 } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 2149, month: 12, yearLeap: false, day: 11 } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 2213, month: 12, yearLeap: true, day: 20 } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 2240, month: 5, yearLeap: false, day: 19 } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 2252, month: 6, yearLeap: false, day: 7 } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 2254, month: 1, yearLeap: false, day: 13 } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 2254, month: 7, yearLeap: false, day: 7 } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 2302, month: 12, yearLeap: false, day: 12 } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 2306, month: 12, yearLeap: false, day: 5 } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 2349, month: 8, yearLeap: false, day: 12 } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 2405, month: 4, yearLeap: false, day: 5 } },
];

// (babylonian-from-fixed (moment-from-jd 1892731.5))
// (babylonian-from-fixed 171307)
// (780 10 NIL 17.0d0)
// (780 10 NIL 17)

// (babylonian-from-fixed (moment-from-jd 2229274.5))
// (babylonian-from-fixed 507850)
// (1702 2 NIL 29.0d0)
// (1702 2 NIL 29)

// (babylonian-from-fixed (moment-from-jd 2334848.5))
// (babylonian-from-fixed 613424)
// (1991 4 NIL 2.0d0)
// (1991 4 NIL 2)

// (babylonian-from-fixed (moment-from-jd 2366978.5))
// (babylonian-from-fixed 645554)
// (2079 3 NIL 3.0d0)
// (2079 3 NIL 3)

const captains = console;

describe('Babylonian calendar spec', () => {
  it('should convert a Babylonian date to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.toJdn(date.year, date.month, date.yearLeap, date.day);

      expect(actual).toBe(jdn);
      if (jdn !== actual) {
        captains.log(jdn, actual, jdn - actual);
      }
    });
  });

  it('should convert a Julian day number (JDN) to a Babylonian date', () => {
    dates.forEach(({ jdn, date }) => {
      const expected = { jdn, ...date };
      const actual = cal.fromJdn(jdn);

      expect(expected).toEqual(actual);
      expect(expected.jdn).toBe(actual.getJdn());
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.yearLeap).toBe(actual.isYearLeap());
      expect(expected.day).toBe(actual.getDay());
    });
  });

  it('should determine whether a Babylonian year is a leap year', () => {
    [2213].forEach((year) => {
      expect(cal.isLeapYear(year)).toBe(true);
    });
  });

  it('should determine whether a Babylonian year is not a leap year', () => {
    [2212, 2214].forEach((year) => {
      expect(cal.isLeapYear(year)).toBe(false);
    });
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1, 0, false, 1)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1, 14, false, 1)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1, 1, false, 0)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1, 1, false, 31)).toThrow(INVALID_DAY);

    // expect(cal.toJdn (0, 11, false, 29)).toBe(1607891.5);
    // expect(cal.fromJdn(1607891.5)).toEqual({ jdn: 1607891.5, year: 0, month: 11, yearLeap: false, day: 29 });
    // expect(cal.fromJdn(1607892.5)).toEqual({ jdn: 1607892.5, year: 0, month: 11, yearLeap: false, day: 30 });
    expect(() => cal.toJdn(0, 11, true, 30)).toThrow(INVALID_DAY);
  });
});
