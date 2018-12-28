import { INVALID_COUNT, INVALID_LEAP_DAY, INVALID_MONTH, Month, RomanEvent } from '../../Const';
import { RomanCalendar as cal } from '../../calendar/RomanCalendar';

const dates = [
  { jdn: 1507233.5, date: { year: -587, month:  8, event: RomanEvent.KALENDS, count:  1, leap: false } },
  { jdn: 1507231.5, rataDie: -214192, date: { year: -587, month:  8, event: RomanEvent.KALENDS, count:  3, leap: false } },
  { jdn: 1660037.5, rataDie:  -61387, date: { year: -169, month: 12, event: RomanEvent.IDES,    count:  6, leap: false } },
  { jdn: 1722572.5, date: { year:    4, month:  3, event: RomanEvent.KALENDS, count:  6, leap: false } },
  { jdn: 1722573.5, date: { year:    4, month:  3, event: RomanEvent.KALENDS, count:  6, leap: true  } },
  { jdn: 1746893.5, rataDie:   25469, date: { year:   70, month: 10, event: RomanEvent.KALENDS, count:  6, leap: false } },
  { jdn: 1770641.5, rataDie:   49217, date: { year:  135, month: 10, event: RomanEvent.NONES,   count:  5, leap: false } },
  { jdn: 1892731.5, rataDie:  171307, date: { year:  470, month:  1, event: RomanEvent.IDES,    count:  7, leap: false } },
  { jdn: 1931579.5, rataDie:  210155, date: { year:  576, month:  6, event: RomanEvent.KALENDS, count: 15, leap: false } },
  { jdn: 1974851.5, rataDie:  253427, date: { year:  694, month: 11, event: RomanEvent.IDES,    count:  7, leap: false } },
  { jdn: 2091164.5, rataDie:  369740, date: { year: 1013, month:  5, event: RomanEvent.KALENDS, count: 13, leap: false } },
  { jdn: 2121509.5, rataDie:  400085, date: { year: 1096, month:  6, event: RomanEvent.KALENDS, count: 15, leap: false } },
  { jdn: 2155779.5, rataDie:  434355, date: { year: 1190, month:  4, event: RomanEvent.KALENDS, count: 17, leap: false } },
  { jdn: 2174029.5, rataDie:  452605, date: { year: 1240, month:  3, event: RomanEvent.NONES,   count:  5, leap: false } },
  { jdn: 2191584.5, rataDie:  470160, date: { year: 1288, month:  4, event: RomanEvent.KALENDS, count:  7, leap: false } },
  { jdn: 2195261.5, rataDie:  473837, date: { year: 1298, month:  5, event: RomanEvent.KALENDS, count: 12, leap: false } },
  { jdn: 2229274.5, rataDie:  507850, date: { year: 1391, month:  6, event: RomanEvent.NONES,   count:  2, leap: false } },
  { jdn: 2245580.5, rataDie:  524156, date: { year: 1436, month:  2, event: RomanEvent.KALENDS, count:  8, leap: false } },
  { jdn: 2266100.5, rataDie:  544676, date: { year: 1492, month:  4, event: RomanEvent.KALENDS, count:  2, leap: false } },
  { jdn: 2288542.5, rataDie:  567118, date: { year: 1553, month:  9, event: RomanEvent.IDES,    count:  5, leap: false } },
  { jdn: 2290901.5, rataDie:  569477, date: { year: 1560, month:  3, event: RomanEvent.KALENDS, count:  6, leap: false } },
  { jdn: 2323140.5, rataDie:  601716, date: { year: 1648, month:  6, event: RomanEvent.KALENDS, count:  2, leap: false } },
  { jdn: 2334848.5, rataDie:  613424, date: { year: 1680, month:  7, event: RomanEvent.KALENDS, count: 12, leap: false } },
  { jdn: 2348020.5, rataDie:  626596, date: { year: 1716, month:  7, event: RomanEvent.IDES,    count:  3, leap: false } },
  { jdn: 2366978.5, rataDie:  645554, date: { year: 1768, month:  6, event: RomanEvent.IDES,    count:  6, leap: false } },
  { jdn: 2385648.5, rataDie:  664224, date: { year: 1819, month:  8, event: RomanEvent.KALENDS, count: 12, leap: false } },
  { jdn: 2392825.5, rataDie:  671401, date: { year: 1839, month:  3, event: RomanEvent.IDES,    count:  1, leap: false } },
  { jdn: 2416223.5, rataDie:  694799, date: { year: 1903, month:  4, event: RomanEvent.IDES,    count:  8, leap: false } },
  { jdn: 2425848.5, rataDie:  704424, date: { year: 1929, month:  8, event: RomanEvent.IDES,    count:  2, leap: false } },
  { jdn: 2430266.5, rataDie:  708842, date: { year: 1941, month: 10, event: RomanEvent.KALENDS, count: 16, leap: false } },
  { jdn: 2430833.5, rataDie:  709409, date: { year: 1943, month:  4, event: RomanEvent.IDES,    count:  8, leap: false } },
  { jdn: 2431004.5, rataDie:  709580, date: { year: 1943, month: 10, event: RomanEvent.KALENDS, count:  8, leap: false } },
  { jdn: 2448698.5, rataDie:  727274, date: { year: 1992, month:  3, event: RomanEvent.NONES,   count:  4, leap: false } },
  { jdn: 2450138.5, rataDie:  728714, date: { year: 1996, month:  2, event: RomanEvent.IDES,    count:  2, leap: false } },
  { jdn: 2465737.5, rataDie:  744313, date: { year: 2038, month: 11, event: RomanEvent.KALENDS, count:  5, leap: false } },
  { jdn: 2486076.5, rataDie:  764652, date: { year: 2094, month:  7, event: RomanEvent.NONES,   count:  3, leap: false } },
];

describe ('Roman calendar spec', () => {
  it ('should convert a Roman date to Julian day number (JDN)', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.event, date.count, date.leap);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day number (JDN) to a Roman date', () => {
    dates.forEach (({ jdn, date }) => {
      const expected = { jdn, day: -1, ...date };
      const actual   = cal.fromJdn (jdn);

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.event).toBe (actual.getEvent());
      expect (expected.count).toBe (actual.getCount());
      expect (expected.leap).toBe (actual.isLeap());
    });
  });

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (1,            0, RomanEvent.KALENDS,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,            0, RomanEvent.NONES,    1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,            0, RomanEvent.IDES,     1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,           13, RomanEvent.KALENDS,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,           13, RomanEvent.NONES,    1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,           13, RomanEvent.IDES,     1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,  Month.MARCH, RomanEvent.KALENDS,  0, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  Month.MARCH, RomanEvent.KALENDS, 19, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  Month.MARCH, RomanEvent.NONES,    0, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  Month.MARCH, RomanEvent.NONES,    7, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  Month.MARCH, RomanEvent.IDES,     0, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  Month.MARCH, RomanEvent.IDES,     9, false)).toThrow (INVALID_COUNT);
    expect (() => cal.toJdn (1,  Month.MARCH, RomanEvent.KALENDS,  6, true )).toThrow (INVALID_LEAP_DAY);
    expect (() => cal.toJdn (1,  Month.MARCH, RomanEvent.NONES,    6, true )).toThrow (INVALID_LEAP_DAY);
    expect (() => cal.toJdn (1,  Month.MARCH, RomanEvent.IDES,     6, true )).toThrow (INVALID_LEAP_DAY);

    expect (() => cal.toJdn (4,  Month.MARCH, RomanEvent.KALENDS,  6, false)).not.toThrow (INVALID_LEAP_DAY);
    expect (() => cal.toJdn (4,  Month.MARCH, RomanEvent.KALENDS,  6, true )).not.toThrow (INVALID_LEAP_DAY);
    expect (() => cal.toJdn (4,  Month.MARCH, RomanEvent.NONES,    6, true )).toThrow (INVALID_LEAP_DAY);
    expect (() => cal.toJdn (4,  Month.MARCH, RomanEvent.IDES,     6, true )).toThrow (INVALID_LEAP_DAY);
  });
});
