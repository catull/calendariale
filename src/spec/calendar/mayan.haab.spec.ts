import { MayanHaabCalendar as cal } from '../../calendar/MayanHaabCalendar';
import { MayanHaabDate } from '../../calendar/MayanHaabDate';

const dates = [
  { rataDie: -214193, date: { month: 11, day: 12 } },
  { rataDie:  -61387, date: { month:  5, day:  3 } },
  { rataDie:   25469, date: { month:  4, day:  9 } },
  { rataDie:   49217, date: { month:  5, day: 12 } },
  { rataDie:  171307, date: { month: 14, day: 12 } },
  { rataDie:  210155, date: { month:  4, day:  5 } },
  { rataDie:  253427, date: { month: 14, day:  7 } },
  { rataDie:  369740, date: { month:  8, day:  5 } },
  { rataDie:  400085, date: { month: 10, day: 15 } },
  { rataDie:  434355, date: { month:  8, day: 15 } },
  { rataDie:  452605, date: { month:  8, day: 15 } },
  { rataDie:  470160, date: { month: 10, day: 10 } },
  { rataDie:  473837, date: { month: 11, day: 17 } },
  { rataDie:  507850, date: { month: 15, day:  5 } },
  { rataDie:  524156, date: { month:  9, day:  6 } },
  { rataDie:  544676, date: { month: 13, day:  6 } },
  { rataDie:  567118, date: { month:  3, day: 18 } },
  { rataDie:  569477, date: { month: 12, day:  7 } },
  { rataDie:  601716, date: { month: 18, day:  6 } },
  { rataDie:  613424, date: { month:  1, day:  9 } },
  { rataDie:  626596, date: { month:  3, day:  1 } },
  { rataDie:  645554, date: { month:  1, day: 19 } },
  { rataDie:  664224, date: { month:  4, day: 14 } },
  { rataDie:  671401, date: { month: 16, day: 16 } },
  { rataDie:  694799, date: { month: 18, day: 14 } },
  { rataDie:  704424, date: { month:  7, day:  4 } },
  { rataDie:  708842, date: { month:  9, day:  2 } },
  { rataDie:  709409, date: { month: 19, day:  4 } },
  { rataDie:  709580, date: { month:  9, day: 10 } },
  { rataDie:  727274, date: { month: 18, day:  4 } },
  { rataDie:  728714, date: { month: 17, day:  4 } },
  { rataDie:  744313, date: { month: 12, day:  8 } },
  { rataDie:  764652, date: { month:  7, day:  7 } },
];

describe ('Mayan Haab calendar spec', () => {
  it ('should convert a Julian day to a Mayan Haab', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.fromRd (rataDie) as MayanHaabDate;
      const jdn      = actual.getJdn();
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });
});
