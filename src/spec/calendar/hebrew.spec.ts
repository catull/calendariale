import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';

import { HebrewCalendar as cal } from '../../calendar/HebrewCalendar';
import { HebrewDate } from '../../calendar/HebrewDate';

const dates = [
  { rataDie: -214193, date: { year: 3174, month:  5, day: 10 } },
  { rataDie:  -61387, date: { year: 3593, month:  9, day: 25 } },
  { rataDie:   25469, date: { year: 3831, month:  7, day:  3 } },
  { rataDie:   49217, date: { year: 3896, month:  7, day:  9 } },
  { rataDie:  171307, date: { year: 4230, month: 10, day: 18 } },
  { rataDie:  210155, date: { year: 4336, month:  3, day:  4 } },
  { rataDie:  253427, date: { year: 4455, month:  8, day: 13 } },
  { rataDie:  369740, date: { year: 4773, month:  2, day:  6 } },
  { rataDie:  400085, date: { year: 4856, month:  2, day: 23 } },
  { rataDie:  434355, date: { year: 4950, month:  1, day:  7 } },
  { rataDie:  452605, date: { year: 5000, month: 13, day:  8 } },
  { rataDie:  470160, date: { year: 5048, month:  1, day: 21 } },
  { rataDie:  473837, date: { year: 5058, month:  2, day:  7 } },
  { rataDie:  507850, date: { year: 5151, month:  4, day:  1 } },
  { rataDie:  524156, date: { year: 5196, month: 11, day:  7 } },
  { rataDie:  544676, date: { year: 5252, month:  1, day:  3 } },
  { rataDie:  567118, date: { year: 5314, month:  7, day:  1 } },
  { rataDie:  569477, date: { year: 5320, month: 12, day: 27 } },
  { rataDie:  601716, date: { year: 5408, month:  3, day: 20 } },
  { rataDie:  613424, date: { year: 5440, month:  4, day:  3 } },
  { rataDie:  626596, date: { year: 5476, month:  5, day:  5 } },
  { rataDie:  645554, date: { year: 5528, month:  4, day:  4 } },
  { rataDie:  664224, date: { year: 5579, month:  5, day: 11 } },
  { rataDie:  671401, date: { year: 5599, month:  1, day: 12 } },
  { rataDie:  694799, date: { year: 5663, month:  1, day: 22 } },
  { rataDie:  704424, date: { year: 5689, month:  5, day: 19 } },
  { rataDie:  708842, date: { year: 5702, month:  7, day:  8 } },
  { rataDie:  709409, date: { year: 5703, month:  1, day: 14 } },
  { rataDie:  709580, date: { year: 5704, month:  7, day:  8 } },
  { rataDie:  727274, date: { year: 5752, month: 13, day: 12 } },
  { rataDie:  728714, date: { year: 5756, month: 12, day:  5 } },
  { rataDie:  744313, date: { year: 5799, month:  8, day: 12 } },
  { rataDie:  764652, date: { year: 5854, month:  5, day:  5 } },
];

describe ('Hebrew calendar spec', () => {
  it ('should convert a Hebrew date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hebrew date', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.fromRd (rataDie) as HebrewDate;
      const jdn      = rataDie + J0000;
      const yearLeap = cal.isLeapYear (date.year);
      const expected = { jdn, ...date, yearLeap };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should determine whether a Hebrew year is leap year', () => {
    [ 5700, 5703, 5706, 5708, 5711, 5714, 5717 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).toBe (true);
    });

    [ 5699, 5701, 5702, 5704, 5705, 5709, 5710 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).toBe (false);
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (5000,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (5000, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (5000, 15, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (5000,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5000,  7, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5000,  2, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5000, 12, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5000, 12, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5001, 12, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5102,  8, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5103,  9, 30)).toThrow (INVALID_DAY);
   });
});
