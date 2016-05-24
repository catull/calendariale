/* global describe it: true */

'use strict';

const chai = require ('chai');
const astro = require ('../../build/Calendrical/Astro.js');
const Const = require ('../../build/Calendrical/Const.js');
const cal = require ('../../build/Calendrical/calendar/HebrewCalendar.js').HebrewCalendar;

require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data3 = [
  { 'rataDie': -214193, 'hebrew': { 'year': 3174, 'month':  5, 'day': 10 } },
  { 'rataDie':  -61387, 'hebrew': { 'year': 3593, 'month':  9, 'day': 25 } },
  { 'rataDie':   25469, 'hebrew': { 'year': 3831, 'month':  7, 'day':  3 } },
  { 'rataDie':   49217, 'hebrew': { 'year': 3896, 'month':  7, 'day':  9 } },
  { 'rataDie':  171307, 'hebrew': { 'year': 4230, 'month': 10, 'day': 18 } },
  { 'rataDie':  210155, 'hebrew': { 'year': 4336, 'month':  3, 'day':  4 } },
  { 'rataDie':  253427, 'hebrew': { 'year': 4455, 'month':  8, 'day': 13 } },
  { 'rataDie':  369740, 'hebrew': { 'year': 4773, 'month':  2, 'day':  6 } },
  { 'rataDie':  400085, 'hebrew': { 'year': 4856, 'month':  2, 'day': 23 } },
  { 'rataDie':  434355, 'hebrew': { 'year': 4950, 'month':  1, 'day':  7 } },
  { 'rataDie':  452605, 'hebrew': { 'year': 5000, 'month': 13, 'day':  8 } },
  { 'rataDie':  470160, 'hebrew': { 'year': 5048, 'month':  1, 'day': 21 } },
  { 'rataDie':  473837, 'hebrew': { 'year': 5058, 'month':  2, 'day':  7 } },
  { 'rataDie':  507850, 'hebrew': { 'year': 5151, 'month':  4, 'day':  1 } },
  { 'rataDie':  524156, 'hebrew': { 'year': 5196, 'month': 11, 'day':  7 } },
  { 'rataDie':  544676, 'hebrew': { 'year': 5252, 'month':  1, 'day':  3 } },
  { 'rataDie':  567118, 'hebrew': { 'year': 5314, 'month':  7, 'day':  1 } },
  { 'rataDie':  569477, 'hebrew': { 'year': 5320, 'month': 12, 'day': 27 } },
  { 'rataDie':  601716, 'hebrew': { 'year': 5408, 'month':  3, 'day': 20 } },
  { 'rataDie':  613424, 'hebrew': { 'year': 5440, 'month':  4, 'day':  3 } },
  { 'rataDie':  626596, 'hebrew': { 'year': 5476, 'month':  5, 'day':  5 } },
  { 'rataDie':  645554, 'hebrew': { 'year': 5528, 'month':  4, 'day':  4 } },
  { 'rataDie':  664224, 'hebrew': { 'year': 5579, 'month':  5, 'day': 11 } },
  { 'rataDie':  671401, 'hebrew': { 'year': 5599, 'month':  1, 'day': 12 } },
  { 'rataDie':  694799, 'hebrew': { 'year': 5663, 'month':  1, 'day': 22 } },
  { 'rataDie':  704424, 'hebrew': { 'year': 5689, 'month':  5, 'day': 19 } },
  { 'rataDie':  708842, 'hebrew': { 'year': 5702, 'month':  7, 'day':  8 } },
  { 'rataDie':  709409, 'hebrew': { 'year': 5703, 'month':  1, 'day': 14 } },
  { 'rataDie':  709580, 'hebrew': { 'year': 5704, 'month':  7, 'day':  8 } },
  { 'rataDie':  727274, 'hebrew': { 'year': 5752, 'month': 13, 'day': 12 } },
  { 'rataDie':  728714, 'hebrew': { 'year': 5756, 'month': 12, 'day':  5 } },
  { 'rataDie':  744313, 'hebrew': { 'year': 5799, 'month':  8, 'day': 12 } },
  { 'rataDie':  764652, 'hebrew': { 'year': 5854, 'month':  5, 'day':  5 } }
];

describe ('Hebrew calendar spec', function () {
  let date, expected, actual;

  it ('should convert a Hebrew date to Julian day', function () {
    data3.forEach (function (data) {
      date = data.hebrew;
      expected = data.rataDie + Const.J0000;
      actual = cal.toJdn (date.year, date.month, date.day);

      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Hebrew date', function () {
    data3.forEach (function (data) {
      date = data.hebrew;
      expected = { year: date.year, month: date.month, day: date.day };
      actual = cal.fromJdn (data.rataDie + Const.J0000);

      // expect (expected).to.be.eql (actual);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('should determine whether a Hebrew year is leap year', function () {
    [ 5700, 5703, 5706, 5708, 5711, 5714, 5717 ].forEach (function (year) {
      expect (cal.isLeapYear (year)).to.be.equal (true);
    });

    [ 5699, 5701, 5702, 5704, 5705, 5709, 5710 ].forEach (function (year) {
      expect (cal.isLeapYear (year)).to.be.equal (false);
    });
  });
});
