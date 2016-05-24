/* global describe it: true */

'use strict';

const chai = require ('chai');
const astro = require ('../../build/Calendrical/Astro.js');
const Const = require ('../../build/Calendrical/Const.js');
const cal = require ('../../build/Calendrical/calendar/PersianArithmeticCalendar.js').PersianArithmeticCalendar;

require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data3 = [
  { 'rataDie': -214193, 'persianArith': { 'year': -1208, 'month':  5, 'day':  1 } },
  { 'rataDie':  -61387, 'persianArith': { 'year':  -790, 'month':  9, 'day': 14 } },
  { 'rataDie':   25469, 'persianArith': { 'year':  -552, 'month':  7, 'day':  2 } },
  { 'rataDie':   49217, 'persianArith': { 'year':  -487, 'month':  7, 'day':  9 } },
  { 'rataDie':  171307, 'persianArith': { 'year':  -153, 'month': 10, 'day': 18 } },
  { 'rataDie':  210155, 'persianArith': { 'year':   -46, 'month':  2, 'day': 30 } },
  { 'rataDie':  253427, 'persianArith': { 'year':    73, 'month':  8, 'day': 19 } },
  { 'rataDie':  369740, 'persianArith': { 'year':   392, 'month':  2, 'day':  5 } },
  { 'rataDie':  400085, 'persianArith': { 'year':   475, 'month':  3, 'day':  3 } },
  { 'rataDie':  434355, 'persianArith': { 'year':   569, 'month':  1, 'day':  3 } },
  { 'rataDie':  452605, 'persianArith': { 'year':   618, 'month': 12, 'day': 20 } },
  { 'rataDie':  470160, 'persianArith': { 'year':   667, 'month':  1, 'day': 14 } },
  { 'rataDie':  473837, 'persianArith': { 'year':   677, 'month':  2, 'day':  8 } },
  { 'rataDie':  507850, 'persianArith': { 'year':   770, 'month':  3, 'day': 22 } },
  { 'rataDie':  524156, 'persianArith': { 'year':   814, 'month': 11, 'day': 13 } },
  { 'rataDie':  544676, 'persianArith': { 'year':   871, 'month':  1, 'day': 21 } },
  { 'rataDie':  567118, 'persianArith': { 'year':   932, 'month':  6, 'day': 28 } },
  { 'rataDie':  569477, 'persianArith': { 'year':   938, 'month': 12, 'day': 14 } },
  { 'rataDie':  601716, 'persianArith': { 'year':  1027, 'month':  3, 'day': 21 } },
  { 'rataDie':  613424, 'persianArith': { 'year':  1059, 'month':  4, 'day': 10 } },
  { 'rataDie':  626596, 'persianArith': { 'year':  1095, 'month':  5, 'day':  2 } },
  { 'rataDie':  645554, 'persianArith': { 'year':  1147, 'month':  3, 'day': 30 } },
  { 'rataDie':  664224, 'persianArith': { 'year':  1198, 'month':  5, 'day': 10 } },
  { 'rataDie':  671401, 'persianArith': { 'year':  1218, 'month':  1, 'day':  7 } },
  { 'rataDie':  694799, 'persianArith': { 'year':  1282, 'month':  1, 'day': 29 } },
  { 'rataDie':  704424, 'persianArith': { 'year':  1308, 'month':  6, 'day':  3 } },
  { 'rataDie':  708842, 'persianArith': { 'year':  1320, 'month':  7, 'day':  7 } },
  { 'rataDie':  709409, 'persianArith': { 'year':  1322, 'month':  1, 'day': 29 } },
  { 'rataDie':  709580, 'persianArith': { 'year':  1322, 'month':  7, 'day': 14 } },
  { 'rataDie':  727274, 'persianArith': { 'year':  1370, 'month': 12, 'day': 27 } },
  { 'rataDie':  728714, 'persianArith': { 'year':  1374, 'month': 12, 'day':  6 } },
  { 'rataDie':  744313, 'persianArith': { 'year':  1417, 'month':  8, 'day': 19 } },
  { 'rataDie':  764652, 'persianArith': { 'year':  1473, 'month':  4, 'day': 28 } }
];

describe ('Persian Arithmetic calendar spec', function () {
  let date, expected, actual;

  it ('should convert a Persian Arithmetic date to Julian day', function () {
    data3.forEach (function (data) {
      date     = data.persianArith;
      expected = data.rataDie + Const.J0000;
      actual   = cal.toJdn (date.year, date.month, date.day);
      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Persian Arithmetic year', function () {
    data3.forEach (function (data) {
      date     = data.persianArith;
      expected = date.year;
      actual   = cal.jdnToYear (data.rataDie + Const.J0000);
      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Persian Arithmetic date', function () {
    data3.forEach (function (data) {
      date     = data.persianArith;
      expected = { year: date.year, month: date.month, day: date.day };
      actual   = cal.fromJdn (data.rataDie + Const.J0000);
	  // expect (expected).to.be.eql (actual);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('should determine whether a Persian Arithmetic year is leap year', function () {
    [ 4, 124, 165, 206, 739, 780, 821, 1313, 1354, 1395 ].forEach (function (year) {
      expect (cal.isLeapYear (year)).to.be.equal (true);
    });

    [ 1, 48, 142, 189, 236, 283, 377, 424, 471, 518, 612, 659, 753, 800, 847,
        894, 988, 1035, 1082, 1129, 1223, 1270, 1364 ].forEach (function (year) {
          expect (cal.isLeapYear (year)).to.be.equal (false);
    });
  });
});
