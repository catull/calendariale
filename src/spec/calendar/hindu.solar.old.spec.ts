import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';
import { HinduSolarOldCalendar as cal } from '../../calendar/HinduSolarOldCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { year: 2515, month:  5, day: 19 } },
  { jdn:  -61387 + J0000, date: { year: 2933, month:  9, day: 26 } },
  { jdn:   25469 + J0000, date: { year: 3171, month:  7, day: 11 } },
  { jdn:   49217 + J0000, date: { year: 3236, month:  7, day: 17 } },
  { jdn:  171307 + J0000, date: { year: 3570, month: 10, day: 19 } },
  { jdn:  210155 + J0000, date: { year: 3677, month:  2, day: 28 } },
  { jdn:  253427 + J0000, date: { year: 3795, month:  8, day: 17 } },
  { jdn:  369740 + J0000, date: { year: 4114, month:  1, day: 26 } },
  { jdn:  400085 + J0000, date: { year: 4197, month:  2, day: 24 } },
  { jdn:  434355 + J0000, date: { year: 4290, month: 12, day: 20 } },
  { jdn:  452605 + J0000, date: { year: 4340, month: 12, day:  7 } },
  { jdn:  470160 + J0000, date: { year: 4388, month: 12, day: 30 } },
  { jdn:  473837 + J0000, date: { year: 4399, month:  1, day: 24 } },
  { jdn:  507850 + J0000, date: { year: 4492, month:  3, day:  7 } },
  { jdn:  524156 + J0000, date: { year: 4536, month: 10, day: 28 } },
  { jdn:  544676 + J0000, date: { year: 4593, month:  1, day:  3 } },
  { jdn:  567118 + J0000, date: { year: 4654, month:  6, day: 12 } },
  { jdn:  569477 + J0000, date: { year: 4660, month: 11, day: 27 } },
  { jdn:  601716 + J0000, date: { year: 4749, month:  3, day:  1 } },
  { jdn:  613424 + J0000, date: { year: 4781, month:  3, day: 21 } },
  { jdn:  626596 + J0000, date: { year: 4817, month:  4, day: 13 } },
  { jdn:  645554 + J0000, date: { year: 4869, month:  3, day:  8 } },
  { jdn:  664224 + J0000, date: { year: 4920, month:  4, day: 20 } },
  { jdn:  671401 + J0000, date: { year: 4939, month: 12, day: 13 } },
  { jdn:  694799 + J0000, date: { year: 5004, month:  1, day:  4 } },
  { jdn:  704424 + J0000, date: { year: 5030, month:  5, day: 11 } },
  { jdn:  708842 + J0000, date: { year: 5042, month:  6, day: 15 } },
  { jdn:  709409 + J0000, date: { year: 5044, month:  1, day:  4 } },
  { jdn:  709580 + J0000, date: { year: 5044, month:  6, day: 23 } },
  { jdn:  727274 + J0000, date: { year: 5092, month: 12, day:  2 } },
  { jdn:  728714 + J0000, date: { year: 5096, month: 11, day: 11 } },
  { jdn:  744313 + J0000, date: { year: 5139, month:  7, day: 26 } },
  { jdn:  764652 + J0000, date: { year: 5195, month:  4, day:  2 } },
];

describe ('Hindu Solar Old calendar spec', () => {
  it ('should convert a Hindu Solar Old date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hindu Solar Old date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
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
