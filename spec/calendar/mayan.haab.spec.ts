/* global describe it: true */

'use strict';

const chai = require ('chai');
const cal = require ('../../build/calendar/MayanHaabCalendar.js').MayanHaabCalendar;
const Const = require ('../../build/Const.js');

require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data2 = [
  { 'rataDie': -214193, 'mayanHaab': { 'month': 11, 'day': 12 } },
  { 'rataDie':  -61387, 'mayanHaab': { 'month':  5, 'day':  3 } },
  { 'rataDie':   25469, 'mayanHaab': { 'month':  4, 'day':  9 } },
  { 'rataDie':   49217, 'mayanHaab': { 'month':  5, 'day': 12 } },
  { 'rataDie':  171307, 'mayanHaab': { 'month': 14, 'day': 12 } },
  { 'rataDie':  210155, 'mayanHaab': { 'month':  4, 'day':  5 } },
  { 'rataDie':  253427, 'mayanHaab': { 'month': 14, 'day':  7 } },
  { 'rataDie':  369740, 'mayanHaab': { 'month':  8, 'day':  5 } },
  { 'rataDie':  400085, 'mayanHaab': { 'month': 10, 'day': 15 } },
  { 'rataDie':  434355, 'mayanHaab': { 'month':  8, 'day': 15 } },
  { 'rataDie':  452605, 'mayanHaab': { 'month':  8, 'day': 15 } },
  { 'rataDie':  470160, 'mayanHaab': { 'month': 10, 'day': 10 } },
  { 'rataDie':  473837, 'mayanHaab': { 'month': 11, 'day': 17 } },
  { 'rataDie':  507850, 'mayanHaab': { 'month': 15, 'day':  5 } },
  { 'rataDie':  524156, 'mayanHaab': { 'month':  9, 'day':  6 } },
  { 'rataDie':  544676, 'mayanHaab': { 'month': 13, 'day':  6 } },
  { 'rataDie':  567118, 'mayanHaab': { 'month':  3, 'day': 18 } },
  { 'rataDie':  569477, 'mayanHaab': { 'month': 12, 'day':  7 } },
  { 'rataDie':  601716, 'mayanHaab': { 'month': 18, 'day':  6 } },
  { 'rataDie':  613424, 'mayanHaab': { 'month':  1, 'day':  9 } },
  { 'rataDie':  626596, 'mayanHaab': { 'month':  3, 'day':  1 } },
  { 'rataDie':  645554, 'mayanHaab': { 'month':  1, 'day': 19 } },
  { 'rataDie':  664224, 'mayanHaab': { 'month':  4, 'day': 14 } },
  { 'rataDie':  671401, 'mayanHaab': { 'month': 16, 'day': 16 } },
  { 'rataDie':  694799, 'mayanHaab': { 'month': 18, 'day': 14 } },
  { 'rataDie':  704424, 'mayanHaab': { 'month':  7, 'day':  4 } },
  { 'rataDie':  708842, 'mayanHaab': { 'month':  9, 'day':  2 } },
  { 'rataDie':  709409, 'mayanHaab': { 'month': 19, 'day':  4 } },
  { 'rataDie':  709580, 'mayanHaab': { 'month':  9, 'day': 10 } },
  { 'rataDie':  727274, 'mayanHaab': { 'month': 18, 'day':  4 } },
  { 'rataDie':  728714, 'mayanHaab': { 'month': 17, 'day':  4 } },
  { 'rataDie':  744313, 'mayanHaab': { 'month': 12, 'day':  8 } },
  { 'rataDie':  764652, 'mayanHaab': { 'month':  7, 'day':  7 } }
];

describe ('Mayan Haab calendar spec', function () {
  let date, julian, expected, actual;

  it ('should convert a Julian day to a Mayan Haab', function () {
    data2.forEach (function (data) {
      julian   = data.rataDie + Const.J0000;
      date     = data.mayanHaab;
      expected = { month: date.month, day: date.day };
      actual   = cal.fromJdn (julian);

      expect (expected).to.be.eql (actual);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });
});
