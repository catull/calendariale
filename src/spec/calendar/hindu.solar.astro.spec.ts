import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';

import { HinduSolarAstroCalendar as cal } from '../../calendar/HinduSolarAstroCalendar';

const data4 = [
  { 'rataDie': -214193, 'hinduSolarAstro': { 'year': -664, 'month':  5, 'day': 13 } },
  { 'rataDie':  -61387, 'hinduSolarAstro': { 'year': -246, 'month':  9, 'day': 21 } },
  { 'rataDie':   25469, 'hinduSolarAstro': { 'year':   -8, 'month':  7, 'day':  5 } },
  { 'rataDie':   49217, 'hinduSolarAstro': { 'year':   57, 'month':  7, 'day': 11 } },
  { 'rataDie':  171307, 'hinduSolarAstro': { 'year':  391, 'month': 10, 'day': 17 } },
  { 'rataDie':  210155, 'hinduSolarAstro': { 'year':  498, 'month':  2, 'day': 27 } },
  { 'rataDie':  253427, 'hinduSolarAstro': { 'year':  616, 'month':  8, 'day': 13 } },
  { 'rataDie':  369740, 'hinduSolarAstro': { 'year':  935, 'month':  1, 'day': 26 } },
  { 'rataDie':  400085, 'hinduSolarAstro': { 'year': 1018, 'month':  2, 'day': 24 } },
  { 'rataDie':  434355, 'hinduSolarAstro': { 'year': 1111, 'month': 12, 'day': 21 } },
  { 'rataDie':  452605, 'hinduSolarAstro': { 'year': 1161, 'month': 12, 'day':  8 } },
  { 'rataDie':  470160, 'hinduSolarAstro': { 'year': 1209, 'month': 12, 'day': 31 } },
  { 'rataDie':  473837, 'hinduSolarAstro': { 'year': 1220, 'month':  1, 'day': 25 } },
  { 'rataDie':  507850, 'hinduSolarAstro': { 'year': 1313, 'month':  3, 'day':  7 } },
  { 'rataDie':  524156, 'hinduSolarAstro': { 'year': 1357, 'month': 10, 'day': 28 } },
  { 'rataDie':  544676, 'hinduSolarAstro': { 'year': 1414, 'month':  1, 'day':  4 } },
  { 'rataDie':  567118, 'hinduSolarAstro': { 'year': 1475, 'month':  6, 'day':  9 } },
  { 'rataDie':  569477, 'hinduSolarAstro': { 'year': 1481, 'month': 11, 'day': 28 } },
  { 'rataDie':  601716, 'hinduSolarAstro': { 'year': 1570, 'month':  3, 'day':  2 } },
  { 'rataDie':  613424, 'hinduSolarAstro': { 'year': 1602, 'month':  3, 'day': 22 } },
  { 'rataDie':  626596, 'hinduSolarAstro': { 'year': 1638, 'month':  4, 'day': 13 } },
  { 'rataDie':  645554, 'hinduSolarAstro': { 'year': 1690, 'month':  3, 'day':  9 } },
  { 'rataDie':  664224, 'hinduSolarAstro': { 'year': 1741, 'month':  4, 'day': 20 } },
  { 'rataDie':  671401, 'hinduSolarAstro': { 'year': 1760, 'month': 12, 'day': 15 } },
  { 'rataDie':  694799, 'hinduSolarAstro': { 'year': 1825, 'month':  1, 'day':  7 } },
  { 'rataDie':  704424, 'hinduSolarAstro': { 'year': 1851, 'month':  5, 'day': 10 } },
  { 'rataDie':  708842, 'hinduSolarAstro': { 'year': 1863, 'month':  6, 'day': 14 } },
  { 'rataDie':  709409, 'hinduSolarAstro': { 'year': 1865, 'month':  1, 'day':  6 } },
  { 'rataDie':  709580, 'hinduSolarAstro': { 'year': 1865, 'month':  6, 'day': 21 } },
  { 'rataDie':  727274, 'hinduSolarAstro': { 'year': 1913, 'month': 12, 'day':  4 } },
  { 'rataDie':  728714, 'hinduSolarAstro': { 'year': 1917, 'month': 11, 'day': 13 } },
  { 'rataDie':  744313, 'hinduSolarAstro': { 'year': 1960, 'month':  7, 'day': 25 } },
  { 'rataDie':  764652, 'hinduSolarAstro': { 'year': 2016, 'month':  4, 'day':  2 } }
];

describe ('Hindu Solar Astro calendar spec', () => {
  let date;
  let expected;
  let actual;
  let julian;

  it ('should convert a Hindu Solar Astro date to Julian day', () => {
    data4.forEach (dt => {
      julian = dt.rataDie + J0000;
      date   = dt.hinduSolarAstro;
      actual = cal.toJdn (date.year, date.month, date.day);
      expect (julian).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Hindu Solar Astro date', () => {
    data4.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.hinduSolarAstro;
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
    expect (() => cal.toJdn (1999,  7, 32)).toThrow (INVALID_DAY);
  });
});
