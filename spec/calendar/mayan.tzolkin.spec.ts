/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/MayanTzolkinCalendar.js').MayanTzolkinCalendar;
const Const = require ('../../lib/Const.js');

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data2 = [
  { 'rataDie': -214193, 'mayanTzolkin': { 'month':  5, 'day':  9 } },
  { 'rataDie':  -61387, 'mayanTzolkin': { 'month':  9, 'day': 15 } },
  { 'rataDie':   25469, 'mayanTzolkin': { 'month': 12, 'day': 11 } },
  { 'rataDie':   49217, 'mayanTzolkin': { 'month':  9, 'day': 19 } },
  { 'rataDie':  171307, 'mayanTzolkin': { 'month':  3, 'day':  9 } },
  { 'rataDie':  210155, 'mayanTzolkin': { 'month':  7, 'day': 17 } },
  { 'rataDie':  253427, 'mayanTzolkin': { 'month':  2, 'day':  9 } },
  { 'rataDie':  369740, 'mayanTzolkin': { 'month':  4, 'day':  2 } },
  { 'rataDie':  400085, 'mayanTzolkin': { 'month':  7, 'day':  7 } },
  { 'rataDie':  434355, 'mayanTzolkin': { 'month':  9, 'day': 17 } },
  { 'rataDie':  452605, 'mayanTzolkin': { 'month':  7, 'day':  7 } },
  { 'rataDie':  470160, 'mayanTzolkin': { 'month': 12, 'day':  2 } },
  { 'rataDie':  473837, 'mayanTzolkin': { 'month': 10, 'day': 19 } },
  { 'rataDie':  507850, 'mayanTzolkin': { 'month':  2, 'day': 12 } },
  { 'rataDie':  524156, 'mayanTzolkin': { 'month':  6, 'day': 18 } },
  { 'rataDie':  544676, 'mayanTzolkin': { 'month': 12, 'day': 18 } },
  { 'rataDie':  567118, 'mayanTzolkin': { 'month':  3, 'day': 20 } },
  { 'rataDie':  569477, 'mayanTzolkin': { 'month':  9, 'day': 19 } },
  { 'rataDie':  601716, 'mayanTzolkin': { 'month':  8, 'day': 18 } },
  { 'rataDie':  613424, 'mayanTzolkin': { 'month':  3, 'day':  6 } },
  { 'rataDie':  626596, 'mayanTzolkin': { 'month':  6, 'day': 18 } },
  { 'rataDie':  645554, 'mayanTzolkin': { 'month': 10, 'day': 16 } },
  { 'rataDie':  664224, 'mayanTzolkin': { 'month': 12, 'day':  6 } },
  { 'rataDie':  671401, 'mayanTzolkin': { 'month': 13, 'day':  3 } },
  { 'rataDie':  694799, 'mayanTzolkin': { 'month': 11, 'day':  1 } },
  { 'rataDie':  704424, 'mayanTzolkin': { 'month':  3, 'day':  6 } },
  { 'rataDie':  708842, 'mayanTzolkin': { 'month':  1, 'day':  4 } },
  { 'rataDie':  709409, 'mayanTzolkin': { 'month':  9, 'day': 11 } },
  { 'rataDie':  709580, 'mayanTzolkin': { 'month': 11, 'day':  2 } },
  { 'rataDie':  727274, 'mayanTzolkin': { 'month': 12, 'day': 16 } },
  { 'rataDie':  728714, 'mayanTzolkin': { 'month':  9, 'day': 16 } },
  { 'rataDie':  744313, 'mayanTzolkin': { 'month':  8, 'day': 15 } },
  { 'rataDie':  764652, 'mayanTzolkin': { 'month':  2, 'day': 14 } }
];

describe ('Mayan Tzolkin calendar spec', function () {
  let date, julian, expected, actual;

  it ('should convert a Julian day to a Mayan Tzolkin', function () {
    data2.forEach (function (data) {
      julian   = data.rataDie + Const.J0000;
      date     = data.mayanTzolkin;
      expected = { month: date.month, day: date.day };
      actual   = cal.fromJdn (julian);

      // expect (expected).to.be.eql (actual);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });
});
