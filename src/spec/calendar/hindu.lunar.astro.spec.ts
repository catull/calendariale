import { INVALID_DAY, INVALID_LEAP_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, J0000 } from '../../Const';
import { HinduLunarAstroCalendar as cal } from '../../calendar/HinduLunarAstroCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { year: -529, month:  6, monthLeap: true,  day: 11, dayLeap: false } },
  { jdn:  -61387 + J0000, date: { year: -111, month:  9, monthLeap: false, day: 27, dayLeap: false } },
  { jdn:   25469 + J0000, date: { year:  127, month:  8, monthLeap: false, day:  3, dayLeap: true  } },
  { jdn:   49217 + J0000, date: { year:  192, month:  8, monthLeap: false, day:  9, dayLeap: false } },
  { jdn:  171307 + J0000, date: { year:  526, month: 10, monthLeap: false, day: 20, dayLeap: false } },
  { jdn:  210155 + J0000, date: { year:  633, month:  3, monthLeap: false, day:  5, dayLeap: false } },
  { jdn:  253427 + J0000, date: { year:  751, month:  8, monthLeap: false, day: 15, dayLeap: false } },
  { jdn:  369740 + J0000, date: { year: 1070, month:  2, monthLeap: false, day:  6, dayLeap: false } },
  { jdn:  400085 + J0000, date: { year: 1153, month:  2, monthLeap: false, day: 23, dayLeap: false } },
  { jdn:  434355 + J0000, date: { year: 1247, month:  1, monthLeap: false, day:  8, dayLeap: false } },
  { jdn:  452605 + J0000, date: { year: 1296, month: 12, monthLeap: false, day:  8, dayLeap: false } },
  { jdn:  470160 + J0000, date: { year: 1345, month:  1, monthLeap: false, day: 23, dayLeap: false } },
  { jdn:  473837 + J0000, date: { year: 1355, month:  2, monthLeap: false, day:  8, dayLeap: false } },
  { jdn:  507850 + J0000, date: { year: 1448, month:  4, monthLeap: false, day:  1, dayLeap: false } },
  { jdn:  524156 + J0000, date: { year: 1492, month: 11, monthLeap: false, day:  7, dayLeap: false } },
  { jdn:  544676 + J0000, date: { year: 1549, month:  2, monthLeap: true,  day:  4, dayLeap: false } },
  { jdn:  567118 + J0000, date: { year: 1610, month:  7, monthLeap: false, day:  2, dayLeap: false } },
  { jdn:  569477 + J0000, date: { year: 1616, month: 11, monthLeap: false, day: 29, dayLeap: false } },
  { jdn:  601716 + J0000, date: { year: 1705, month:  3, monthLeap: false, day: 20, dayLeap: false } },
  { jdn:  613424 + J0000, date: { year: 1737, month:  4, monthLeap: false, day:  5, dayLeap: false } },
  { jdn:  626596 + J0000, date: { year: 1773, month:  5, monthLeap: false, day:  6, dayLeap: false } },
  { jdn:  645554 + J0000, date: { year: 1825, month:  4, monthLeap: false, day:  5, dayLeap: false } },
  { jdn:  664224 + J0000, date: { year: 1876, month:  5, monthLeap: false, day: 11, dayLeap: false } },
  { jdn:  671401 + J0000, date: { year: 1896, month:  1, monthLeap: false, day: 13, dayLeap: false } },
  { jdn:  694799 + J0000, date: { year: 1960, month:  1, monthLeap: false, day: 22, dayLeap: false } },
  { jdn:  704424 + J0000, date: { year: 1986, month:  5, monthLeap: false, day: 20, dayLeap: false } },
  { jdn:  708842 + J0000, date: { year: 1998, month:  7, monthLeap: false, day:  9, dayLeap: false } },
  { jdn:  709409 + J0000, date: { year: 2000, month:  1, monthLeap: false, day: 14, dayLeap: false } },
  { jdn:  709580 + J0000, date: { year: 2000, month:  7, monthLeap: false, day:  8, dayLeap: false } },
  { jdn:  727274 + J0000, date: { year: 2048, month: 12, monthLeap: false, day: 14, dayLeap: false } },
  { jdn:  728714 + J0000, date: { year: 2052, month: 12, monthLeap: false, day:  7, dayLeap: false } },
  { jdn:  744313 + J0000, date: { year: 2095, month:  8, monthLeap: false, day: 14, dayLeap: false } },
  { jdn:  764652 + J0000, date: { year: 2151, month:  4, monthLeap: false, day:  6, dayLeap: false } },
];

describe ('Hindu Lunar Astro calendar spec', () => {
  it ('should convert a Hindu Lunar Astro date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.monthLeap, date.day, date.dayLeap);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hindu Lunar Astro date', () => {
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

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (1549,  0, false,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1549, 13, false,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1549,  2, true ,  3, false)).not.toThrow ();
    expect (() => cal.toJdn (1549,  9, true ,  1, false)).toThrow (INVALID_LEAP_MONTH);
    expect (() => cal.toJdn (1549,  2, true ,  1, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1549,  4, false,  0, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1549,  4, false, 31, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1549,  6, false, 17, true )).toThrow (INVALID_LEAP_DAY);
  });

  it ('should determine a valid leap year', () => {
    expect(cal.isLeapYear(127)).toBe(true);
    expect(cal.isLeapYear(1549)).toBe(false);
  });
});
