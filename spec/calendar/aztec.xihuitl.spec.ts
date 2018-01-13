/* global describe it: true */

import { expect } from 'chai';
import 'dirty-chai';
import { describe, it } from 'mocha';

import { J0000 } from '../../lib/Const';
import { AztecXihuitlCalendar as cal } from '../../lib/calendar/AztecXihuitlCalendar';

const data2 = [
  { 'rataDie': -214193, 'aztecXihuitl': { 'month':  2, 'day':  6 } },
  { 'rataDie':  -61387, 'aztecXihuitl': { 'month': 14, 'day':  2 } },
  { 'rataDie':   25469, 'aztecXihuitl': { 'month': 13, 'day':  8 } },
  { 'rataDie':   49217, 'aztecXihuitl': { 'month': 14, 'day': 11 } },
  { 'rataDie':  171307, 'aztecXihuitl': { 'month':  5, 'day':  6 } },
  { 'rataDie':  210155, 'aztecXihuitl': { 'month': 13, 'day':  4 } },
  { 'rataDie':  253427, 'aztecXihuitl': { 'month':  5, 'day':  1 } },
  { 'rataDie':  369740, 'aztecXihuitl': { 'month': 17, 'day':  4 } },
  { 'rataDie':  400085, 'aztecXihuitl': { 'month':  1, 'day':  9 } },
  { 'rataDie':  434355, 'aztecXihuitl': { 'month': 17, 'day': 14 } },
  { 'rataDie':  452605, 'aztecXihuitl': { 'month': 17, 'day': 14 } },
  { 'rataDie':  470160, 'aztecXihuitl': { 'month':  1, 'day':  4 } },
  { 'rataDie':  473837, 'aztecXihuitl': { 'month':  2, 'day': 11 } },
  { 'rataDie':  507850, 'aztecXihuitl': { 'month':  5, 'day': 19 } },
  { 'rataDie':  524156, 'aztecXihuitl': { 'month': 18, 'day':  5 } },
  { 'rataDie':  544676, 'aztecXihuitl': { 'month':  3, 'day': 20 } },
  { 'rataDie':  567118, 'aztecXihuitl': { 'month': 12, 'day': 17 } },
  { 'rataDie':  569477, 'aztecXihuitl': { 'month':  3, 'day':  1 } },
  { 'rataDie':  601716, 'aztecXihuitl': { 'month':  8, 'day': 20 } },
  { 'rataDie':  613424, 'aztecXihuitl': { 'month': 10, 'day':  8 } },
  { 'rataDie':  626596, 'aztecXihuitl': { 'month': 11, 'day': 20 } },
  { 'rataDie':  645554, 'aztecXihuitl': { 'month': 10, 'day': 18 } },
  { 'rataDie':  664224, 'aztecXihuitl': { 'month': 13, 'day': 13 } },
  { 'rataDie':  671401, 'aztecXihuitl': { 'month':  7, 'day': 10 } },
  { 'rataDie':  694799, 'aztecXihuitl': { 'month':  9, 'day':  8 } },
  { 'rataDie':  704424, 'aztecXihuitl': { 'month': 16, 'day':  3 } },
  { 'rataDie':  708842, 'aztecXihuitl': { 'month': 18, 'day':  1 } },
  { 'rataDie':  709409, 'aztecXihuitl': { 'month':  9, 'day': 18 } },
  { 'rataDie':  709580, 'aztecXihuitl': { 'month': 18, 'day':  9 } },
  { 'rataDie':  727274, 'aztecXihuitl': { 'month':  8, 'day': 18 } },
  { 'rataDie':  728714, 'aztecXihuitl': { 'month':  7, 'day': 18 } },
  { 'rataDie':  744313, 'aztecXihuitl': { 'month':  3, 'day':  2 } },
  { 'rataDie':  764652, 'aztecXihuitl': { 'month': 16, 'day':  6 } }
];

describe ('Aztec Xihuitl calendar spec', () => {
  let date, julian, expected, actual;

  it ('should convert a Julian day to a Aztec Xihuitl', () => {
    data2.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.aztecXihuitl;
      expected = { jdn: julian, month: date.month, day: date.day };
      actual   = cal.fromJdn (julian);

      expect (expected).to.be.eql (actual);
      // expect (expected.month).to.be.equal (actual.month);
      // expect (expected.day).to.be.equal (actual.day);
    });
  });
});
