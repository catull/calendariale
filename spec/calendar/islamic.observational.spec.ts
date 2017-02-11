/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/IslamicObservationalCalendar.js').IslamicObservationalCalendar;
const Const = require ('../../lib/Const.js');

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data2 = [
  { 'rataDie': -214193, 'islamicObs': { 'year': -1245, 'month': 12, 'day': 11 } },
  { 'rataDie':  -61387, 'islamicObs': { 'year':  -813, 'month':  2, 'day': 25 } },
  { 'rataDie':   25469, 'islamicObs': { 'year':  -568, 'month':  4, 'day':  2 } },
  { 'rataDie':   49217, 'islamicObs': { 'year':  -501, 'month':  4, 'day':  7 } },
  { 'rataDie':  171307, 'islamicObs': { 'year':  -157, 'month': 10, 'day': 18 } },
  { 'rataDie':  210155, 'islamicObs': { 'year':   -47, 'month':  6, 'day':  3 } },
  { 'rataDie':  253427, 'islamicObs': { 'year':    75, 'month':  7, 'day': 13 } },
  { 'rataDie':  369740, 'islamicObs': { 'year':   403, 'month': 10, 'day':  5 } },
  { 'rataDie':  400085, 'islamicObs': { 'year':   489, 'month':  5, 'day': 22 } },
  { 'rataDie':  434355, 'islamicObs': { 'year':   586, 'month':  2, 'day':  7 } },
  { 'rataDie':  452605, 'islamicObs': { 'year':   637, 'month':  8, 'day':  7 } },
  { 'rataDie':  470160, 'islamicObs': { 'year':   687, 'month':  2, 'day': 21 } },
  { 'rataDie':  473837, 'islamicObs': { 'year':   697, 'month':  7, 'day':  7 } },
  { 'rataDie':  507850, 'islamicObs': { 'year':   793, 'month':  6, 'day': 30 } },
  { 'rataDie':  524156, 'islamicObs': { 'year':   839, 'month':  7, 'day':  6 } },
  { 'rataDie':  544676, 'islamicObs': { 'year':   897, 'month':  6, 'day':  2 } },
  { 'rataDie':  567118, 'islamicObs': { 'year':   960, 'month':  9, 'day': 30 } },
  { 'rataDie':  569477, 'islamicObs': { 'year':   967, 'month':  5, 'day': 27 } },
  { 'rataDie':  601716, 'islamicObs': { 'year':  1058, 'month':  5, 'day': 18 } },
  { 'rataDie':  613424, 'islamicObs': { 'year':  1091, 'month':  6, 'day':  3 } },
  { 'rataDie':  626596, 'islamicObs': { 'year':  1128, 'month':  8, 'day':  4 } },
  { 'rataDie':  645554, 'islamicObs': { 'year':  1182, 'month':  2, 'day':  4 } },
  { 'rataDie':  664224, 'islamicObs': { 'year':  1234, 'month': 10, 'day': 10 } },
  { 'rataDie':  671401, 'islamicObs': { 'year':  1255, 'month':  1, 'day': 11 } },
  { 'rataDie':  694799, 'islamicObs': { 'year':  1321, 'month':  1, 'day': 20 } },
  { 'rataDie':  704424, 'islamicObs': { 'year':  1348, 'month':  3, 'day': 19 } },
  { 'rataDie':  708842, 'islamicObs': { 'year':  1360, 'month':  9, 'day':  7 } },
  { 'rataDie':  709409, 'islamicObs': { 'year':  1362, 'month':  4, 'day': 14 } },
  { 'rataDie':  709580, 'islamicObs': { 'year':  1362, 'month': 10, 'day':  7 } },
  { 'rataDie':  727274, 'islamicObs': { 'year':  1412, 'month':  9, 'day': 12 } },
  { 'rataDie':  728714, 'islamicObs': { 'year':  1416, 'month': 10, 'day':  5 } },
  { 'rataDie':  744313, 'islamicObs': { 'year':  1460, 'month': 10, 'day': 12 } },
  { 'rataDie':  764652, 'islamicObs': { 'year':  1518, 'month':  3, 'day':  5 } }
];

describe ('Islamic Observational calendar spec', () => {
  let date, expected, actual, julian;

  it ('should convert a Islamic Observational date to Julian day', () => {
    data2.forEach (dt => {
      julian = dt.rataDie + Const.J0000;
      date   = dt.islamicObs;
      actual = cal.toJdn (date.year, date.month, date.day);
      expect (julian).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Islamic Observational date', () => {
    data2.forEach (dt => {
      julian   = dt.rataDie + Const.J0000;
      date     = dt.islamicObs;
      expected = { 'jdn': julian, 'year': date.year, 'month': date.month, 'day': date.day, 'yearLeap': cal.isLeapYear (date.year) };
      actual   = cal.fromJdn (julian);

      expect (expected).to.be.eql (actual);
      // expect (expected.year).to.be.equal (actual.year);
      // expect (expected.month).to.be.equal (actual.month);
      // expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('throws validation excetions', () => {
    expect (() => cal.toJdn (220,  0, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (220, -2, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (220, 13, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (220,  7, -5)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220,  1, 31)).to.throw ('Invalid day');
  });
});
