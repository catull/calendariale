import { J0000 } from '../../Const';

import { AztecTonalpohualliCalendar as cal } from '../../calendar/AztecTonalpohualliCalendar';

const dates = [
  { rataDie: -214193, date: { num:  5, name:  9 } },
  { rataDie:  -61387, date: { num:  9, name: 15 } },
  { rataDie:   25469, date: { num: 12, name: 11 } },
  { rataDie:   49217, date: { num:  9, name: 19 } },
  { rataDie:  171307, date: { num:  3, name:  9 } },
  { rataDie:  210155, date: { num:  7, name: 17 } },
  { rataDie:  253427, date: { num:  2, name:  9 } },
  { rataDie:  369740, date: { num:  4, name:  2 } },
  { rataDie:  400085, date: { num:  7, name:  7 } },
  { rataDie:  434355, date: { num:  9, name: 17 } },
  { rataDie:  452605, date: { num:  7, name:  7 } },
  { rataDie:  470160, date: { num: 12, name:  2 } },
  { rataDie:  473837, date: { num: 10, name: 19 } },
  { rataDie:  507850, date: { num:  2, name: 12 } },
  { rataDie:  524156, date: { num:  6, name: 18 } },
  { rataDie:  544676, date: { num: 12, name: 18 } },
  { rataDie:  567118, date: { num:  3, name: 20 } },
  { rataDie:  569477, date: { num:  9, name: 19 } },
  { rataDie:  601716, date: { num:  8, name: 18 } },
  { rataDie:  613424, date: { num:  3, name:  6 } },
  { rataDie:  626596, date: { num:  6, name: 18 } },
  { rataDie:  645554, date: { num: 10, name: 16 } },
  { rataDie:  664224, date: { num: 12, name:  6 } },
  { rataDie:  671401, date: { num: 13, name:  3 } },
  { rataDie:  694799, date: { num: 11, name:  1 } },
  { rataDie:  704424, date: { num:  3, name:  6 } },
  { rataDie:  708842, date: { num:  1, name:  4 } },
  { rataDie:  709409, date: { num:  9, name: 11 } },
  { rataDie:  709580, date: { num: 11, name:  2 } },
  { rataDie:  727274, date: { num: 12, name: 16 } },
  { rataDie:  728714, date: { num:  9, name: 16 } },
  { rataDie:  744313, date: { num:  8, name: 15 } },
  { rataDie:  764652, date: { num:  2, name: 14 } },
];

describe ('Aztec Tonalpohualli calendar spec', () => {
  it ('should convert a Julian day to a Aztec Tonalpohualli', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn      = rataDie + J0000;
      const expected = { jdn, ...date };
      const actual   = cal.fromJdn (jdn);

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
