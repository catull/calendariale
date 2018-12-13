/* global describe it: true */
import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';

import { HinduSolarModernCalendar as cal } from '../../calendar/HinduSolarModernCalendar';

const data4 = [
  { 'rataDie': -214193, 'hinduSolarModern': { 'year': -664, 'month':  5, 'day': 19 } },
  { 'rataDie':  -61387, 'hinduSolarModern': { 'year': -246, 'month':  9, 'day': 26 } },
  { 'rataDie':   25469, 'hinduSolarModern': { 'year':   -8, 'month':  7, 'day':  9 } },
  { 'rataDie':   49217, 'hinduSolarModern': { 'year':   57, 'month':  7, 'day': 16 } },
  { 'rataDie':  171307, 'hinduSolarModern': { 'year':  391, 'month': 10, 'day': 21 } },
  { 'rataDie':  210155, 'hinduSolarModern': { 'year':  498, 'month':  2, 'day': 31 } },
  { 'rataDie':  253427, 'hinduSolarModern': { 'year':  616, 'month':  8, 'day': 16 } },
  { 'rataDie':  369740, 'hinduSolarModern': { 'year':  935, 'month':  1, 'day': 28 } },
  { 'rataDie':  400085, 'hinduSolarModern': { 'year': 1018, 'month':  2, 'day': 26 } },
  { 'rataDie':  434355, 'hinduSolarModern': { 'year': 1111, 'month': 12, 'day': 23 } },
  { 'rataDie':  452605, 'hinduSolarModern': { 'year': 1161, 'month': 12, 'day': 10 } },
  { 'rataDie':  470160, 'hinduSolarModern': { 'year': 1210, 'month':  1, 'day':  2 } },
  { 'rataDie':  473837, 'hinduSolarModern': { 'year': 1220, 'month':  1, 'day': 27 } },
  { 'rataDie':  507850, 'hinduSolarModern': { 'year': 1313, 'month':  3, 'day':  8 } },
  { 'rataDie':  524156, 'hinduSolarModern': { 'year': 1357, 'month': 10, 'day': 30 } },
  { 'rataDie':  544676, 'hinduSolarModern': { 'year': 1414, 'month':  1, 'day':  5 } },
  { 'rataDie':  567118, 'hinduSolarModern': { 'year': 1475, 'month':  6, 'day': 10 } },
  { 'rataDie':  569477, 'hinduSolarModern': { 'year': 1481, 'month': 11, 'day': 29 } },
  { 'rataDie':  601716, 'hinduSolarModern': { 'year': 1570, 'month':  3, 'day':  3 } },
  { 'rataDie':  613424, 'hinduSolarModern': { 'year': 1602, 'month':  3, 'day': 22 } },
  { 'rataDie':  626596, 'hinduSolarModern': { 'year': 1638, 'month':  4, 'day': 13 } },
  { 'rataDie':  645554, 'hinduSolarModern': { 'year': 1690, 'month':  3, 'day': 10 } },
  { 'rataDie':  664224, 'hinduSolarModern': { 'year': 1741, 'month':  4, 'day': 20 } },
  { 'rataDie':  671401, 'hinduSolarModern': { 'year': 1760, 'month': 12, 'day': 16 } },
  { 'rataDie':  694799, 'hinduSolarModern': { 'year': 1825, 'month':  1, 'day':  7 } },
  { 'rataDie':  704424, 'hinduSolarModern': { 'year': 1851, 'month':  5, 'day': 10 } },
  { 'rataDie':  708842, 'hinduSolarModern': { 'year': 1863, 'month':  6, 'day': 14 } },
  { 'rataDie':  709409, 'hinduSolarModern': { 'year': 1865, 'month':  1, 'day':  7 } },
  { 'rataDie':  709580, 'hinduSolarModern': { 'year': 1865, 'month':  6, 'day': 21 } },
  { 'rataDie':  727274, 'hinduSolarModern': { 'year': 1913, 'month': 12, 'day':  4 } },
  { 'rataDie':  728714, 'hinduSolarModern': { 'year': 1917, 'month': 11, 'day': 13 } },
  { 'rataDie':  744313, 'hinduSolarModern': { 'year': 1960, 'month':  7, 'day': 24 } },
  { 'rataDie':  764652, 'hinduSolarModern': { 'year': 2016, 'month':  4, 'day':  2 } }
];

describe ('Hindu Solar Modern calendar spec', () => {
  let date;
  let expected;
  let actual;
  let julian;

  it ('should convert a Hindu Solar Modern date to Julian day', () => {
    data4.forEach (dt => {
      julian = dt.rataDie + J0000;
      date   = dt.hinduSolarModern;
      actual = cal.toJdn (date.year, date.month, date.day);
      expect (julian).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Hindu Solar Modern date', () => {
    data4.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.hinduSolarModern;
      expected = { 'jdn': julian, 'year': date.year, 'month': date.month, 'day': date.day };
      actual   = cal.fromJdn (julian);

      expect (expected).toEqual (actual);
      // expect (expected.year).toBe (actual.year);
      // expect (expected.month).toBe (actual.month);
      // expect (expected.day).toBe (actual.day);
    });
  });

  it ('throws validation exceptions', () => {
    expect (() => cal.toJdn (1999,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  1, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  2, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  3, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  4, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  5, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  6, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  7, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  8, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  9, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999, 10, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999, 11, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999, 12, 31)).toThrow (INVALID_DAY);
  });
});
