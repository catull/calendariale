import { INVALID_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, INVALID_YEAR, J0000 } from '../../Const';

import { ChineseCalendar as cal } from '../../calendar/ChineseCalendar';

const dates = [
  { rataDie: -214193, date: { cycle: 35, year: 11, month:  6, monthLeap: false, day: 12 } },
  { rataDie:  -61387, date: { cycle: 42, year:  9, month: 10, monthLeap: false, day: 27 } },
  { rataDie:   25469, date: { cycle: 46, year:  7, month:  8, monthLeap: false, day:  4 } },
  { rataDie:   49217, date: { cycle: 47, year: 12, month:  8, monthLeap: false, day:  9 } },
  { rataDie:  171307, date: { cycle: 52, year: 46, month: 11, monthLeap: false, day: 20 } },
  { rataDie:  210155, date: { cycle: 54, year: 33, month:  4, monthLeap: false, day:  5 } },
  { rataDie:  253427, date: { cycle: 56, year: 31, month: 10, monthLeap: false, day: 15 } },
  { rataDie:  369740, date: { cycle: 61, year: 50, month:  3, monthLeap: false, day:  7 } },
  { rataDie:  400085, date: { cycle: 63, year: 13, month:  4, monthLeap: false, day: 24 } },
  { rataDie:  434355, date: { cycle: 64, year: 47, month:  2, monthLeap: false, day:  9 } },
  { rataDie:  452605, date: { cycle: 65, year: 37, month:  2, monthLeap: false, day:  9 } },
  { rataDie:  470160, date: { cycle: 66, year: 25, month:  2, monthLeap: false, day: 23 } },
  { rataDie:  473837, date: { cycle: 66, year: 35, month:  3, monthLeap: false, day:  9 } },
  { rataDie:  507850, date: { cycle: 68, year:  8, month:  5, monthLeap: false, day:  2 } },
  { rataDie:  524156, date: { cycle: 68, year: 53, month:  1, monthLeap: false, day:  8 } },
  { rataDie:  544676, date: { cycle: 69, year: 49, month:  3, monthLeap: false, day:  4 } },
  { rataDie:  567118, date: { cycle: 70, year: 50, month:  8, monthLeap: false, day:  2 } },
  { rataDie:  569477, date: { cycle: 70, year: 57, month:  1, monthLeap: false, day: 29 } },
  { rataDie:  601716, date: { cycle: 72, year: 25, month:  4, monthLeap: true,  day: 20 } },
  { rataDie:  613424, date: { cycle: 72, year: 57, month:  6, monthLeap: false, day:  5 } },
  { rataDie:  626596, date: { cycle: 73, year: 33, month:  6, monthLeap: false, day:  6 } },
  { rataDie:  645554, date: { cycle: 74, year: 25, month:  5, monthLeap: false, day:  5 } },
  { rataDie:  664224, date: { cycle: 75, year: 16, month:  6, monthLeap: false, day: 12 } },
  { rataDie:  671401, date: { cycle: 75, year: 36, month:  2, monthLeap: false, day: 13 } },
  { rataDie:  694799, date: { cycle: 76, year: 40, month:  3, monthLeap: false, day: 22 } },
  { rataDie:  704424, date: { cycle: 77, year:  6, month:  7, monthLeap: false, day: 21 } },
  { rataDie:  708842, date: { cycle: 77, year: 18, month:  8, monthLeap: false, day:  9 } },
  { rataDie:  709409, date: { cycle: 77, year: 20, month:  3, monthLeap: false, day: 15 } },
  { rataDie:  709580, date: { cycle: 77, year: 20, month:  9, monthLeap: false, day:  9 } },
  { rataDie:  727274, date: { cycle: 78, year:  9, month:  2, monthLeap: false, day: 14 } },
  { rataDie:  728714, date: { cycle: 78, year: 13, month:  1, monthLeap: false, day:  7 } },
  { rataDie:  744313, date: { cycle: 78, year: 55, month: 10, monthLeap: false, day: 14 } },
  { rataDie:  764652, date: { cycle: 79, year: 51, month:  6, monthLeap: false, day:  7 } },
];

describe ('Chinese calendar spec', () => {
  it ('should convert a Chinese date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      const actual = cal.toJdn (date.cycle, date.year, date.month, date.monthLeap, date.day);
      expect (jdn).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Chinese date', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn      = rataDie + J0000;
      const expected = { jdn, ...date };
      const actual   = cal.fromJdn (jdn);

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
