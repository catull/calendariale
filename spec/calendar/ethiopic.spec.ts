/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/EthiopicCalendar.js').EthiopicCalendar;
const Const = require ('../../lib/Const.js');

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data2 = [
  { 'rataDie': -214193, 'ethiopic': { 'year': -594, 'month': 12, 'day':  6 } },
  { 'rataDie':  -61387, 'ethiopic': { 'year': -175, 'month':  4, 'day': 12 } },
  { 'rataDie':   25469, 'ethiopic': { 'year':   63, 'month':  1, 'day': 29 } },
  { 'rataDie':   49217, 'ethiopic': { 'year':  128, 'month':  2, 'day':  5 } },
  { 'rataDie':  171307, 'ethiopic': { 'year':  462, 'month':  5, 'day': 12 } },
  { 'rataDie':  210155, 'ethiopic': { 'year':  568, 'month':  9, 'day': 23 } },
  { 'rataDie':  253427, 'ethiopic': { 'year':  687, 'month':  3, 'day': 11 } },
  { 'rataDie':  369740, 'ethiopic': { 'year': 1005, 'month':  8, 'day': 24 } },
  { 'rataDie':  400085, 'ethiopic': { 'year': 1088, 'month':  9, 'day': 23 } },
  { 'rataDie':  434355, 'ethiopic': { 'year': 1182, 'month':  7, 'day': 20 } },
  { 'rataDie':  452605, 'ethiopic': { 'year': 1232, 'month':  7, 'day':  7 } },
  { 'rataDie':  470160, 'ethiopic': { 'year': 1280, 'month':  7, 'day': 30 } },
  { 'rataDie':  473837, 'ethiopic': { 'year': 1290, 'month':  8, 'day': 25 } },
  { 'rataDie':  507850, 'ethiopic': { 'year': 1383, 'month': 10, 'day': 10 } },
  { 'rataDie':  524156, 'ethiopic': { 'year': 1428, 'month':  5, 'day': 29 } },
  { 'rataDie':  544676, 'ethiopic': { 'year': 1484, 'month':  8, 'day':  5 } },
  { 'rataDie':  567118, 'ethiopic': { 'year': 1546, 'month':  1, 'day': 12 } },
  { 'rataDie':  569477, 'ethiopic': { 'year': 1552, 'month':  6, 'day': 29 } },
  { 'rataDie':  601716, 'ethiopic': { 'year': 1640, 'month': 10, 'day':  6 } },
  { 'rataDie':  613424, 'ethiopic': { 'year': 1672, 'month': 10, 'day': 26 } },
  { 'rataDie':  626596, 'ethiopic': { 'year': 1708, 'month': 11, 'day': 19 } },
  { 'rataDie':  645554, 'ethiopic': { 'year': 1760, 'month': 10, 'day': 14 } },
  { 'rataDie':  664224, 'ethiopic': { 'year': 1811, 'month': 11, 'day': 27 } },
  { 'rataDie':  671401, 'ethiopic': { 'year': 1831, 'month':  7, 'day': 19 } },
  { 'rataDie':  694799, 'ethiopic': { 'year': 1895, 'month':  8, 'day': 11 } },
  { 'rataDie':  704424, 'ethiopic': { 'year': 1921, 'month': 12, 'day': 19 } },
  { 'rataDie':  708842, 'ethiopic': { 'year': 1934, 'month':  1, 'day': 19 } },
  { 'rataDie':  709409, 'ethiopic': { 'year': 1935, 'month':  8, 'day': 11 } },
  { 'rataDie':  709580, 'ethiopic': { 'year': 1936, 'month':  1, 'day': 26 } },
  { 'rataDie':  727274, 'ethiopic': { 'year': 1984, 'month':  7, 'day':  8 } },
  { 'rataDie':  728714, 'ethiopic': { 'year': 1988, 'month':  6, 'day': 17 } },
  { 'rataDie':  744313, 'ethiopic': { 'year': 2031, 'month':  3, 'day':  1 } },
  { 'rataDie':  764652, 'ethiopic': { 'year': 2086, 'month': 11, 'day': 11 } }
];

describe ('Ethiopic calendar spec', () => {
  let date, expected, actual, julian;

  it ('should convert an Ethiopic date to Julian day', () => {
    data2.forEach (dt => {
      date   = dt.ethiopic;
      julian = dt.rataDie + Const.J0000;
      actual = cal.toJdn (date.year, date.month, date.day);

      expect (julian).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to an Ethiopic date', () => {
    data2.forEach (dt => {
      julian   = dt.rataDie + Const.J0000;
      date     = dt.ethiopic;
      expected = { jdn: julian, year: date.year, month: date.month, day: date.day };
      actual   = cal.fromJdn (julian);

      expect (expected).to.be.eql (actual);
      // expect (expected.year).to.be.equal (actual.year);
      // expect (expected.month).to.be.equal (actual.month);
      // expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('throws validation excetions', () => {
    expect (() => cal.toJdn (1000,  0, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (1000, -2, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (1000, 15, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (1000,  7,  0)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1000,  7, -5)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1000,  7, 35)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1000, 13,  6)).to.throw ('Invalid day');
   });
});
