import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { SamaritanCalendar as cal } from '../../calendar/SamaritanCalendar';

const dates = [
  { jdn: 1507231.5, rataDie: -214193, date: { year: 1052, month:  5, day: 12 } },
  { jdn: 1660037.5, rataDie:  -61387, date: { year: 1471, month:  9, day: 27 } },
  { jdn: 1746893.5, rataDie:   25469, date: { year: 1709, month:  7, day:  4 } },
  { jdn: 1770641.5, rataDie:   49217, date: { year: 1774, month:  7, day:  9 } },
  { jdn: 1892731.5, rataDie:  171307, date: { year: 2108, month: 10, day: 19 } },
  { jdn: 1931579.5, rataDie:  210155, date: { year: 2214, month:  3, day:  5 } },
  { jdn: 1974851.5, rataDie:  253427, date: { year: 2333, month:  8, day: 14 } },
  { jdn: 2091164.5, rataDie:  369740, date: { year: 2651, month:  2, day:  7 } },
  { jdn: 2121509.5, rataDie:  400085, date: { year: 2734, month:  2, day: 24 } },
  { jdn: 2155779.5, rataDie:  434355, date: { year: 2828, month: 13, day:  9 } },
  { jdn: 2174029.5, rataDie:  452605, date: { year: 2878, month: 12, day:  8 } },
  { jdn: 2191584.5, rataDie:  470160, date: { year: 2926, month: 13, day: 23 } },
  { jdn: 2195261.5, rataDie:  473837, date: { year: 2936, month:  2, day:  8 } },
  { jdn: 2229274.5, rataDie:  507850, date: { year: 3029, month:  3, day:  2 } },
  { jdn: 2245580.5, rataDie:  524156, date: { year: 3074, month: 11, day:  7 } },
  { jdn: 2266100.5, rataDie:  544676, date: { year: 3130, month:  1, day:  4 } },
  { jdn: 2288542.5, rataDie:  567118, date: { year: 3192, month:  7, day:  2 } },
  { jdn: 2290901.5, rataDie:  569477, date: { year: 3198, month: 11, day: 28 } },
  { jdn: 2323140.5, rataDie:  601716, date: { year: 3286, month:  3, day: 19 } },
  { jdn: 2334848.5, rataDie:  613424, date: { year: 3318, month:  4, day:  4 } },
  { jdn: 2348020.5, rataDie:  626596, date: { year: 3354, month:  5, day:  6 } },
  { jdn: 2366978.5, rataDie:  645554, date: { year: 3406, month:  3, day:  5 } },
  { jdn: 2385648.5, rataDie:  664224, date: { year: 3457, month:  5, day: 12 } },
  { jdn: 2392825.5, rataDie:  671401, date: { year: 3477, month: 13, day: 12 } },
  { jdn: 2416223.5, rataDie:  694799, date: { year: 3541, month:  1, day: 22 } },
  { jdn: 2425848.5, rataDie:  704424, date: { year: 3567, month:  5, day: 21 } },
  { jdn: 2430266.5, rataDie:  708842, date: { year: 3580, month:  7, day:  9 } },
  { jdn: 2430833.5, rataDie:  709409, date: { year: 3581, month:  1, day: 15 } },
  { jdn: 2431004.5, rataDie:  709580, date: { year: 3582, month:  7, day:  8 } },
  { jdn: 2448698.5, rataDie:  727274, date: { year: 3630, month: 12, day: 13 } },
  { jdn: 2450138.5, rataDie:  728714, date: { year: 3634, month: 12, day:  7 } },
  { jdn: 2465737.5, rataDie:  744313, date: { year: 3677, month:  8, day: 14 } },
  { jdn: 2486076.5, rataDie:  764652, date: { year: 3732, month:  4, day:  6 } },
];

describe('Samaritan calendar spec', () => {
  it ('should convert a Samaritan date to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.toJdn(date.year, date.month, date.day);

      expect(actual).toBe(jdn);
    });
  });

  it ('should convert a Julian day number (JDN) to a Samaritan date', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.fromJdn(jdn);
      const yearLeap = cal.isLeapYear(date.year);
      const expected = { jdn, ...date, yearLeap };

      expect(expected).toEqual(actual);
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.day).toBe(actual.getDay());
    });
  });

  it ('should determine whether a Samaritan year is leap year', () => {
    [5700, 5703, 5705, 5708, 5711, 5713, 5716, 5719, 5722, 5724, 5727, 5730].forEach(year => {
       expect(cal.isLeapYear(year)).toBe(true);
     });

    [5701, 5702, 5704, 5706, 5707, 5709, 5710, 5712, 5714, 5715, 5717, 5718].forEach(year => {
      expect(cal.isLeapYear(year)).toBe(false);
    });
  });

  it ('should throw validation exceptions', () => {
    expect(() => cal.toJdn(5000, 0, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(5000, -2, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(5000, 15, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(5000, 7, -5)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(5000, 7, 32)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(5000, 2, 30)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(5000, 12, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(5000, 12, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(5001, 12, 30)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(5102, 8, 30)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(5113, 9, 30)).toThrow(INVALID_DAY);
  });
});
