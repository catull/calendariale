/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/AztecTonalpohualliCalendar.js').AztecTonalpohualliCalendar;
const Const = require ('../../lib/Const.js');

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data2 = [
  { 'rataDie': -214193, 'aztecTonalpohualli': { 'number':  5, 'name':  9 } },
  { 'rataDie':  -61387, 'aztecTonalpohualli': { 'number':  9, 'name': 15 } },
  { 'rataDie':   25469, 'aztecTonalpohualli': { 'number': 12, 'name': 11 } },
  { 'rataDie':   49217, 'aztecTonalpohualli': { 'number':  9, 'name': 19 } },
  { 'rataDie':  171307, 'aztecTonalpohualli': { 'number':  3, 'name':  9 } },
  { 'rataDie':  210155, 'aztecTonalpohualli': { 'number':  7, 'name': 17 } },
  { 'rataDie':  253427, 'aztecTonalpohualli': { 'number':  2, 'name':  9 } },
  { 'rataDie':  369740, 'aztecTonalpohualli': { 'number':  4, 'name':  2 } },
  { 'rataDie':  400085, 'aztecTonalpohualli': { 'number':  7, 'name':  7 } },
  { 'rataDie':  434355, 'aztecTonalpohualli': { 'number':  9, 'name': 17 } },
  { 'rataDie':  452605, 'aztecTonalpohualli': { 'number':  7, 'name':  7 } },
  { 'rataDie':  470160, 'aztecTonalpohualli': { 'number': 12, 'name':  2 } },
  { 'rataDie':  473837, 'aztecTonalpohualli': { 'number': 10, 'name': 19 } },
  { 'rataDie':  507850, 'aztecTonalpohualli': { 'number':  2, 'name': 12 } },
  { 'rataDie':  524156, 'aztecTonalpohualli': { 'number':  6, 'name': 18 } },
  { 'rataDie':  544676, 'aztecTonalpohualli': { 'number': 12, 'name': 18 } },
  { 'rataDie':  567118, 'aztecTonalpohualli': { 'number':  3, 'name': 20 } },
  { 'rataDie':  569477, 'aztecTonalpohualli': { 'number':  9, 'name': 19 } },
  { 'rataDie':  601716, 'aztecTonalpohualli': { 'number':  8, 'name': 18 } },
  { 'rataDie':  613424, 'aztecTonalpohualli': { 'number':  3, 'name':  6 } },
  { 'rataDie':  626596, 'aztecTonalpohualli': { 'number':  6, 'name': 18 } },
  { 'rataDie':  645554, 'aztecTonalpohualli': { 'number': 10, 'name': 16 } },
  { 'rataDie':  664224, 'aztecTonalpohualli': { 'number': 12, 'name':  6 } },
  { 'rataDie':  671401, 'aztecTonalpohualli': { 'number': 13, 'name':  3 } },
  { 'rataDie':  694799, 'aztecTonalpohualli': { 'number': 11, 'name':  1 } },
  { 'rataDie':  704424, 'aztecTonalpohualli': { 'number':  3, 'name':  6 } },
  { 'rataDie':  708842, 'aztecTonalpohualli': { 'number':  1, 'name':  4 } },
  { 'rataDie':  709409, 'aztecTonalpohualli': { 'number':  9, 'name': 11 } },
  { 'rataDie':  709580, 'aztecTonalpohualli': { 'number': 11, 'name':  2 } },
  { 'rataDie':  727274, 'aztecTonalpohualli': { 'number': 12, 'name': 16 } },
  { 'rataDie':  728714, 'aztecTonalpohualli': { 'number':  9, 'name': 16 } },
  { 'rataDie':  744313, 'aztecTonalpohualli': { 'number':  8, 'name': 15 } },
  { 'rataDie':  764652, 'aztecTonalpohualli': { 'number':  2, 'name': 14 } }
];

describe ('Aztec Tonalpohualli calendar spec', function () {
  let date, julian, expected, actual;

  it ('should convert a Julian day to a Aztec Tonalpohualli', function () {
    data2.forEach (function (data) {
      julian   = data.rataDie + Const.J0000;
      date     = data.aztecTonalpohualli;
      expected = { number: date.number, name: date.name };
      actual   = cal.fromJdn (julian);

      // expect (expected).to.be.eql (actual);
      expect (expected.number).to.be.equal (actual.number);
      expect (expected.name).to.be.equal (actual.name);
    });
  });
});
