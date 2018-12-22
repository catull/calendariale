import { J0000 } from '../../Const';
import { AztecXihuitlCalendar as cal } from '../../calendar/AztecXihuitlCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { month:  2, day:  6 } },
  { jdn:  -61387 + J0000, date: { month: 14, day:  2 } },
  { jdn:   25469 + J0000, date: { month: 13, day:  8 } },
  { jdn:   49217 + J0000, date: { month: 14, day: 11 } },
  { jdn:  171307 + J0000, date: { month:  5, day:  6 } },
  { jdn:  210155 + J0000, date: { month: 13, day:  4 } },
  { jdn:  253427 + J0000, date: { month:  5, day:  1 } },
  { jdn:  369740 + J0000, date: { month: 17, day:  4 } },
  { jdn:  400085 + J0000, date: { month:  1, day:  9 } },
  { jdn:  434355 + J0000, date: { month: 17, day: 14 } },
  { jdn:  452605 + J0000, date: { month: 17, day: 14 } },
  { jdn:  470160 + J0000, date: { month:  1, day:  4 } },
  { jdn:  473837 + J0000, date: { month:  2, day: 11 } },
  { jdn:  507850 + J0000, date: { month:  5, day: 19 } },
  { jdn:  524156 + J0000, date: { month: 18, day:  5 } },
  { jdn:  544676 + J0000, date: { month:  3, day: 20 } },
  { jdn:  567118 + J0000, date: { month: 12, day: 17 } },
  { jdn:  569477 + J0000, date: { month:  3, day:  1 } },
  { jdn:  601716 + J0000, date: { month:  8, day: 20 } },
  { jdn:  613424 + J0000, date: { month: 10, day:  8 } },
  { jdn:  626596 + J0000, date: { month: 11, day: 20 } },
  { jdn:  645554 + J0000, date: { month: 10, day: 18 } },
  { jdn:  664224 + J0000, date: { month: 13, day: 13 } },
  { jdn:  671401 + J0000, date: { month:  7, day: 10 } },
  { jdn:  694799 + J0000, date: { month:  9, day:  8 } },
  { jdn:  704424 + J0000, date: { month: 16, day:  3 } },
  { jdn:  708842 + J0000, date: { month: 18, day:  1 } },
  { jdn:  709409 + J0000, date: { month:  9, day: 18 } },
  { jdn:  709580 + J0000, date: { month: 18, day:  9 } },
  { jdn:  727274 + J0000, date: { month:  8, day: 18 } },
  { jdn:  728714 + J0000, date: { month:  7, day: 18 } },
  { jdn:  744313 + J0000, date: { month:  3, day:  2 } },
  { jdn:  764652 + J0000, date: { month: 16, day:  6 } },
];

describe ('Aztec Xihuitl calendar spec', () => {
  it ('should convert a Julian day to a Aztec Xihuitl', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should calculate an Aztec Xihuitl ordinal', () => {
    const ordinal = cal.toOrdinal(10, 10);
    expect(ordinal).toBeLessThan (260);
    expect(ordinal).toBe (189);
  });

  it ('should interpolate an Aztec Xihuitl date', () => {
    const jdn = cal.onOrBefore(10, 10, 2451544.5); // gregorian: 2000/01/01
    expect(jdn).toBe (2451285.5); // gregorian: 1999/04/17
  });

});
