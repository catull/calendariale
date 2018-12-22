import { INVALID_DAY, INVALID_LEAP_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, J0000 } from '../../Const';
import { TibetanCalendar as cal } from '../../calendar/TibetanCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { year: -459, month:  8, monthLeap: false, day: 11, dayLeap: false } },
  { jdn:  -61387 + J0000, date: { year:  -41, month: 12, monthLeap: false, day: 27, dayLeap: false } },
  { jdn:   25469 + J0000, date: { year:  197, month: 10, monthLeap: false, day:  3, dayLeap: false } },
  { jdn:   49217 + J0000, date: { year:  262, month: 10, monthLeap: false, day:  9, dayLeap: false } },
  { jdn:  171307 + J0000, date: { year:  596, month: 12, monthLeap: false, day: 19, dayLeap: false } },
  { jdn:  210155 + J0000, date: { year:  703, month:  5, monthLeap: false, day:  4, dayLeap: false } },
  { jdn:  253427 + J0000, date: { year:  821, month: 10, monthLeap: false, day: 15, dayLeap: false } },
  { jdn:  369740 + J0000, date: { year: 1140, month:  4, monthLeap: false, day:  6, dayLeap: false } },
  { jdn:  400085 + J0000, date: { year: 1223, month:  4, monthLeap: false, day: 23, dayLeap: false } },
  { jdn:  434355 + J0000, date: { year: 1317, month:  3, monthLeap: false, day:  8, dayLeap: false } },
  { jdn:  452605 + J0000, date: { year: 1367, month:  2, monthLeap: false, day:  8, dayLeap: false } },
  { jdn:  470160 + J0000, date: { year: 1415, month:  2, monthLeap: false, day: 22, dayLeap: false } },
  { jdn:  473837 + J0000, date: { year: 1425, month:  4, monthLeap: false, day:  8, dayLeap: false } },
  { jdn:  507850 + J0000, date: { year: 1518, month:  5, monthLeap: false, day:  1, dayLeap: false } },
  { jdn:  524156 + J0000, date: { year: 1563, month:  1, monthLeap: false, day:  7, dayLeap: false } },
  { jdn:  544676 + J0000, date: { year: 1619, month:  3, monthLeap: false, day:  3, dayLeap: false } },
  { jdn:  567118 + J0000, date: { year: 1680, month:  8, monthLeap: false, day:  2, dayLeap: false } },
  { jdn:  569477 + J0000, date: { year: 1687, month:  1, monthLeap: false, day: 29, dayLeap: false } },
  { jdn:  601716 + J0000, date: { year: 1775, month:  4, monthLeap: false, day: 20, dayLeap: false } },
  { jdn:  613424 + J0000, date: { year: 1807, month:  6, monthLeap: true,  day:  4, dayLeap: false } },
  { jdn:  626596 + J0000, date: { year: 1843, month:  6, monthLeap: false, day:  6, dayLeap: false } },
  { jdn:  645554 + J0000, date: { year: 1895, month:  5, monthLeap: false, day:  5, dayLeap: false } },
  { jdn:  664224 + J0000, date: { year: 1946, month:  6, monthLeap: false, day: 11, dayLeap: false } },
  { jdn:  671401 + J0000, date: { year: 1966, month:  2, monthLeap: false, day: 13, dayLeap: false } },
  { jdn:  694799 + J0000, date: { year: 2030, month:  2, monthLeap: false, day: 22, dayLeap: false } },
  { jdn:  704424 + J0000, date: { year: 2056, month:  7, monthLeap: false, day: 20, dayLeap: false } },
  { jdn:  708842 + J0000, date: { year: 2068, month:  8, monthLeap: false, day:  9, dayLeap: false } },
  { jdn:  709409 + J0000, date: { year: 2070, month:  3, monthLeap: true,  day: 14, dayLeap: false } },
  { jdn:  709580 + J0000, date: { year: 2070, month:  8, monthLeap: false, day:  8, dayLeap: false } },
  { jdn:  727274 + J0000, date: { year: 2119, month:  1, monthLeap: false, day: 14, dayLeap: false } },
  { jdn:  728714 + J0000, date: { year: 2123, month:  1, monthLeap: false, day:  7, dayLeap: false } },
  { jdn:  744313 + J0000, date: { year: 2165, month:  9, monthLeap: false, day: 14, dayLeap: false } },
  { jdn:  764652 + J0000, date: { year: 2221, month:  6, monthLeap: false, day:  6, dayLeap: false } },
];

describe ('Tibetan calendar spec', () => {
  it ('should convert a Tibetan date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.monthLeap, date.day, date.dayLeap);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Tibetan date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
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
    dates.forEach (({ jdn, date }) => {
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
