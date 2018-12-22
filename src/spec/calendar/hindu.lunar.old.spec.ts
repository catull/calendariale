import { INVALID_DAY, INVALID_LEAP_MONTH, INVALID_MONTH, J0000 } from '../../Const';
import { HinduLunarOldCalendar as cal } from '../../calendar/HinduLunarOldCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { year: 2515, month:  6, monthLeap: false, day: 11 } },
  { jdn:  -61387 + J0000, date: { year: 2933, month:  9, monthLeap: false, day: 26 } },
  { jdn:   25469 + J0000, date: { year: 3171, month:  8, monthLeap: false, day:  3 } },
  { jdn:   49217 + J0000, date: { year: 3236, month:  8, monthLeap: false, day:  9 } },
  { jdn:  171307 + J0000, date: { year: 3570, month: 11, monthLeap: true,  day: 19 } },
  { jdn:  210155 + J0000, date: { year: 3677, month:  3, monthLeap: false, day:  5 } },
  { jdn:  253427 + J0000, date: { year: 3795, month:  9, monthLeap: false, day: 15 } },
  { jdn:  369740 + J0000, date: { year: 4114, month:  2, monthLeap: false, day:  7 } },
  { jdn:  400085 + J0000, date: { year: 4197, month:  2, monthLeap: false, day: 24 } },
  { jdn:  434355 + J0000, date: { year: 4291, month:  1, monthLeap: false, day:  9 } },
  { jdn:  452605 + J0000, date: { year: 4340, month: 12, monthLeap: false, day:  9 } },
  { jdn:  470160 + J0000, date: { year: 4389, month:  1, monthLeap: false, day: 23 } },
  { jdn:  473837 + J0000, date: { year: 4399, month:  2, monthLeap: false, day:  8 } },
  { jdn:  507850 + J0000, date: { year: 4492, month:  4, monthLeap: false, day:  2 } },
  { jdn:  524156 + J0000, date: { year: 4536, month: 11, monthLeap: false, day:  7 } },
  { jdn:  544676 + J0000, date: { year: 4593, month:  1, monthLeap: false, day:  3 } },
  { jdn:  567118 + J0000, date: { year: 4654, month:  7, monthLeap: false, day:  2 } },
  { jdn:  569477 + J0000, date: { year: 4660, month: 11, monthLeap: false, day: 29 } },
  { jdn:  601716 + J0000, date: { year: 4749, month:  3, monthLeap: false, day: 20 } },
  { jdn:  613424 + J0000, date: { year: 4781, month:  4, monthLeap: false, day:  4 } },
  { jdn:  626596 + J0000, date: { year: 4817, month:  5, monthLeap: false, day:  6 } },
  { jdn:  645554 + J0000, date: { year: 4869, month:  4, monthLeap: false, day:  5 } },
  { jdn:  664224 + J0000, date: { year: 4920, month:  5, monthLeap: false, day: 12 } },
  { jdn:  671401 + J0000, date: { year: 4940, month:  1, monthLeap: true,  day: 13 } },
  { jdn:  694799 + J0000, date: { year: 5004, month:  1, monthLeap: false, day: 23 } },
  { jdn:  704424 + J0000, date: { year: 5030, month:  5, monthLeap: false, day: 21 } },
  { jdn:  708842 + J0000, date: { year: 5042, month:  7, monthLeap: false, day:  9 } },
  { jdn:  709409 + J0000, date: { year: 5044, month:  1, monthLeap: false, day: 15 } },
  { jdn:  709580 + J0000, date: { year: 5044, month:  7, monthLeap: false, day:  9 } },
  { jdn:  727274 + J0000, date: { year: 5092, month: 12, monthLeap: false, day: 14 } },
  { jdn:  728714 + J0000, date: { year: 5096, month: 12, monthLeap: false, day:  7 } },
  { jdn:  744313 + J0000, date: { year: 5139, month:  8, monthLeap: false, day: 14 } },
  { jdn:  764652 + J0000, date: { year: 5195, month:  4, monthLeap: false, day:  6 } },
];

describe ('Hindu Lunar Old calendar spec', () => {
  it ('should convert a Hindu Lunar Old date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.monthLeap, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hindu Lunar Old date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

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

  it ('should foo', () => {
    // let day = 19;
    // for (let index = 2458300.5; index < 2458448.5; index++) {
    //   const d = cal.fromJdn(index);
    //   if ((d.getDay() - day) > 1) {
    //     expect ({}).toEqual(d);
    //   }
    //   day = d.getDay();
    // }
    const date1 = cal.fromJdn(2458354.5);
    const date2 = cal.fromJdn(2458353.5);

    expect (date1).toEqual({ jdn: 2458354.5, year: 5119, month: 5, monthLeap: false, day: 14, });
    expect (date2).toEqual({ jdn: 2458353.5, year: 5119, month: 5, monthLeap: false, day: 12, });
    expect (() => cal.toJdn(5119,  5, false, 13)).toThrow(INVALID_DAY);
  });

});
