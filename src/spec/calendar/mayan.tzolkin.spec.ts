import { J0000 } from '../../Const';
import { MayanTzolkinCalendar as cal } from '../../calendar/MayanTzolkinCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { month:  5, day:  9 } },
  { jdn:  -61387 + J0000, date: { month:  9, day: 15 } },
  { jdn:   25469 + J0000, date: { month: 12, day: 11 } },
  { jdn:   49217 + J0000, date: { month:  9, day: 19 } },
  { jdn:  171307 + J0000, date: { month:  3, day:  9 } },
  { jdn:  210155 + J0000, date: { month:  7, day: 17 } },
  { jdn:  253427 + J0000, date: { month:  2, day:  9 } },
  { jdn:  369740 + J0000, date: { month:  4, day:  2 } },
  { jdn:  400085 + J0000, date: { month:  7, day:  7 } },
  { jdn:  434355 + J0000, date: { month:  9, day: 17 } },
  { jdn:  452605 + J0000, date: { month:  7, day:  7 } },
  { jdn:  470160 + J0000, date: { month: 12, day:  2 } },
  { jdn:  473837 + J0000, date: { month: 10, day: 19 } },
  { jdn:  507850 + J0000, date: { month:  2, day: 12 } },
  { jdn:  524156 + J0000, date: { month:  6, day: 18 } },
  { jdn:  544676 + J0000, date: { month: 12, day: 18 } },
  { jdn:  567118 + J0000, date: { month:  3, day: 20 } },
  { jdn:  569477 + J0000, date: { month:  9, day: 19 } },
  { jdn:  601716 + J0000, date: { month:  8, day: 18 } },
  { jdn:  613424 + J0000, date: { month:  3, day:  6 } },
  { jdn:  626596 + J0000, date: { month:  6, day: 18 } },
  { jdn:  645554 + J0000, date: { month: 10, day: 16 } },
  { jdn:  664224 + J0000, date: { month: 12, day:  6 } },
  { jdn:  671401 + J0000, date: { month: 13, day:  3 } },
  { jdn:  694799 + J0000, date: { month: 11, day:  1 } },
  { jdn:  704424 + J0000, date: { month:  3, day:  6 } },
  { jdn:  708842 + J0000, date: { month:  1, day:  4 } },
  { jdn:  709409 + J0000, date: { month:  9, day: 11 } },
  { jdn:  709580 + J0000, date: { month: 11, day:  2 } },
  { jdn:  727274 + J0000, date: { month: 12, day: 16 } },
  { jdn:  728714 + J0000, date: { month:  9, day: 16 } },
  { jdn:  744313 + J0000, date: { month:  8, day: 15 } },
  { jdn:  764652 + J0000, date: { month:  2, day: 14 } },
];

describe ('Mayan Tzolkin calendar spec', () => {
  it ('should convert a Julian day to a Mayan Tzolkin', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });
});
