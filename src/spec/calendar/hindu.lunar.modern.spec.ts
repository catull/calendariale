import { INVALID_DAY, INVALID_LEAP_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, J0000 } from '../../Const';

import { HinduLunarModernCalendar as cal } from '../../calendar/HinduLunarModernCalendar';

const dates = [
  { rataDie: -214193, date: { year: -529, month:  6, monthLeap: false, day: 11, dayLeap: false } },
  { rataDie:  -61387, date: { year: -111, month:  9, monthLeap: false, day: 27, dayLeap: false } },
  { rataDie:   25469, date: { year:  127, month:  8, monthLeap: false, day:  3, dayLeap: false } },
  { rataDie:   49217, date: { year:  192, month:  8, monthLeap: false, day:  9, dayLeap: false } },
  { rataDie:  171307, date: { year:  526, month: 11, monthLeap: false, day: 19, dayLeap: false } },
  { rataDie:  210155, date: { year:  633, month:  3, monthLeap: false, day:  5, dayLeap: false } },
  { rataDie:  253427, date: { year:  751, month:  9, monthLeap: false, day: 15, dayLeap: false } },
  { rataDie:  369740, date: { year: 1070, month:  2, monthLeap: false, day:  6, dayLeap: false } },
  { rataDie:  400085, date: { year: 1153, month:  3, monthLeap: true,  day: 23, dayLeap: false } },
  { rataDie:  434355, date: { year: 1247, month:  1, monthLeap: false, day:  8, dayLeap: false } },
  { rataDie:  452605, date: { year: 1297, month:  1, monthLeap: false, day:  8, dayLeap: false } },
  { rataDie:  470160, date: { year: 1345, month:  1, monthLeap: false, day: 22, dayLeap: false } },
  { rataDie:  473837, date: { year: 1355, month:  2, monthLeap: false, day:  8, dayLeap: false } },
  { rataDie:  507850, date: { year: 1448, month:  4, monthLeap: false, day:  1, dayLeap: false } },
  { rataDie:  524156, date: { year: 1492, month: 11, monthLeap: false, day:  7, dayLeap: false } },
  { rataDie:  544676, date: { year: 1549, month:  2, monthLeap: true,  day:  3, dayLeap: false } },
  { rataDie:  567118, date: { year: 1610, month:  7, monthLeap: false, day:  2, dayLeap: false } },
  { rataDie:  569477, date: { year: 1616, month: 11, monthLeap: false, day: 28, dayLeap: true  } },
  { rataDie:  601716, date: { year: 1705, month:  3, monthLeap: false, day: 20, dayLeap: false } },
  { rataDie:  613424, date: { year: 1737, month:  4, monthLeap: false, day:  4, dayLeap: false } },
  { rataDie:  626596, date: { year: 1773, month:  5, monthLeap: false, day:  6, dayLeap: false } },
  { rataDie:  645554, date: { year: 1825, month:  4, monthLeap: false, day:  5, dayLeap: false } },
  { rataDie:  664224, date: { year: 1876, month:  5, monthLeap: false, day: 11, dayLeap: false } },
  { rataDie:  671401, date: { year: 1896, month:  1, monthLeap: false, day: 13, dayLeap: false } },
  { rataDie:  694799, date: { year: 1960, month:  1, monthLeap: false, day: 22, dayLeap: false } },
  { rataDie:  704424, date: { year: 1986, month:  5, monthLeap: false, day: 20, dayLeap: false } },
  { rataDie:  708842, date: { year: 1998, month:  7, monthLeap: false, day:  9, dayLeap: false } },
  { rataDie:  709409, date: { year: 2000, month:  1, monthLeap: false, day: 14, dayLeap: false } },
  { rataDie:  709580, date: { year: 2000, month:  7, monthLeap: false, day:  8, dayLeap: false } },
  { rataDie:  727274, date: { year: 2048, month: 12, monthLeap: false, day: 14, dayLeap: false } },
  { rataDie:  728714, date: { year: 2052, month: 12, monthLeap: false, day:  7, dayLeap: false } },
  { rataDie:  744313, date: { year: 2095, month:  8, monthLeap: false, day: 14, dayLeap: false } },
  { rataDie:  764652, date: { year: 2151, month:  4, monthLeap: false, day:  6, dayLeap: false } }
];

describe ('Hindu Lunar Modern calendar spec', () => {
  it ('should convert a Hindu Lunar Modern date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      const actual = cal.toJdn (date.year, date.month, date.monthLeap, date.day, date.dayLeap);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hindu Lunar Modern date', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn      = rataDie + J0000;
      const expected = { jdn, ...date };
      const actual   = cal.fromJdn (jdn);

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.monthLeap).toBe (actual.isMonthLeap());
      expect (expected.day).toBe (actual.getDay());
      expect (expected.dayLeap).toBe (actual.isDayLeap());
    });
  });

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (1549,  0, false,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1549, 13, false,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1549,  2, true ,  3, false)).not.toThrow ();
    expect (() => cal.toJdn (1549,  9, true ,  1, false)).toThrow (INVALID_LEAP_MONTH);
    expect (() => cal.toJdn (1549,  4, false,  0, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1549,  4, false, 31, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1549,  6, false, 17, true )).toThrow (INVALID_LEAP_DAY);
  });
});
