import { J0000 } from '../../Const';
import { AztecTonalpohualliCalendar as cal } from '../../calendar/AztecTonalpohualliCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { num:  5, name:  9 } },
  { jdn:  -61387 + J0000, date: { num:  9, name: 15 } },
  { jdn:   25469 + J0000, date: { num: 12, name: 11 } },
  { jdn:   49217 + J0000, date: { num:  9, name: 19 } },
  { jdn:  171307 + J0000, date: { num:  3, name:  9 } },
  { jdn:  210155 + J0000, date: { num:  7, name: 17 } },
  { jdn:  253427 + J0000, date: { num:  2, name:  9 } },
  { jdn:  369740 + J0000, date: { num:  4, name:  2 } },
  { jdn:  400085 + J0000, date: { num:  7, name:  7 } },
  { jdn:  434355 + J0000, date: { num:  9, name: 17 } },
  { jdn:  452605 + J0000, date: { num:  7, name:  7 } },
  { jdn:  470160 + J0000, date: { num: 12, name:  2 } },
  { jdn:  473837 + J0000, date: { num: 10, name: 19 } },
  { jdn:  507850 + J0000, date: { num:  2, name: 12 } },
  { jdn:  524156 + J0000, date: { num:  6, name: 18 } },
  { jdn:  544676 + J0000, date: { num: 12, name: 18 } },
  { jdn:  567118 + J0000, date: { num:  3, name: 20 } },
  { jdn:  569477 + J0000, date: { num:  9, name: 19 } },
  { jdn:  601716 + J0000, date: { num:  8, name: 18 } },
  { jdn:  613424 + J0000, date: { num:  3, name:  6 } },
  { jdn:  626596 + J0000, date: { num:  6, name: 18 } },
  { jdn:  645554 + J0000, date: { num: 10, name: 16 } },
  { jdn:  664224 + J0000, date: { num: 12, name:  6 } },
  { jdn:  671401 + J0000, date: { num: 13, name:  3 } },
  { jdn:  694799 + J0000, date: { num: 11, name:  1 } },
  { jdn:  704424 + J0000, date: { num:  3, name:  6 } },
  { jdn:  708842 + J0000, date: { num:  1, name:  4 } },
  { jdn:  709409 + J0000, date: { num:  9, name: 11 } },
  { jdn:  709580 + J0000, date: { num: 11, name:  2 } },
  { jdn:  727274 + J0000, date: { num: 12, name: 16 } },
  { jdn:  728714 + J0000, date: { num:  9, name: 16 } },
  { jdn:  744313 + J0000, date: { num:  8, name: 15 } },
  { jdn:  764652 + J0000, date: { num:  2, name: 14 } },
];

describe ('Aztec Tonalpohualli calendar spec', () => {
  it ('should convert a Julian day to a Aztec Tonalpohualli', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (date.num).toBe (actual.getNumber());
      expect (date.name).toBe (actual.getName());
    });
  });

  it ('should calculate an Aztec Tonalpohualli ordinal', () => {
    const ordinal = cal.toOrdinal(10, 10);
    expect(ordinal).toBeLessThan (260);
    expect(ordinal).toBe (9);
  });

  it ('should interpolate an Aztec Tonalpohualli date', () => {
    const jdn = cal.onOrBefore(10, 10, 2451544.5); // gregorian: 2000/01/01
    expect(jdn).toBe (2451452.5); // gregorian: 1999/10/01
  });

});
