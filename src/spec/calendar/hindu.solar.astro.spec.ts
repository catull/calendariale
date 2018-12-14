import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';

import { HinduSolarAstroCalendar as cal } from '../../calendar/HinduSolarAstroCalendar';

const dates = [
  { rataDie: -214193, date: { year: -664, month:  5, day: 13 } },
  { rataDie:  -61387, date: { year: -246, month:  9, day: 21 } },
  { rataDie:   25469, date: { year:   -8, month:  7, day:  5 } },
  { rataDie:   49217, date: { year:   57, month:  7, day: 11 } },
  { rataDie:  171307, date: { year:  391, month: 10, day: 17 } },
  { rataDie:  210155, date: { year:  498, month:  2, day: 27 } },
  { rataDie:  253427, date: { year:  616, month:  8, day: 13 } },
  { rataDie:  369740, date: { year:  935, month:  1, day: 26 } },
  { rataDie:  400085, date: { year: 1018, month:  2, day: 24 } },
  { rataDie:  434355, date: { year: 1111, month: 12, day: 21 } },
  { rataDie:  452605, date: { year: 1161, month: 12, day:  8 } },
  { rataDie:  470160, date: { year: 1209, month: 12, day: 31 } },
  { rataDie:  473837, date: { year: 1220, month:  1, day: 25 } },
  { rataDie:  507850, date: { year: 1313, month:  3, day:  7 } },
  { rataDie:  524156, date: { year: 1357, month: 10, day: 28 } },
  { rataDie:  544676, date: { year: 1414, month:  1, day:  4 } },
  { rataDie:  567118, date: { year: 1475, month:  6, day:  9 } },
  { rataDie:  569477, date: { year: 1481, month: 11, day: 28 } },
  { rataDie:  601716, date: { year: 1570, month:  3, day:  2 } },
  { rataDie:  613424, date: { year: 1602, month:  3, day: 22 } },
  { rataDie:  626596, date: { year: 1638, month:  4, day: 13 } },
  { rataDie:  645554, date: { year: 1690, month:  3, day:  9 } },
  { rataDie:  664224, date: { year: 1741, month:  4, day: 20 } },
  { rataDie:  671401, date: { year: 1760, month: 12, day: 15 } },
  { rataDie:  694799, date: { year: 1825, month:  1, day:  7 } },
  { rataDie:  704424, date: { year: 1851, month:  5, day: 10 } },
  { rataDie:  708842, date: { year: 1863, month:  6, day: 14 } },
  { rataDie:  709409, date: { year: 1865, month:  1, day:  6 } },
  { rataDie:  709580, date: { year: 1865, month:  6, day: 21 } },
  { rataDie:  727274, date: { year: 1913, month: 12, day:  4 } },
  { rataDie:  728714, date: { year: 1917, month: 11, day: 13 } },
  { rataDie:  744313, date: { year: 1960, month:  7, day: 25 } },
  { rataDie:  764652, date: { year: 2016, month:  4, day:  2 } },
];

describe ('Hindu Solar Astro calendar spec', () => {
  it ('should convert a Hindu Solar Astro date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hindu Solar Astro date', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn      = rataDie + J0000;
      const expected = { jdn, ...date };
      const actual   = cal.fromJdn (jdn);

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1999,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  7, 32)).toThrow (INVALID_DAY);
  });
});
