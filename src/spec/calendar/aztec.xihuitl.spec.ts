import { AztecXihuitlCalendar as cal } from '../../calendar/AztecXihuitlCalendar';
import { AztecXihuitlDate } from '../../calendar/AztecXihuitlDate';

const dates = [
  { rataDie: -214193, date: { month:  2, day:  6 } },
  { rataDie:  -61387, date: { month: 14, day:  2 } },
  { rataDie:   25469, date: { month: 13, day:  8 } },
  { rataDie:   49217, date: { month: 14, day: 11 } },
  { rataDie:  171307, date: { month:  5, day:  6 } },
  { rataDie:  210155, date: { month: 13, day:  4 } },
  { rataDie:  253427, date: { month:  5, day:  1 } },
  { rataDie:  369740, date: { month: 17, day:  4 } },
  { rataDie:  400085, date: { month:  1, day:  9 } },
  { rataDie:  434355, date: { month: 17, day: 14 } },
  { rataDie:  452605, date: { month: 17, day: 14 } },
  { rataDie:  470160, date: { month:  1, day:  4 } },
  { rataDie:  473837, date: { month:  2, day: 11 } },
  { rataDie:  507850, date: { month:  5, day: 19 } },
  { rataDie:  524156, date: { month: 18, day:  5 } },
  { rataDie:  544676, date: { month:  3, day: 20 } },
  { rataDie:  567118, date: { month: 12, day: 17 } },
  { rataDie:  569477, date: { month:  3, day:  1 } },
  { rataDie:  601716, date: { month:  8, day: 20 } },
  { rataDie:  613424, date: { month: 10, day:  8 } },
  { rataDie:  626596, date: { month: 11, day: 20 } },
  { rataDie:  645554, date: { month: 10, day: 18 } },
  { rataDie:  664224, date: { month: 13, day: 13 } },
  { rataDie:  671401, date: { month:  7, day: 10 } },
  { rataDie:  694799, date: { month:  9, day:  8 } },
  { rataDie:  704424, date: { month: 16, day:  3 } },
  { rataDie:  708842, date: { month: 18, day:  1 } },
  { rataDie:  709409, date: { month:  9, day: 18 } },
  { rataDie:  709580, date: { month: 18, day:  9 } },
  { rataDie:  727274, date: { month:  8, day: 18 } },
  { rataDie:  728714, date: { month:  7, day: 18 } },
  { rataDie:  744313, date: { month:  3, day:  2 } },
  { rataDie:  764652, date: { month: 16, day:  6 } },
];

describe ('Aztec Xihuitl calendar spec', () => {
  it ('should convert a Julian day to a Aztec Xihuitl', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.fromRd (rataDie) as AztecXihuitlDate;
      const jdn      = actual.getJdn();
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
