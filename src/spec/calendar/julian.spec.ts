import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { JulianCalendar as cal } from '../../calendar/JulianCalendar';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -587, month:  7, day: 30 } },
  { jdn: 1660037.5, rataDie:  -61387, date: { year: -169, month: 12, day:  8 } },
  { jdn: 1746893.5, rataDie:   25469, date: { year:   70, month:  9, day: 26 } },
  { jdn: 1770641.5, rataDie:   49217, date: { year:  135, month: 10, day:  3 } },
  { jdn: 1892731.5, rataDie:  171307, date: { year:  470, month:  1, day:  7 } },
  { jdn: 1931579.5, rataDie:  210155, date: { year:  576, month:  5, day: 18 } },
  { jdn: 1974851.5, rataDie:  253427, date: { year:  694, month: 11, day:  7 } },
  { jdn: 2091164.5, rataDie:  369740, date: { year: 1013, month:  4, day: 19 } },
  { jdn: 2121509.5, rataDie:  400085, date: { year: 1096, month:  5, day: 18 } },
  { jdn: 2155779.5, rataDie:  434355, date: { year: 1190, month:  3, day: 16 } },
  { jdn: 2174029.5, rataDie:  452605, date: { year: 1240, month:  3, day:  3 } },
  { jdn: 2191584.5, rataDie:  470160, date: { year: 1288, month:  3, day: 26 } },
  { jdn: 2195261.5, rataDie:  473837, date: { year: 1298, month:  4, day: 20 } },
  { jdn: 2229274.5, rataDie:  507850, date: { year: 1391, month:  6, day:  4 } },
  { jdn: 2245580.5, rataDie:  524156, date: { year: 1436, month:  1, day: 25 } },
  { jdn: 2266100.5, rataDie:  544676, date: { year: 1492, month:  3, day: 31 } },
  { jdn: 2288542.5, rataDie:  567118, date: { year: 1553, month:  9, day:  9 } },
  { jdn: 2290901.5, rataDie:  569477, date: { year: 1560, month:  2, day: 24 } },
  { jdn: 2323140.5, rataDie:  601716, date: { year: 1648, month:  5, day: 31 } },
  { jdn: 2334848.5, rataDie:  613424, date: { year: 1680, month:  6, day: 20 } },
  { jdn: 2348020.5, rataDie:  626596, date: { year: 1716, month:  7, day: 13 } },
  { jdn: 2366978.5, rataDie:  645554, date: { year: 1768, month:  6, day:  8 } },
  { jdn: 2385648.5, rataDie:  664224, date: { year: 1819, month:  7, day: 21 } },
  { jdn: 2392825.5, rataDie:  671401, date: { year: 1839, month:  3, day: 15 } },
  { jdn: 2416223.5, rataDie:  694799, date: { year: 1903, month:  4, day:  6 } },
  { jdn: 2425848.5, rataDie:  704424, date: { year: 1929, month:  8, day: 12 } },
  { jdn: 2430266.5, rataDie:  708842, date: { year: 1941, month:  9, day: 16 } },
  { jdn: 2430833.5, rataDie:  709409, date: { year: 1943, month:  4, day:  6 } },
  { jdn: 2431004.5, rataDie:  709580, date: { year: 1943, month:  9, day: 24 } },
  { jdn: 2448698.5, rataDie:  727274, date: { year: 1992, month:  3, day:  4 } },
  { jdn: 2450138.5, rataDie:  728714, date: { year: 1996, month:  2, day: 12 } },
  { jdn: 2465737.5, rataDie:  744313, date: { year: 2038, month: 10, day: 28 } },
  { jdn: 2486076.5, rataDie:  764652, date: { year: 2094, month:  7, day:  5 } },
];

describe ('Julian calendar spec', () => {
  it ('should convert a Julian date to Julian day number (JDN)', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day number (JDN) to a Julian date', () => {
    dates.forEach (({ jdn, date }) => {
      const yearLeap = cal.isLeapYear (date.year);
      const expected = { jdn, ...date, yearLeap };
      const actual   = cal.fromJdn (jdn);

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should determine whether a Julian year is leap year', () => {
    [ 4, 20, 1600, 1700, 1760, 1800, 1840, 1904, 1980, 2000 ].forEach (year => {
      expect (cal.isLeapYear (year)).toBe (true);
    });

    [ 1, 2, 3, 5, 1599, 1970, 2001 ].forEach (year => {
      expect (cal.isLeapYear (year)).toBe (false);
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1999,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, 15, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  7, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  2, 29)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (2000,  2, 30)).toThrow (INVALID_DAY);
   });
});
