import { INVALID_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, INVALID_YEAR } from '../../Const';
import { ChineseCalendar as cal } from '../../calendar/ChineseCalendar';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { cycle: 35, year: 11, month:  6, monthLeap: false, day: 12 } },
  { jdn: 1660037.5, rataDie:  -61387, date: { cycle: 42, year:  9, month: 10, monthLeap: false, day: 27 } },
  { jdn: 1746893.5, rataDie:   25469, date: { cycle: 46, year:  7, month:  8, monthLeap: false, day:  4 } },
  { jdn: 1770641.5, rataDie:   49217, date: { cycle: 47, year: 12, month:  8, monthLeap: false, day:  9 } },
  { jdn: 1892731.5, rataDie:  171307, date: { cycle: 52, year: 46, month: 11, monthLeap: false, day: 20 } },
  { jdn: 1931579.5, rataDie:  210155, date: { cycle: 54, year: 33, month:  4, monthLeap: false, day:  5 } },
  { jdn: 1974851.5, rataDie:  253427, date: { cycle: 56, year: 31, month: 10, monthLeap: false, day: 15 } },
  { jdn: 2091164.5, rataDie:  369740, date: { cycle: 61, year: 50, month:  3, monthLeap: false, day:  7 } },
  { jdn: 2121509.5, rataDie:  400085, date: { cycle: 63, year: 13, month:  4, monthLeap: false, day: 24 } },
  { jdn: 2155779.5, rataDie:  434355, date: { cycle: 64, year: 47, month:  2, monthLeap: false, day:  9 } },
  { jdn: 2174029.5, rataDie:  452605, date: { cycle: 65, year: 37, month:  2, monthLeap: false, day:  9 } },
  { jdn: 2191584.5, rataDie:  470160, date: { cycle: 66, year: 25, month:  2, monthLeap: false, day: 23 } },
  { jdn: 2195261.5, rataDie:  473837, date: { cycle: 66, year: 35, month:  3, monthLeap: false, day:  9 } },
  { jdn: 2229274.5, rataDie:  507850, date: { cycle: 68, year:  8, month:  5, monthLeap: false, day:  2 } },
  { jdn: 2245580.5, rataDie:  524156, date: { cycle: 68, year: 53, month:  1, monthLeap: false, day:  8 } },
  { jdn: 2266100.5, rataDie:  544676, date: { cycle: 69, year: 49, month:  3, monthLeap: false, day:  4 } },
  { jdn: 2288542.5, rataDie:  567118, date: { cycle: 70, year: 50, month:  8, monthLeap: false, day:  2 } },
  { jdn: 2290901.5, rataDie:  569477, date: { cycle: 70, year: 57, month:  1, monthLeap: false, day: 29 } },
  { jdn: 2323140.5, rataDie:  601716, date: { cycle: 72, year: 25, month:  4, monthLeap: true,  day: 20 } },
  { jdn: 2334848.5, rataDie:  613424, date: { cycle: 72, year: 57, month:  6, monthLeap: false, day:  5 } },
  { jdn: 2348020.5, rataDie:  626596, date: { cycle: 73, year: 33, month:  6, monthLeap: false, day:  6 } },
  { jdn: 2366978.5, rataDie:  645554, date: { cycle: 74, year: 25, month:  5, monthLeap: false, day:  5 } },
  { jdn: 2385648.5, rataDie:  664224, date: { cycle: 75, year: 16, month:  6, monthLeap: false, day: 12 } },
  { jdn: 2392825.5, rataDie:  671401, date: { cycle: 75, year: 36, month:  2, monthLeap: false, day: 13 } },
  { jdn: 2416223.5, rataDie:  694799, date: { cycle: 76, year: 40, month:  3, monthLeap: false, day: 22 } },
  { jdn: 2425848.5, rataDie:  704424, date: { cycle: 77, year:  6, month:  7, monthLeap: false, day: 21 } },
  { jdn: 2430266.5, rataDie:  708842, date: { cycle: 77, year: 18, month:  8, monthLeap: false, day:  9 } },
  { jdn: 2430833.5, rataDie:  709409, date: { cycle: 77, year: 20, month:  3, monthLeap: false, day: 15 } },
  { jdn: 2431004.5, rataDie:  709580, date: { cycle: 77, year: 20, month:  9, monthLeap: false, day:  9 } },
  { jdn: 2448698.5, rataDie:  727274, date: { cycle: 78, year:  9, month:  2, monthLeap: false, day: 14 } },
  { jdn: 2450138.5, rataDie:  728714, date: { cycle: 78, year: 13, month:  1, monthLeap: false, day:  7 } },
  { jdn: 2465737.5, rataDie:  744313, date: { cycle: 78, year: 55, month: 10, monthLeap: false, day: 14 } },
  { jdn: 2486076.5, rataDie:  764652, date: { cycle: 79, year: 51, month:  6, monthLeap: false, day:  7 } },
];

describe ('Chinese calendar spec', () => {
  it ('should convert a Chinese date to Julian day number (JDN)', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.cycle, date.year, date.month, date.monthLeap, date.day);
      expect (jdn).toBe (actual);
    });
  });

  it ('should convert a Julian day number (JDN) to a Chinese date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.day).toBe (actual.getDay());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.monthLeap).toBe (actual.isMonthLeap());
      expect (expected.year).toBe (actual.getYear());
      expect (expected.cycle).toBe (actual.getCycle());
    });
  });

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (78,  0,  1, false,  1)).toThrow (INVALID_YEAR);
    expect (() => cal.toJdn (78, 61,  1, false,  1)).toThrow (INVALID_YEAR);
    expect (() => cal.toJdn (78,  1,  0, false,  1)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (78,  1, 14, false,  1)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (78, 34,  5, true ,  1)).toThrow (INVALID_LEAP_MONTH);
    expect (() => cal.toJdn (78, 34,  4, false, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (78, 34,  5, false, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (78, 34,  6, false, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (78, 34,  6, true , 30)).not.toThrow (INVALID_DAY);
  });
});
