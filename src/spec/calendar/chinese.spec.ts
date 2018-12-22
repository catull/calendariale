import { INVALID_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, INVALID_YEAR, J0000 } from '../../Const';
import { ChineseCalendar as cal } from '../../calendar/ChineseCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { cycle: 35, year: 11, month:  6, monthLeap: false, day: 12 } },
  { jdn:  -61387 + J0000, date: { cycle: 42, year:  9, month: 10, monthLeap: false, day: 27 } },
  { jdn:   25469 + J0000, date: { cycle: 46, year:  7, month:  8, monthLeap: false, day:  4 } },
  { jdn:   49217 + J0000, date: { cycle: 47, year: 12, month:  8, monthLeap: false, day:  9 } },
  { jdn:  171307 + J0000, date: { cycle: 52, year: 46, month: 11, monthLeap: false, day: 20 } },
  { jdn:  210155 + J0000, date: { cycle: 54, year: 33, month:  4, monthLeap: false, day:  5 } },
  { jdn:  253427 + J0000, date: { cycle: 56, year: 31, month: 10, monthLeap: false, day: 15 } },
  { jdn:  369740 + J0000, date: { cycle: 61, year: 50, month:  3, monthLeap: false, day:  7 } },
  { jdn:  400085 + J0000, date: { cycle: 63, year: 13, month:  4, monthLeap: false, day: 24 } },
  { jdn:  434355 + J0000, date: { cycle: 64, year: 47, month:  2, monthLeap: false, day:  9 } },
  { jdn:  452605 + J0000, date: { cycle: 65, year: 37, month:  2, monthLeap: false, day:  9 } },
  { jdn:  470160 + J0000, date: { cycle: 66, year: 25, month:  2, monthLeap: false, day: 23 } },
  { jdn:  473837 + J0000, date: { cycle: 66, year: 35, month:  3, monthLeap: false, day:  9 } },
  { jdn:  507850 + J0000, date: { cycle: 68, year:  8, month:  5, monthLeap: false, day:  2 } },
  { jdn:  524156 + J0000, date: { cycle: 68, year: 53, month:  1, monthLeap: false, day:  8 } },
  { jdn:  544676 + J0000, date: { cycle: 69, year: 49, month:  3, monthLeap: false, day:  4 } },
  { jdn:  567118 + J0000, date: { cycle: 70, year: 50, month:  8, monthLeap: false, day:  2 } },
  { jdn:  569477 + J0000, date: { cycle: 70, year: 57, month:  1, monthLeap: false, day: 29 } },
  { jdn:  601716 + J0000, date: { cycle: 72, year: 25, month:  4, monthLeap: true,  day: 20 } },
  { jdn:  613424 + J0000, date: { cycle: 72, year: 57, month:  6, monthLeap: false, day:  5 } },
  { jdn:  626596 + J0000, date: { cycle: 73, year: 33, month:  6, monthLeap: false, day:  6 } },
  { jdn:  645554 + J0000, date: { cycle: 74, year: 25, month:  5, monthLeap: false, day:  5 } },
  { jdn:  664224 + J0000, date: { cycle: 75, year: 16, month:  6, monthLeap: false, day: 12 } },
  { jdn:  671401 + J0000, date: { cycle: 75, year: 36, month:  2, monthLeap: false, day: 13 } },
  { jdn:  694799 + J0000, date: { cycle: 76, year: 40, month:  3, monthLeap: false, day: 22 } },
  { jdn:  704424 + J0000, date: { cycle: 77, year:  6, month:  7, monthLeap: false, day: 21 } },
  { jdn:  708842 + J0000, date: { cycle: 77, year: 18, month:  8, monthLeap: false, day:  9 } },
  { jdn:  709409 + J0000, date: { cycle: 77, year: 20, month:  3, monthLeap: false, day: 15 } },
  { jdn:  709580 + J0000, date: { cycle: 77, year: 20, month:  9, monthLeap: false, day:  9 } },
  { jdn:  727274 + J0000, date: { cycle: 78, year:  9, month:  2, monthLeap: false, day: 14 } },
  { jdn:  728714 + J0000, date: { cycle: 78, year: 13, month:  1, monthLeap: false, day:  7 } },
  { jdn:  744313 + J0000, date: { cycle: 78, year: 55, month: 10, monthLeap: false, day: 14 } },
  { jdn:  764652 + J0000, date: { cycle: 79, year: 51, month:  6, monthLeap: false, day:  7 } },
];

describe ('Chinese calendar spec', () => {
  it ('should convert a Chinese date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.cycle, date.year, date.month, date.monthLeap, date.day);
      expect (jdn).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Chinese date', () => {
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
