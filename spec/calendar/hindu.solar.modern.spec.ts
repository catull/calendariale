/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/HinduSolarModernCalendar.js').HinduSolarModernCalendar;
const Const = require ('../../lib/Const.js');

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data4 = [
  { 'rataDie': -214193, 'hinduSolarModern': { 'year': -664, 'month':  5, 'day': 19 } },
  { 'rataDie':  -61387, 'hinduSolarModern': { 'year': -246, 'month':  9, 'day': 26 } },
  { 'rataDie':   25469, 'hinduSolarModern': { 'year':   -8, 'month':  7, 'day':  9 } },
  { 'rataDie':   49217, 'hinduSolarModern': { 'year':   57, 'month':  7, 'day': 16 } },
  { 'rataDie':  171307, 'hinduSolarModern': { 'year':  391, 'month': 10, 'day': 21 } },
  { 'rataDie':  210155, 'hinduSolarModern': { 'year':  498, 'month':  2, 'day': 31 } },
  { 'rataDie':  253427, 'hinduSolarModern': { 'year':  616, 'month':  8, 'day': 16 } },
  { 'rataDie':  369740, 'hinduSolarModern': { 'year':  935, 'month':  1, 'day': 28 } },
  { 'rataDie':  400085, 'hinduSolarModern': { 'year': 1018, 'month':  2, 'day': 26 } },
  { 'rataDie':  434355, 'hinduSolarModern': { 'year': 1111, 'month': 12, 'day': 23 } },
  { 'rataDie':  452605, 'hinduSolarModern': { 'year': 1161, 'month': 12, 'day': 10 } },
  { 'rataDie':  470160, 'hinduSolarModern': { 'year': 1210, 'month':  1, 'day':  2 } },
  { 'rataDie':  473837, 'hinduSolarModern': { 'year': 1220, 'month':  1, 'day': 27 } },
  { 'rataDie':  507850, 'hinduSolarModern': { 'year': 1313, 'month':  3, 'day':  8 } },
  { 'rataDie':  524156, 'hinduSolarModern': { 'year': 1357, 'month': 10, 'day': 30 } },
  { 'rataDie':  544676, 'hinduSolarModern': { 'year': 1414, 'month':  1, 'day':  5 } },
  { 'rataDie':  567118, 'hinduSolarModern': { 'year': 1475, 'month':  6, 'day': 10 } },
  { 'rataDie':  569477, 'hinduSolarModern': { 'year': 1481, 'month': 11, 'day': 29 } },
  { 'rataDie':  601716, 'hinduSolarModern': { 'year': 1570, 'month':  3, 'day':  3 } },
  { 'rataDie':  613424, 'hinduSolarModern': { 'year': 1602, 'month':  3, 'day': 22 } },
  { 'rataDie':  626596, 'hinduSolarModern': { 'year': 1638, 'month':  4, 'day': 13 } },
  { 'rataDie':  645554, 'hinduSolarModern': { 'year': 1690, 'month':  3, 'day': 10 } },
  { 'rataDie':  664224, 'hinduSolarModern': { 'year': 1741, 'month':  4, 'day': 20 } },
  { 'rataDie':  671401, 'hinduSolarModern': { 'year': 1760, 'month': 12, 'day': 16 } },
  { 'rataDie':  694799, 'hinduSolarModern': { 'year': 1825, 'month':  1, 'day':  7 } },
  { 'rataDie':  704424, 'hinduSolarModern': { 'year': 1851, 'month':  5, 'day': 10 } },
  { 'rataDie':  708842, 'hinduSolarModern': { 'year': 1863, 'month':  6, 'day': 14 } },
  { 'rataDie':  709409, 'hinduSolarModern': { 'year': 1865, 'month':  1, 'day':  7 } },
  { 'rataDie':  709580, 'hinduSolarModern': { 'year': 1865, 'month':  6, 'day': 21 } },
  { 'rataDie':  727274, 'hinduSolarModern': { 'year': 1913, 'month': 12, 'day':  4 } },
  { 'rataDie':  728714, 'hinduSolarModern': { 'year': 1917, 'month': 11, 'day': 13 } },
  { 'rataDie':  744313, 'hinduSolarModern': { 'year': 1960, 'month':  7, 'day': 24 } },
  { 'rataDie':  764652, 'hinduSolarModern': { 'year': 2016, 'month':  4, 'day':  2 } }
];

describe ('Hindu Solar Modern calendar spec', () => {
  let date, expected, actual;

  it ('should convert a Hindu Solar Modern date to Julian day', () => {
    data4.forEach ((data) => {
      date     = data.hinduSolarModern;
      expected = data.rataDie + Const.J0000;
      actual   = cal.toJdn (date.year, date.month, date.day, date.dayLeap);
      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Hindu Solar Modern date', () => {
    data4.forEach ((data) => {
      date     = data.hinduSolarModern;
      expected = { year: date.year, month: date.month, day: date.day };
      actual   = cal.fromJdn (data.rataDie + Const.J0000);
      // expect (expected).to.be.eql (actual);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });
});
