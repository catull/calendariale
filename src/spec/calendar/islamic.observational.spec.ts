import { INVALID_DAY, INVALID_MONTH, J0000 } from '../../Const';

import { IslamicObservationalCalendar as cal } from '../../calendar/IslamicObservationalCalendar';

const dates = [
  { rataDie: -214193, date: { year: -1245, month: 12, day: 11 } },
  { rataDie:  -61387, date: { year:  -813, month:  2, day: 25 } },
  { rataDie:   25469, date: { year:  -568, month:  4, day:  2 } },
  { rataDie:   49217, date: { year:  -501, month:  4, day:  7 } },
  { rataDie:  171307, date: { year:  -157, month: 10, day: 18 } },
  { rataDie:  210155, date: { year:   -47, month:  6, day:  3 } },
  { rataDie:  253427, date: { year:    75, month:  7, day: 13 } },
  { rataDie:  369740, date: { year:   403, month: 10, day:  5 } },
  { rataDie:  400085, date: { year:   489, month:  5, day: 22 } },
  { rataDie:  434355, date: { year:   586, month:  2, day:  7 } },
  { rataDie:  452605, date: { year:   637, month:  8, day:  7 } },
  { rataDie:  470160, date: { year:   687, month:  2, day: 21 } },
  { rataDie:  473837, date: { year:   697, month:  7, day:  7 } },
  { rataDie:  507850, date: { year:   793, month:  6, day: 30 } },
  { rataDie:  524156, date: { year:   839, month:  7, day:  6 } },
  { rataDie:  544676, date: { year:   897, month:  6, day:  2 } },
  { rataDie:  567118, date: { year:   960, month:  9, day: 30 } },
  { rataDie:  569477, date: { year:   967, month:  5, day: 27 } },
  { rataDie:  601716, date: { year:  1058, month:  5, day: 18 } },
  { rataDie:  613424, date: { year:  1091, month:  6, day:  3 } },
  { rataDie:  626596, date: { year:  1128, month:  8, day:  4 } },
  { rataDie:  645554, date: { year:  1182, month:  2, day:  4 } },
  { rataDie:  664224, date: { year:  1234, month: 10, day: 10 } },
  { rataDie:  671401, date: { year:  1255, month:  1, day: 11 } },
  { rataDie:  694799, date: { year:  1321, month:  1, day: 20 } },
  { rataDie:  704424, date: { year:  1348, month:  3, day: 19 } },
  { rataDie:  708842, date: { year:  1360, month:  9, day:  7 } },
  { rataDie:  709409, date: { year:  1362, month:  4, day: 14 } },
  { rataDie:  709580, date: { year:  1362, month: 10, day:  7 } },
  { rataDie:  727274, date: { year:  1412, month:  9, day: 12 } },
  { rataDie:  728714, date: { year:  1416, month: 10, day:  5 } },
  { rataDie:  744313, date: { year:  1460, month: 10, day: 12 } },
  { rataDie:  764652, date: { year:  1518, month:  3, day:  5 } },
];

describe ('Islamic Observational calendar spec', () => {
  it ('should convert a Islamic Observational date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      const actual = cal.toJdn (date.year, date.month, date.day);
      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Islamic Observational date', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn      = rataDie + J0000;
      const yearLeap =  cal.isLeapYear (date.year);
      const expected = { jdn, ...date, yearLeap };
      const actual   = cal.fromJdn (jdn);

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
