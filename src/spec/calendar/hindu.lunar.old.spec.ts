import { INVALID_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, J0000 } from '../../Const';

import { HinduLunarOldCalendar as cal } from '../../calendar/HinduLunarOldCalendar';

const dates = [
  { rataDie: -214193, date: { year: 2515, month:  6, monthLeap: false, day: 11 } },
  { rataDie:  -61387, date: { year: 2933, month:  9, monthLeap: false, day: 26 } },
  { rataDie:   25469, date: { year: 3171, month:  8, monthLeap: false, day:  3 } },
  { rataDie:   49217, date: { year: 3236, month:  8, monthLeap: false, day:  9 } },
  { rataDie:  171307, date: { year: 3570, month: 11, monthLeap: true,  day: 19 } },
  { rataDie:  210155, date: { year: 3677, month:  3, monthLeap: false, day:  5 } },
  { rataDie:  253427, date: { year: 3795, month:  9, monthLeap: false, day: 15 } },
  { rataDie:  369740, date: { year: 4114, month:  2, monthLeap: false, day:  7 } },
  { rataDie:  400085, date: { year: 4197, month:  2, monthLeap: false, day: 24 } },
  { rataDie:  434355, date: { year: 4291, month:  1, monthLeap: false, day:  9 } },
  { rataDie:  452605, date: { year: 4340, month: 12, monthLeap: false, day:  9 } },
  { rataDie:  470160, date: { year: 4389, month:  1, monthLeap: false, day: 23 } },
  { rataDie:  473837, date: { year: 4399, month:  2, monthLeap: false, day:  8 } },
  { rataDie:  507850, date: { year: 4492, month:  4, monthLeap: false, day:  2 } },
  { rataDie:  524156, date: { year: 4536, month: 11, monthLeap: false, day:  7 } },
  { rataDie:  544676, date: { year: 4593, month:  1, monthLeap: false, day:  3 } },
  { rataDie:  567118, date: { year: 4654, month:  7, monthLeap: false, day:  2 } },
  { rataDie:  569477, date: { year: 4660, month: 11, monthLeap: false, day: 29 } },
  { rataDie:  601716, date: { year: 4749, month:  3, monthLeap: false, day: 20 } },
  { rataDie:  613424, date: { year: 4781, month:  4, monthLeap: false, day:  4 } },
  { rataDie:  626596, date: { year: 4817, month:  5, monthLeap: false, day:  6 } },
  { rataDie:  645554, date: { year: 4869, month:  4, monthLeap: false, day:  5 } },
  { rataDie:  664224, date: { year: 4920, month:  5, monthLeap: false, day: 12 } },
  { rataDie:  671401, date: { year: 4940, month:  1, monthLeap: true,  day: 13 } },
  { rataDie:  694799, date: { year: 5004, month:  1, monthLeap: false, day: 23 } },
  { rataDie:  704424, date: { year: 5030, month:  5, monthLeap: false, day: 21 } },
  { rataDie:  708842, date: { year: 5042, month:  7, monthLeap: false, day:  9 } },
  { rataDie:  709409, date: { year: 5044, month:  1, monthLeap: false, day: 15 } },
  { rataDie:  709580, date: { year: 5044, month:  7, monthLeap: false, day:  9 } },
  { rataDie:  727274, date: { year: 5092, month: 12, monthLeap: false, day: 14 } },
  { rataDie:  728714, date: { year: 5096, month: 12, monthLeap: false, day:  7 } },
  { rataDie:  744313, date: { year: 5139, month:  8, monthLeap: false, day: 14 } },
  { rataDie:  764652, date: { year: 5195, month:  4, monthLeap: false, day:  6 } },
];

describe ('Hindu Lunar Old calendar spec', () => {
  it ('should convert a Hindu Lunar Old date to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn = rataDie + J0000;
      const actual = cal.toJdn (date.year, date.month, date.monthLeap, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hindu Lunar Old date', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn      = rataDie + J0000;
      const expected = { jdn, ...date };
      const actual   = cal.fromJdn (jdn);

      expect (expected).toEqual (actual);
      expect (expected.day).toBe (actual.getDay());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.monthLeap).toBe (actual.isMonthLeap());
      expect (expected.year).toBe (actual.getYear());
    });
  });

  it ('should establish whether a Hindu Lunar Old year is leap', () => {
    [ 2933, 3570, 3795, 4197, 4340, 4389, 4492, 4536, 4593, 4660, 4869, 4940 ].forEach (year => {
        const actual = cal.isLeapYear (year);
        expect (true).toBe (actual);
      });

    [ 2515, 3171, 3236, 3677, 4114, 4291, 4399, 4654, 4749, 4781, 4817, 4920, 5004, 5030, 5042, 5044, 5092, 5096, 5139, 5195 ].forEach (year => {
        const actual = cal.isLeapYear (year);
        expect (false).toBe (actual);
      });
  });

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (3570,  0, false,  1)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (3570, 13, false,  1)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (3570, 11, true ,  3)).not.toThrow ();
    expect (() => cal.toJdn (3570,  9, true ,  1)).toThrow (INVALID_LEAP_MONTH);
    expect (() => cal.toJdn (3570,  4, false,  0)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (3570,  4, false, 31)).toThrow (INVALID_DAY);
  });
});
