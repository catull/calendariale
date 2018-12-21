import { INVALID_DAY, INVALID_LEAP_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, J0000 } from '../../Const';

import { TibetanCalendar as cal } from '../../calendar/TibetanCalendar';
import { TibetanDate } from '../../calendar/TibetanDate';

const dates = [
  { rataDie: -214193, date: { year: -459, month:  8, monthLeap: false, day: 11, dayLeap: false } },
  { rataDie:  -61387, date: { year:  -41, month: 12, monthLeap: false, day: 27, dayLeap: false } },
  { rataDie:   25469, date: { year:  197, month: 10, monthLeap: false, day:  3, dayLeap: false } },
  { rataDie:   49217, date: { year:  262, month: 10, monthLeap: false, day:  9, dayLeap: false } },
  { rataDie:  171307, date: { year:  596, month: 12, monthLeap: false, day: 19, dayLeap: false } },
  { rataDie:  210155, date: { year:  703, month:  5, monthLeap: false, day:  4, dayLeap: false } },
  { rataDie:  253427, date: { year:  821, month: 10, monthLeap: false, day: 15, dayLeap: false } },
  { rataDie:  369740, date: { year: 1140, month:  4, monthLeap: false, day:  6, dayLeap: false } },
  { rataDie:  400085, date: { year: 1223, month:  4, monthLeap: false, day: 23, dayLeap: false } },
  { rataDie:  434355, date: { year: 1317, month:  3, monthLeap: false, day:  8, dayLeap: false } },
  { rataDie:  452605, date: { year: 1367, month:  2, monthLeap: false, day:  8, dayLeap: false } },
  { rataDie:  470160, date: { year: 1415, month:  2, monthLeap: false, day: 22, dayLeap: false } },
  { rataDie:  473837, date: { year: 1425, month:  4, monthLeap: false, day:  8, dayLeap: false } },
  { rataDie:  507850, date: { year: 1518, month:  5, monthLeap: false, day:  1, dayLeap: false } },
  { rataDie:  524156, date: { year: 1563, month:  1, monthLeap: false, day:  7, dayLeap: false } },
  { rataDie:  544676, date: { year: 1619, month:  3, monthLeap: false, day:  3, dayLeap: false } },
  { rataDie:  567118, date: { year: 1680, month:  8, monthLeap: false, day:  2, dayLeap: false } },
  { rataDie:  569477, date: { year: 1687, month:  1, monthLeap: false, day: 29, dayLeap: false } },
  { rataDie:  601716, date: { year: 1775, month:  4, monthLeap: false, day: 20, dayLeap: false } },
  { rataDie:  613424, date: { year: 1807, month:  6, monthLeap: true,  day:  4, dayLeap: false } },
  { rataDie:  626596, date: { year: 1843, month:  6, monthLeap: false, day:  6, dayLeap: false } },
  { rataDie:  645554, date: { year: 1895, month:  5, monthLeap: false, day:  5, dayLeap: false } },
  { rataDie:  664224, date: { year: 1946, month:  6, monthLeap: false, day: 11, dayLeap: false } },
  { rataDie:  671401, date: { year: 1966, month:  2, monthLeap: false, day: 13, dayLeap: false } },
  { rataDie:  694799, date: { year: 2030, month:  2, monthLeap: false, day: 22, dayLeap: false } },
  { rataDie:  704424, date: { year: 2056, month:  7, monthLeap: false, day: 20, dayLeap: false } },
  { rataDie:  708842, date: { year: 2068, month:  8, monthLeap: false, day:  9, dayLeap: false } },
  { rataDie:  709409, date: { year: 2070, month:  3, monthLeap: true,  day: 14, dayLeap: false } },
  { rataDie:  709580, date: { year: 2070, month:  8, monthLeap: false, day:  8, dayLeap: false } },
  { rataDie:  727274, date: { year: 2119, month:  1, monthLeap: false, day: 14, dayLeap: false } },
  { rataDie:  728714, date: { year: 2123, month:  1, monthLeap: false, day:  7, dayLeap: false } },
  { rataDie:  744313, date: { year: 2165, month:  9, monthLeap: false, day: 14, dayLeap: false } },
  { rataDie:  764652, date: { year: 2221, month:  6, monthLeap: false, day:  6, dayLeap: false } },
];

describe ('Tibetan calendar spec', () => {
  it ('should convert a Tibetan date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      const actual = cal.toJdn (date.year, date.month, date.monthLeap, date.day, date.dayLeap);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Tibetan date', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.fromRd (rataDie) as TibetanDate;
      const jdn      = actual.getJdn();
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.monthLeap).toBe (actual.isMonthLeap());
      expect (expected.day).toBe (actual.getDay());
      expect (expected.dayLeap).toBe (actual.isDayLeap());
    });
  });

  it ('should establish whether a Tibetan month is leap', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.isLeapMonth (date.year, date.month);
      const expected = date.monthLeap;

      expect (actual).toBe (expected);
    });
  });

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (2143,  0, false,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (2143, 14, false,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (2143,  9, true ,  1, false)).toThrow (INVALID_LEAP_MONTH);
    expect (() => cal.toJdn (2143,  4, false,  0, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (2143,  4, false, 31, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (2143,  4, false,  2, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (2143,  3, false, 29, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (2143,  6, false, 17, true )).toThrow (INVALID_LEAP_DAY);
  });
});
