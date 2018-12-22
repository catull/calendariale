import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';
import { IslamicObservationalCalendar as cal } from '../../calendar/IslamicObservationalCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { year: -1245, month: 12, day: 11 } },
  { jdn:  -61387 + J0000, date: { year:  -813, month:  2, day: 25 } },
  { jdn:   25469 + J0000, date: { year:  -568, month:  4, day:  2 } },
  { jdn:   49217 + J0000, date: { year:  -501, month:  4, day:  7 } },
  { jdn:  171307 + J0000, date: { year:  -157, month: 10, day: 18 } },
  { jdn:  210155 + J0000, date: { year:   -47, month:  6, day:  3 } },
  { jdn:  253427 + J0000, date: { year:    75, month:  7, day: 13 } },
  { jdn:  369740 + J0000, date: { year:   403, month: 10, day:  5 } },
  { jdn:  400085 + J0000, date: { year:   489, month:  5, day: 22 } },
  { jdn:  434355 + J0000, date: { year:   586, month:  2, day:  7 } },
  { jdn:  452605 + J0000, date: { year:   637, month:  8, day:  7 } },
  { jdn:  470160 + J0000, date: { year:   687, month:  2, day: 21 } },
  { jdn:  473837 + J0000, date: { year:   697, month:  7, day:  7 } },
  { jdn:  507850 + J0000, date: { year:   793, month:  6, day: 30 } },
  { jdn:  524156 + J0000, date: { year:   839, month:  7, day:  6 } },
  { jdn:  544676 + J0000, date: { year:   897, month:  6, day:  2 } },
  { jdn:  567118 + J0000, date: { year:   960, month:  9, day: 30 } },
  { jdn:  569477 + J0000, date: { year:   967, month:  5, day: 27 } },
  { jdn:  601716 + J0000, date: { year:  1058, month:  5, day: 18 } },
  { jdn:  613424 + J0000, date: { year:  1091, month:  6, day:  3 } },
  { jdn:  626596 + J0000, date: { year:  1128, month:  8, day:  4 } },
  { jdn:  645554 + J0000, date: { year:  1182, month:  2, day:  4 } },
  { jdn:  664224 + J0000, date: { year:  1234, month: 10, day: 10 } },
  { jdn:  671401 + J0000, date: { year:  1255, month:  1, day: 11 } },
  { jdn:  694799 + J0000, date: { year:  1321, month:  1, day: 20 } },
  { jdn:  704424 + J0000, date: { year:  1348, month:  3, day: 19 } },
  { jdn:  708842 + J0000, date: { year:  1360, month:  9, day:  7 } },
  { jdn:  709409 + J0000, date: { year:  1362, month:  4, day: 14 } },
  { jdn:  709580 + J0000, date: { year:  1362, month: 10, day:  7 } },
  { jdn:  727274 + J0000, date: { year:  1412, month:  9, day: 12 } },
  { jdn:  728714 + J0000, date: { year:  1416, month: 10, day:  5 } },
  { jdn:  744313 + J0000, date: { year:  1460, month: 10, day: 12 } },
  { jdn:  764652 + J0000, date: { year:  1518, month:  3, day:  5 } },
];

describe ('Islamic Observational calendar spec', () => {
  it ('should convert a Islamic Observational date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);
      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Islamic Observational date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const yearLeap =  cal.isLeapYear (date.year);
      const expected = { jdn, ...date, yearLeap };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (220,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (220, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (220, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (220,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  1, 31)).toThrow (INVALID_DAY);
  });
});
