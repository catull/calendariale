/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/HebrewObservationalCalendar.js').HebrewObservationalCalendar;
const Const = require ('../../lib/Const.js');

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data3 = [
  { 'rataDie': -214193, 'hebrewObs': { 'year': 3174, 'month':  5, 'day': 11 } },
  { 'rataDie':  -61387, 'hebrewObs': { 'year': 3593, 'month':  9, 'day': 24 } },
  { 'rataDie':   25469, 'hebrewObs': { 'year': 3831, 'month':  7, 'day':  2 } },
  { 'rataDie':   49217, 'hebrewObs': { 'year': 3896, 'month':  7, 'day':  7 } },
  { 'rataDie':  171307, 'hebrewObs': { 'year': 4230, 'month': 10, 'day': 18 } },
  { 'rataDie':  210155, 'hebrewObs': { 'year': 4336, 'month':  3, 'day':  3 } },
  { 'rataDie':  253427, 'hebrewObs': { 'year': 4455, 'month':  9, 'day': 13 } },
  { 'rataDie':  369740, 'hebrewObs': { 'year': 4773, 'month':  2, 'day':  5 } },
  { 'rataDie':  400085, 'hebrewObs': { 'year': 4856, 'month':  2, 'day': 22 } },
  { 'rataDie':  434355, 'hebrewObs': { 'year': 4950, 'month':  1, 'day':  7 } },
  { 'rataDie':  452605, 'hebrewObs': { 'year': 5000, 'month': 13, 'day':  7 } },
  { 'rataDie':  470160, 'hebrewObs': { 'year': 5048, 'month':  1, 'day': 21 } },
  { 'rataDie':  473837, 'hebrewObs': { 'year': 5058, 'month':  2, 'day':  7 } },
  { 'rataDie':  507850, 'hebrewObs': { 'year': 5151, 'month':  3, 'day': 30 } },
  { 'rataDie':  524156, 'hebrewObs': { 'year': 5196, 'month': 12, 'day':  6 } },
  { 'rataDie':  544676, 'hebrewObs': { 'year': 5252, 'month':  2, 'day':  2 } },
  { 'rataDie':  567118, 'hebrewObs': { 'year': 5313, 'month':  6, 'day': 30 } },
  { 'rataDie':  569477, 'hebrewObs': { 'year': 5320, 'month': 12, 'day': 27 } },
  { 'rataDie':  601716, 'hebrewObs': { 'year': 5408, 'month':  3, 'day': 18 } },
  { 'rataDie':  613424, 'hebrewObs': { 'year': 5440, 'month':  4, 'day':  3 } },
  { 'rataDie':  626596, 'hebrewObs': { 'year': 5476, 'month':  5, 'day':  4 } },
  { 'rataDie':  645554, 'hebrewObs': { 'year': 5528, 'month':  4, 'day':  4 } },
  { 'rataDie':  664224, 'hebrewObs': { 'year': 5579, 'month':  5, 'day': 10 } },
  { 'rataDie':  671401, 'hebrewObs': { 'year': 5599, 'month':  1, 'day': 11 } },
  { 'rataDie':  694799, 'hebrewObs': { 'year': 5663, 'month':  1, 'day': 20 } },
  { 'rataDie':  704424, 'hebrewObs': { 'year': 5689, 'month':  6, 'day': 19 } },
  { 'rataDie':  708842, 'hebrewObs': { 'year': 5702, 'month':  7, 'day':  7 } },
  { 'rataDie':  709409, 'hebrewObs': { 'year': 5703, 'month':  2, 'day': 14 } },
  { 'rataDie':  709580, 'hebrewObs': { 'year': 5704, 'month':  8, 'day':  7 } },
  { 'rataDie':  727274, 'hebrewObs': { 'year': 5752, 'month':  1, 'day': 12 } },
  { 'rataDie':  728714, 'hebrewObs': { 'year': 5756, 'month': 12, 'day':  5 } },
  { 'rataDie':  744313, 'hebrewObs': { 'year': 5799, 'month':  9, 'day': 12 } },
  { 'rataDie':  764652, 'hebrewObs': { 'year': 5854, 'month':  5, 'day':  5 } }
];

describe ('Hebrew Observational calendar spec', function () {
  let date, expected, actual;

  it ('should convert a Hebrew Observational date to Julian day', function () {
    data3.forEach (function (data) {
      date = data.hebrewObs;
      expected = data.rataDie + Const.J0000;
      actual = cal.toJdn (date.year, date.month, date.day);
      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Hebrew Observational date', function () {
    data3.forEach (function (data) {
      date = data.hebrewObs;
      expected = { year: date.year, month: date.month, day: date.day };
      actual = cal.fromJdn (data.rataDie + Const.J0000);

      // expect (expected).to.be.eql (actual);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });
});
