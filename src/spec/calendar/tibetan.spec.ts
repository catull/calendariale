/* global describe it: true */
import { INVALID_DAY, INVALID_LEAP_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, J0000 } from '../../Const';

import { TibetanCalendarDate as cal } from '../../calendar/TibetanCalendarDate';

const data4 = [
  { 'rataDie': -214193, 'tibetan': { 'year': -459, 'month':  8, 'monthLeap': false, 'day': 11, 'dayLeap': false } },
  { 'rataDie':  -61387, 'tibetan': { 'year':  -41, 'month': 12, 'monthLeap': false, 'day': 27, 'dayLeap': false } },
  { 'rataDie':   25469, 'tibetan': { 'year':  197, 'month': 10, 'monthLeap': false, 'day':  3, 'dayLeap': false } },
  { 'rataDie':   49217, 'tibetan': { 'year':  262, 'month': 10, 'monthLeap': false, 'day':  9, 'dayLeap': false } },
  { 'rataDie':  171307, 'tibetan': { 'year':  596, 'month': 12, 'monthLeap': false, 'day': 19, 'dayLeap': false } },
  { 'rataDie':  210155, 'tibetan': { 'year':  703, 'month':  5, 'monthLeap': false, 'day':  4, 'dayLeap': false } },
  { 'rataDie':  253427, 'tibetan': { 'year':  821, 'month': 10, 'monthLeap': false, 'day': 15, 'dayLeap': false } },
  { 'rataDie':  369740, 'tibetan': { 'year': 1140, 'month':  4, 'monthLeap': false, 'day':  6, 'dayLeap': false } },
  { 'rataDie':  400085, 'tibetan': { 'year': 1223, 'month':  4, 'monthLeap': false, 'day': 23, 'dayLeap': false } },
  { 'rataDie':  434355, 'tibetan': { 'year': 1317, 'month':  3, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  452605, 'tibetan': { 'year': 1367, 'month':  2, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  470160, 'tibetan': { 'year': 1415, 'month':  2, 'monthLeap': false, 'day': 22, 'dayLeap': false } },
  { 'rataDie':  473837, 'tibetan': { 'year': 1425, 'month':  4, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  507850, 'tibetan': { 'year': 1518, 'month':  5, 'monthLeap': false, 'day':  1, 'dayLeap': false } },
  { 'rataDie':  524156, 'tibetan': { 'year': 1563, 'month':  1, 'monthLeap': false, 'day':  7, 'dayLeap': false } },
  { 'rataDie':  544676, 'tibetan': { 'year': 1619, 'month':  3, 'monthLeap': false, 'day':  3, 'dayLeap': false } },
  { 'rataDie':  567118, 'tibetan': { 'year': 1680, 'month':  8, 'monthLeap': false, 'day':  2, 'dayLeap': false } },
  { 'rataDie':  569477, 'tibetan': { 'year': 1687, 'month':  1, 'monthLeap': false, 'day': 29, 'dayLeap': false } },
  { 'rataDie':  601716, 'tibetan': { 'year': 1775, 'month':  4, 'monthLeap': false, 'day': 20, 'dayLeap': false } },
  { 'rataDie':  613424, 'tibetan': { 'year': 1807, 'month':  6, 'monthLeap': true,  'day':  4, 'dayLeap': false } },
  { 'rataDie':  626596, 'tibetan': { 'year': 1843, 'month':  6, 'monthLeap': false, 'day':  6, 'dayLeap': false } },
  { 'rataDie':  645554, 'tibetan': { 'year': 1895, 'month':  5, 'monthLeap': false, 'day':  5, 'dayLeap': false } },
  { 'rataDie':  664224, 'tibetan': { 'year': 1946, 'month':  6, 'monthLeap': false, 'day': 11, 'dayLeap': false } },
  { 'rataDie':  671401, 'tibetan': { 'year': 1966, 'month':  2, 'monthLeap': false, 'day': 13, 'dayLeap': false } },
  { 'rataDie':  694799, 'tibetan': { 'year': 2030, 'month':  2, 'monthLeap': false, 'day': 22, 'dayLeap': false } },
  { 'rataDie':  704424, 'tibetan': { 'year': 2056, 'month':  7, 'monthLeap': false, 'day': 20, 'dayLeap': false } },
  { 'rataDie':  708842, 'tibetan': { 'year': 2068, 'month':  8, 'monthLeap': false, 'day':  9, 'dayLeap': false } },
  { 'rataDie':  709409, 'tibetan': { 'year': 2070, 'month':  3, 'monthLeap': true,  'day': 14, 'dayLeap': false } },
  { 'rataDie':  709580, 'tibetan': { 'year': 2070, 'month':  8, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  727274, 'tibetan': { 'year': 2119, 'month':  1, 'monthLeap': false, 'day': 14, 'dayLeap': false } },
  { 'rataDie':  728714, 'tibetan': { 'year': 2123, 'month':  1, 'monthLeap': false, 'day':  7, 'dayLeap': false } },
  { 'rataDie':  744313, 'tibetan': { 'year': 2165, 'month':  9, 'monthLeap': false, 'day': 14, 'dayLeap': false } },
  { 'rataDie':  764652, 'tibetan': { 'year': 2221, 'month':  6, 'monthLeap': false, 'day':  6, 'dayLeap': false } }
];

describe ('Tibetan calendar spec', () => {
  let date;
  let expected;
  let actual;
  let julian;

  it ('should convert a Tibetan date to Julian day', () => {
    data4.forEach (dt => {
      julian = dt.rataDie + J0000;
      date   = dt.tibetan;
      actual = cal.toJdn (date.year, date.month, date.monthLeap, date.day, date.dayLeap);
      expect (julian).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Tibetan date', () => {
    data4.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.tibetan;
      // expected = { 'jdn': julian, 'year': date.year, 'month': date.month, 'monthLeap': date.monthLeap, 'day': date.day, 'dayLeap': date.dayLeap };
      expected = { 'jdn': julian, ...date };
      actual   = cal.fromJdn (julian);

      expect (expected).toEqual (actual);
      // expect (expected.year).toBe (actual.year);
      // expect (expected.month).toBe (actual.month);
      // expect (expected.monthLeap).toBe (actual.monthLeap);
      // expect (expected.day).toBe (actual.day);
      // expect (expected.dayLeap).toBe (actual.dayLeap);
    });
  });

  it ('should establish whether a Tibetan month is leap', () => {
    data4.forEach (dt => {
      date     = dt.tibetan;
      expected = date.monthLeap;
      actual   = cal.isLeapMonth (date.year, date.month);

      expect (expected).toBe (actual);
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
