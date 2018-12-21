import { amod } from '../../Astro';
import { INVALID_DECADI, INVALID_JOUR, INVALID_MOIS, J0000 } from '../../Const';

import { FrenchRevolutionaryCalendar as cal } from '../../calendar/FrenchRevolutionaryCalendar';
import { FrenchRevolutionaryDate } from '../../calendar/FrenchRevolutionaryDate';

const dates = [
  { rataDie: -214193, date: { year: -2378, month: 11, day:  5 } },
  { rataDie:  -61387, date: { year: -1959, month:  3, day: 14 } },
  { rataDie:   25469, date: { year: -1721, month:  1, day:  2 } },
  { rataDie:   49217, date: { year: -1656, month:  1, day: 10 } },
  { rataDie:  171307, date: { year: -1322, month:  4, day: 19 } },
  { rataDie:  210155, date: { year: -1216, month:  9, day:  1 } },
  { rataDie:  253427, date: { year: -1097, month:  2, day: 19 } },
  { rataDie:  369740, date: { year:  -779, month:  8, day:  5 } },
  { rataDie:  400085, date: { year:  -696, month:  9, day:  5 } },
  { rataDie:  434355, date: { year:  -602, month:  7, day:  2 } },
  { rataDie:  452605, date: { year:  -552, month:  6, day: 20 } },
  { rataDie:  470160, date: { year:  -504, month:  7, day: 13 } },
  { rataDie:  473837, date: { year:  -494, month:  8, day:  8 } },
  { rataDie:  507850, date: { year:  -401, month:  9, day: 23 } },
  { rataDie:  524156, date: { year:  -356, month:  5, day: 14 } },
  { rataDie:  544676, date: { year:  -300, month:  7, day: 20 } },
  { rataDie:  567118, date: { year:  -239, month:  0, day:  2 } },
  { rataDie:  569477, date: { year:  -232, month:  6, day: 15 } },
  { rataDie:  601716, date: { year:  -144, month:  9, day: 22 } },
  { rataDie:  613424, date: { year:  -112, month: 10, day: 12 } },
  { rataDie:  626596, date: { year:   -76, month: 11, day:  6 } },
  { rataDie:  645554, date: { year:   -24, month: 10, day:  1 } },
  { rataDie:  664224, date: { year:    27, month: 11, day: 14 } },
  { rataDie:  671401, date: { year:    47, month:  7, day:  6 } },
  { rataDie:  694799, date: { year:   111, month:  7, day: 28 } },
  { rataDie:  704424, date: { year:   137, month: 12, day:  7 } },
  { rataDie:  708842, date: { year:   150, month:  1, day:  7 } },
  { rataDie:  709409, date: { year:   151, month:  7, day: 29 } },
  { rataDie:  709580, date: { year:   152, month:  1, day: 15 } },
  { rataDie:  727274, date: { year:   200, month:  6, day: 27 } },
  { rataDie:  728714, date: { year:   204, month:  6, day:  6 } },
  { rataDie:  744313, date: { year:   247, month:  2, day: 20 } },
  { rataDie:  764652, date: { year:   302, month: 10, day: 30 } },
];

describe ('French Revolutionary calendar spec', () => {
  it ('should convert a French Revolutionary date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      let jour     = date.day;
      const decade = Math.floor ((jour - 1) / 10) + 1;
      jour         = amod (jour, 10);
      const actual = cal.toJdn (date.year, date.month, decade, jour);
      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a French Revolutionary date', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.fromRd (rataDie) as FrenchRevolutionaryDate;
      const jdn      = actual.getJdn();
      const jour     = date.day;
      const decade   = Math.floor ((jour - 1) / 10) + 1;
      const day      = amod (jour, 10);
      const expected = { jdn, year: date.year, month: date.month, decade, day };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.decade).toBe (actual.getDecade());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1, -1, 3, 10)).toThrow (INVALID_MOIS);
    expect (() => cal.toJdn (1, 15, 3, 10)).toThrow (INVALID_MOIS);
    expect (() => cal.toJdn (1,  7, 0, 10)).toThrow (INVALID_DECADI);
    expect (() => cal.toJdn (1,  7, 4, 10)).toThrow (INVALID_DECADI);
    expect (() => cal.toJdn (1,  7, 3, -5)).toThrow (INVALID_JOUR);
    expect (() => cal.toJdn (1,  7, 3, 12)).toThrow (INVALID_JOUR);
    expect (() => cal.toJdn (1,  0, 1,  6)).toThrow (INVALID_JOUR);
    expect (() => cal.toJdn (3,  0, 1,  7)).toThrow (INVALID_JOUR);
   });
});
