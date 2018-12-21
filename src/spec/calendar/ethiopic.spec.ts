import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';

import { EthiopicCalendar as cal } from '../../calendar/EthiopicCalendar';
import { EthiopicDate } from '../../calendar/EthiopicDate';

const dates = [
  { rataDie: -214193, date: { year: -594, month: 12, day:  6 } },
  { rataDie:  -61387, date: { year: -175, month:  4, day: 12 } },
  { rataDie:   25469, date: { year:   63, month:  1, day: 29 } },
  { rataDie:   49217, date: { year:  128, month:  2, day:  5 } },
  { rataDie:  171307, date: { year:  462, month:  5, day: 12 } },
  { rataDie:  210155, date: { year:  568, month:  9, day: 23 } },
  { rataDie:  253427, date: { year:  687, month:  3, day: 11 } },
  { rataDie:  369740, date: { year: 1005, month:  8, day: 24 } },
  { rataDie:  400085, date: { year: 1088, month:  9, day: 23 } },
  { rataDie:  434355, date: { year: 1182, month:  7, day: 20 } },
  { rataDie:  452605, date: { year: 1232, month:  7, day:  7 } },
  { rataDie:  470160, date: { year: 1280, month:  7, day: 30 } },
  { rataDie:  473837, date: { year: 1290, month:  8, day: 25 } },
  { rataDie:  507850, date: { year: 1383, month: 10, day: 10 } },
  { rataDie:  524156, date: { year: 1428, month:  5, day: 29 } },
  { rataDie:  544676, date: { year: 1484, month:  8, day:  5 } },
  { rataDie:  567118, date: { year: 1546, month:  1, day: 12 } },
  { rataDie:  569477, date: { year: 1552, month:  6, day: 29 } },
  { rataDie:  601716, date: { year: 1640, month: 10, day:  6 } },
  { rataDie:  613424, date: { year: 1672, month: 10, day: 26 } },
  { rataDie:  626596, date: { year: 1708, month: 11, day: 19 } },
  { rataDie:  645554, date: { year: 1760, month: 10, day: 14 } },
  { rataDie:  664224, date: { year: 1811, month: 11, day: 27 } },
  { rataDie:  671401, date: { year: 1831, month:  7, day: 19 } },
  { rataDie:  694799, date: { year: 1895, month:  8, day: 11 } },
  { rataDie:  704424, date: { year: 1921, month: 12, day: 19 } },
  { rataDie:  708842, date: { year: 1934, month:  1, day: 19 } },
  { rataDie:  709409, date: { year: 1935, month:  8, day: 11 } },
  { rataDie:  709580, date: { year: 1936, month:  1, day: 26 } },
  { rataDie:  727274, date: { year: 1984, month:  7, day:  8 } },
  { rataDie:  728714, date: { year: 1988, month:  6, day: 17 } },
  { rataDie:  744313, date: { year: 2031, month:  3, day:  1 } },
  { rataDie:  764652, date: { year: 2086, month: 11, day: 11 } },
];

describe ('Ethiopic calendar spec', () => {
  it ('should convert an Ethiopic date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to an Ethiopic date', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.fromRd (rataDie) as EthiopicDate;
      const jdn      = actual.getJdn();
      const expected = { jdn, ...date };

      expect (actual).toEqual (expected);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1000,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, 15, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000,  7,  0)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, 35)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000, 13,  7)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1001, 13,  6)).toThrow (INVALID_DAY);
   });
});
