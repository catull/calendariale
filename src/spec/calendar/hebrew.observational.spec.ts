import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';
import { HebrewObservationalCalendar as cal } from '../../calendar/HebrewObservationalCalendar';
import { HebrewObservationalDate } from '../../calendar/HebrewObservationalDate';

const dates = [
  { rataDie: -214193, date: { year: 3174, month:  5, day: 11 } },
  { rataDie:  -61387, date: { year: 3593, month:  9, day: 24 } },
  { rataDie:   25469, date: { year: 3831, month:  7, day:  2 } },
  { rataDie:   49217, date: { year: 3896, month:  7, day:  7 } },
  { rataDie:  171307, date: { year: 4230, month: 10, day: 18 } },
  { rataDie:  210155, date: { year: 4336, month:  3, day:  3 } },
  { rataDie:  253427, date: { year: 4455, month:  9, day: 13 } },
  { rataDie:  369740, date: { year: 4773, month:  2, day:  5 } },
  { rataDie:  400085, date: { year: 4856, month:  2, day: 22 } },
  { rataDie:  434355, date: { year: 4950, month:  1, day:  7 } },
  { rataDie:  452605, date: { year: 5000, month: 13, day:  7 } },
  { rataDie:  470160, date: { year: 5048, month:  1, day: 21 } },
  { rataDie:  473837, date: { year: 5058, month:  2, day:  7 } },
  { rataDie:  507850, date: { year: 5151, month:  3, day: 30 } },
  { rataDie:  524156, date: { year: 5196, month: 12, day:  6 } },
  { rataDie:  544676, date: { year: 5252, month:  2, day:  2 } },
  { rataDie:  567118, date: { year: 5313, month:  6, day: 30 } },
  { rataDie:  569477, date: { year: 5320, month: 12, day: 27 } },
  { rataDie:  601716, date: { year: 5408, month:  3, day: 18 } },
  { rataDie:  613424, date: { year: 5440, month:  4, day:  3 } },
  { rataDie:  626596, date: { year: 5476, month:  5, day:  4 } },
  { rataDie:  645554, date: { year: 5528, month:  4, day:  4 } },
  { rataDie:  664224, date: { year: 5579, month:  5, day: 10 } },
  { rataDie:  671401, date: { year: 5599, month:  1, day: 11 } },
  { rataDie:  694799, date: { year: 5663, month:  1, day: 20 } },
  { rataDie:  704424, date: { year: 5689, month:  6, day: 19 } },
  { rataDie:  708842, date: { year: 5702, month:  7, day:  7 } },
  { rataDie:  709409, date: { year: 5703, month:  2, day: 14 } },
  { rataDie:  709580, date: { year: 5704, month:  8, day:  7 } },
  { rataDie:  727274, date: { year: 5752, month:  1, day: 12 } },
  { rataDie:  728714, date: { year: 5756, month: 12, day:  5 } },
  { rataDie:  744313, date: { year: 5799, month:  9, day: 12 } },
  { rataDie:  764652, date: { year: 5854, month:  5, day:  5 } },
];

describe ('Hebrew Observational calendar spec', () => {
  it ('should convert a Hebrew Observational date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hebrew Observational date', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.fromRd (rataDie) as HebrewObservationalDate;
      const jdn      = actual.getJdn();
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (5000,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (5000, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (5000, 15, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (5000,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5000,  7, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5000,  2, 30)).toBeDefined ();
    expect (() => cal.toJdn (5000, 12, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5000, 12, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5001, 12, 30)).toBeDefined ();
    expect (() => cal.toJdn (5102,  8, 30)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (5103,  9, 30)).toBeDefined ();
  });
});
