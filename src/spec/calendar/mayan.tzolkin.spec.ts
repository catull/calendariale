import { MayanTzolkinCalendar as cal } from '../../calendar/MayanTzolkinCalendar';
import { MayanTzolkinDate } from '../../calendar/MayanTzolkinDate';

const dates = [
  { rataDie: -214193, date: { month:  5, day:  9 } },
  { rataDie:  -61387, date: { month:  9, day: 15 } },
  { rataDie:   25469, date: { month: 12, day: 11 } },
  { rataDie:   49217, date: { month:  9, day: 19 } },
  { rataDie:  171307, date: { month:  3, day:  9 } },
  { rataDie:  210155, date: { month:  7, day: 17 } },
  { rataDie:  253427, date: { month:  2, day:  9 } },
  { rataDie:  369740, date: { month:  4, day:  2 } },
  { rataDie:  400085, date: { month:  7, day:  7 } },
  { rataDie:  434355, date: { month:  9, day: 17 } },
  { rataDie:  452605, date: { month:  7, day:  7 } },
  { rataDie:  470160, date: { month: 12, day:  2 } },
  { rataDie:  473837, date: { month: 10, day: 19 } },
  { rataDie:  507850, date: { month:  2, day: 12 } },
  { rataDie:  524156, date: { month:  6, day: 18 } },
  { rataDie:  544676, date: { month: 12, day: 18 } },
  { rataDie:  567118, date: { month:  3, day: 20 } },
  { rataDie:  569477, date: { month:  9, day: 19 } },
  { rataDie:  601716, date: { month:  8, day: 18 } },
  { rataDie:  613424, date: { month:  3, day:  6 } },
  { rataDie:  626596, date: { month:  6, day: 18 } },
  { rataDie:  645554, date: { month: 10, day: 16 } },
  { rataDie:  664224, date: { month: 12, day:  6 } },
  { rataDie:  671401, date: { month: 13, day:  3 } },
  { rataDie:  694799, date: { month: 11, day:  1 } },
  { rataDie:  704424, date: { month:  3, day:  6 } },
  { rataDie:  708842, date: { month:  1, day:  4 } },
  { rataDie:  709409, date: { month:  9, day: 11 } },
  { rataDie:  709580, date: { month: 11, day:  2 } },
  { rataDie:  727274, date: { month: 12, day: 16 } },
  { rataDie:  728714, date: { month:  9, day: 16 } },
  { rataDie:  744313, date: { month:  8, day: 15 } },
  { rataDie:  764652, date: { month:  2, day: 14 } },
];

describe ('Mayan Tzolkin calendar spec', () => {
  it ('should convert a Julian day to a Mayan Tzolkin', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.fromRd (rataDie) as MayanTzolkinDate;
      const jdn      = actual.getJdn();
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });
});
