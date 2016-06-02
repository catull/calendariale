/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/HinduSolarOldCalendar.js').HinduSolarOldCalendar;
const Const = require ('../../lib/Const.js');

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data4 = [
  { 'rataDie': -214193, 'hinduSolarOld': { 'year': 2515, 'month':  5, 'day': 19 } },
  { 'rataDie':  -61387, 'hinduSolarOld': { 'year': 2933, 'month':  9, 'day': 26 } },
  { 'rataDie':   25469, 'hinduSolarOld': { 'year': 3171, 'month':  7, 'day': 11 } },
  { 'rataDie':   49217, 'hinduSolarOld': { 'year': 3236, 'month':  7, 'day': 17 } },
  { 'rataDie':  171307, 'hinduSolarOld': { 'year': 3570, 'month': 10, 'day': 19 } },
  { 'rataDie':  210155, 'hinduSolarOld': { 'year': 3677, 'month':  2, 'day': 28 } },
  { 'rataDie':  253427, 'hinduSolarOld': { 'year': 3795, 'month':  8, 'day': 17 } },
  { 'rataDie':  369740, 'hinduSolarOld': { 'year': 4114, 'month':  1, 'day': 26 } },
  { 'rataDie':  400085, 'hinduSolarOld': { 'year': 4197, 'month':  2, 'day': 24 } },
  { 'rataDie':  434355, 'hinduSolarOld': { 'year': 4290, 'month': 12, 'day': 20 } },
  { 'rataDie':  452605, 'hinduSolarOld': { 'year': 4340, 'month': 12, 'day':  7 } },
  { 'rataDie':  470160, 'hinduSolarOld': { 'year': 4388, 'month': 12, 'day': 30 } },
  { 'rataDie':  473837, 'hinduSolarOld': { 'year': 4399, 'month':  1, 'day': 24 } },
  { 'rataDie':  507850, 'hinduSolarOld': { 'year': 4492, 'month':  3, 'day':  7 } },
  { 'rataDie':  524156, 'hinduSolarOld': { 'year': 4536, 'month': 10, 'day': 28 } },
  { 'rataDie':  544676, 'hinduSolarOld': { 'year': 4593, 'month':  1, 'day':  3 } },
  { 'rataDie':  567118, 'hinduSolarOld': { 'year': 4654, 'month':  6, 'day': 12 } },
  { 'rataDie':  569477, 'hinduSolarOld': { 'year': 4660, 'month': 11, 'day': 27 } },
  { 'rataDie':  601716, 'hinduSolarOld': { 'year': 4749, 'month':  3, 'day':  1 } },
  { 'rataDie':  613424, 'hinduSolarOld': { 'year': 4781, 'month':  3, 'day': 21 } },
  { 'rataDie':  626596, 'hinduSolarOld': { 'year': 4817, 'month':  4, 'day': 13 } },
  { 'rataDie':  645554, 'hinduSolarOld': { 'year': 4869, 'month':  3, 'day':  8 } },
  { 'rataDie':  664224, 'hinduSolarOld': { 'year': 4920, 'month':  4, 'day': 20 } },
  { 'rataDie':  671401, 'hinduSolarOld': { 'year': 4939, 'month': 12, 'day': 13 } },
  { 'rataDie':  694799, 'hinduSolarOld': { 'year': 5004, 'month':  1, 'day':  4 } },
  { 'rataDie':  704424, 'hinduSolarOld': { 'year': 5030, 'month':  5, 'day': 11 } },
  { 'rataDie':  708842, 'hinduSolarOld': { 'year': 5042, 'month':  6, 'day': 15 } },
  { 'rataDie':  709409, 'hinduSolarOld': { 'year': 5044, 'month':  1, 'day':  4 } },
  { 'rataDie':  709580, 'hinduSolarOld': { 'year': 5044, 'month':  6, 'day': 23 } },
  { 'rataDie':  727274, 'hinduSolarOld': { 'year': 5092, 'month': 12, 'day':  2 } },
  { 'rataDie':  728714, 'hinduSolarOld': { 'year': 5096, 'month': 11, 'day': 11 } },
  { 'rataDie':  744313, 'hinduSolarOld': { 'year': 5139, 'month':  7, 'day': 26 } },
  { 'rataDie':  764652, 'hinduSolarOld': { 'year': 5195, 'month':  4, 'day':  2 } }
];

describe ('Hindu Solar Old calendar spec', () => {
  let date, expected, actual;

  it ('should convert a Hindu Solar Old date to Julian day', () => {
    data4.forEach ((data) => {
      date     = data.hinduSolarOld;
      expected = data.rataDie + Const.J0000;
      actual   = cal.toJdn (date.year, date.month, date.day, date.dayLeap);
      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Hindu Solar Old date', () => {
    data4.forEach ((data) => {
      date     = data.hinduSolarOld;
      expected = { year: date.year, month: date.month, day: date.day };
      actual   = cal.fromJdn (data.rataDie + Const.J0000);
      // expect (expected).to.be.eql (actual);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });
});
