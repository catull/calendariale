/* global describe it: true */

import { J0000 } from '../../Const';

import { AztecTonalpohualliCalendar as cal, AztecTonalpohualliCalendar } from '../../calendar/AztecTonalpohualliCalendar';

const data2 = [
  { 'rataDie': -214193, 'aztecTonalpohualli': { 'num':  5, 'name':  9 } },
  { 'rataDie':  -61387, 'aztecTonalpohualli': { 'num':  9, 'name': 15 } },
  { 'rataDie':   25469, 'aztecTonalpohualli': { 'num': 12, 'name': 11 } },
  { 'rataDie':   49217, 'aztecTonalpohualli': { 'num':  9, 'name': 19 } },
  { 'rataDie':  171307, 'aztecTonalpohualli': { 'num':  3, 'name':  9 } },
  { 'rataDie':  210155, 'aztecTonalpohualli': { 'num':  7, 'name': 17 } },
  { 'rataDie':  253427, 'aztecTonalpohualli': { 'num':  2, 'name':  9 } },
  { 'rataDie':  369740, 'aztecTonalpohualli': { 'num':  4, 'name':  2 } },
  { 'rataDie':  400085, 'aztecTonalpohualli': { 'num':  7, 'name':  7 } },
  { 'rataDie':  434355, 'aztecTonalpohualli': { 'num':  9, 'name': 17 } },
  { 'rataDie':  452605, 'aztecTonalpohualli': { 'num':  7, 'name':  7 } },
  { 'rataDie':  470160, 'aztecTonalpohualli': { 'num': 12, 'name':  2 } },
  { 'rataDie':  473837, 'aztecTonalpohualli': { 'num': 10, 'name': 19 } },
  { 'rataDie':  507850, 'aztecTonalpohualli': { 'num':  2, 'name': 12 } },
  { 'rataDie':  524156, 'aztecTonalpohualli': { 'num':  6, 'name': 18 } },
  { 'rataDie':  544676, 'aztecTonalpohualli': { 'num': 12, 'name': 18 } },
  { 'rataDie':  567118, 'aztecTonalpohualli': { 'num':  3, 'name': 20 } },
  { 'rataDie':  569477, 'aztecTonalpohualli': { 'num':  9, 'name': 19 } },
  { 'rataDie':  601716, 'aztecTonalpohualli': { 'num':  8, 'name': 18 } },
  { 'rataDie':  613424, 'aztecTonalpohualli': { 'num':  3, 'name':  6 } },
  { 'rataDie':  626596, 'aztecTonalpohualli': { 'num':  6, 'name': 18 } },
  { 'rataDie':  645554, 'aztecTonalpohualli': { 'num': 10, 'name': 16 } },
  { 'rataDie':  664224, 'aztecTonalpohualli': { 'num': 12, 'name':  6 } },
  { 'rataDie':  671401, 'aztecTonalpohualli': { 'num': 13, 'name':  3 } },
  { 'rataDie':  694799, 'aztecTonalpohualli': { 'num': 11, 'name':  1 } },
  { 'rataDie':  704424, 'aztecTonalpohualli': { 'num':  3, 'name':  6 } },
  { 'rataDie':  708842, 'aztecTonalpohualli': { 'num':  1, 'name':  4 } },
  { 'rataDie':  709409, 'aztecTonalpohualli': { 'num':  9, 'name': 11 } },
  { 'rataDie':  709580, 'aztecTonalpohualli': { 'num': 11, 'name':  2 } },
  { 'rataDie':  727274, 'aztecTonalpohualli': { 'num': 12, 'name': 16 } },
  { 'rataDie':  728714, 'aztecTonalpohualli': { 'num':  9, 'name': 16 } },
  { 'rataDie':  744313, 'aztecTonalpohualli': { 'num':  8, 'name': 15 } },
  { 'rataDie':  764652, 'aztecTonalpohualli': { 'num':  2, 'name': 14 } }
];

describe ('Aztec Tonalpohualli calendar spec', () => {
  let date;
  let julian;
  let expected;
  let actual;

  it ('should convert a Julian day to a Aztec Tonalpohualli', () => {
    data2.forEach ((data) => {
      julian   = data.rataDie + J0000;
      date     = data.aztecTonalpohualli;
      expected = { jdn: julian, num: date.num, name: date.name };
      actual   = cal.fromJdn (julian);

      expect (expected).toEqual (actual);
      expect (expected.num).toBe (actual.getNumber());
      expect (expected.name).toBe (actual.getName());
    });
  });

  it ('should calculate an Aztec Tonalpohualli ordinal', () => {
    const ordinal = AztecTonalpohualliCalendar.toOrdinal(10, 10);
    expect(ordinal).toBeLessThan (260);
    expect(ordinal).toBe (9);
  });

  it ('should interpolate an Aztec Tonalpohualli date', () => {
    const jdn = AztecTonalpohualliCalendar.onOrBefore(10, 10, 2451544.5); // gregorian: 2000/01/01
    expect(jdn).toBe (2451452.5); // gregorian: 1999/10/01
  });

});
