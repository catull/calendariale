/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/HinduLunarOldCalendar.js').HinduLunarOldCalendar;
const Const = require ('../../lib/Const.js');

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data4 = [
  { 'rataDie': -214193, 'hinduLunarOld': { 'year': 2515, 'month':  6, 'monthLeap': false, 'day': 11 } },
  { 'rataDie':  -61387, 'hinduLunarOld': { 'year': 2933, 'month':  9, 'monthLeap': false, 'day': 26 } },
  { 'rataDie':   25469, 'hinduLunarOld': { 'year': 3171, 'month':  8, 'monthLeap': false, 'day':  3 } },
  { 'rataDie':   49217, 'hinduLunarOld': { 'year': 3236, 'month':  8, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  171307, 'hinduLunarOld': { 'year': 3570, 'month': 11, 'monthLeap': true,  'day': 19 } },
  { 'rataDie':  210155, 'hinduLunarOld': { 'year': 3677, 'month':  3, 'monthLeap': false, 'day':  5 } },
  { 'rataDie':  253427, 'hinduLunarOld': { 'year': 3795, 'month':  9, 'monthLeap': false, 'day': 15 } },
  { 'rataDie':  369740, 'hinduLunarOld': { 'year': 4114, 'month':  2, 'monthLeap': false, 'day':  7 } },
  { 'rataDie':  400085, 'hinduLunarOld': { 'year': 4197, 'month':  2, 'monthLeap': false, 'day': 24 } },
  { 'rataDie':  434355, 'hinduLunarOld': { 'year': 4291, 'month':  1, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  452605, 'hinduLunarOld': { 'year': 4340, 'month': 12, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  470160, 'hinduLunarOld': { 'year': 4389, 'month':  1, 'monthLeap': false, 'day': 23 } },
  { 'rataDie':  473837, 'hinduLunarOld': { 'year': 4399, 'month':  2, 'monthLeap': false, 'day':  8 } },
  { 'rataDie':  507850, 'hinduLunarOld': { 'year': 4492, 'month':  4, 'monthLeap': false, 'day':  2 } },
  { 'rataDie':  524156, 'hinduLunarOld': { 'year': 4536, 'month': 11, 'monthLeap': false, 'day':  7 } },
  { 'rataDie':  544676, 'hinduLunarOld': { 'year': 4593, 'month':  1, 'monthLeap': false, 'day':  3 } },
  { 'rataDie':  567118, 'hinduLunarOld': { 'year': 4654, 'month':  7, 'monthLeap': false, 'day':  2 } },
  { 'rataDie':  569477, 'hinduLunarOld': { 'year': 4660, 'month': 11, 'monthLeap': false, 'day': 29 } },
  { 'rataDie':  601716, 'hinduLunarOld': { 'year': 4749, 'month':  3, 'monthLeap': false, 'day': 20 } },
  { 'rataDie':  613424, 'hinduLunarOld': { 'year': 4781, 'month':  4, 'monthLeap': false, 'day':  4 } },
  { 'rataDie':  626596, 'hinduLunarOld': { 'year': 4817, 'month':  5, 'monthLeap': false, 'day':  6 } },
  { 'rataDie':  645554, 'hinduLunarOld': { 'year': 4869, 'month':  4, 'monthLeap': false, 'day':  5 } },
  { 'rataDie':  664224, 'hinduLunarOld': { 'year': 4920, 'month':  5, 'monthLeap': false, 'day': 12 } },
  { 'rataDie':  671401, 'hinduLunarOld': { 'year': 4940, 'month':  1, 'monthLeap': true,  'day': 13 } },
  { 'rataDie':  694799, 'hinduLunarOld': { 'year': 5004, 'month':  1, 'monthLeap': false, 'day': 23 } },
  { 'rataDie':  704424, 'hinduLunarOld': { 'year': 5030, 'month':  5, 'monthLeap': false, 'day': 21 } },
  { 'rataDie':  708842, 'hinduLunarOld': { 'year': 5042, 'month':  7, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  709409, 'hinduLunarOld': { 'year': 5044, 'month':  1, 'monthLeap': false, 'day': 15 } },
  { 'rataDie':  709580, 'hinduLunarOld': { 'year': 5044, 'month':  7, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  727274, 'hinduLunarOld': { 'year': 5092, 'month': 12, 'monthLeap': false, 'day': 14 } },
  { 'rataDie':  728714, 'hinduLunarOld': { 'year': 5096, 'month': 12, 'monthLeap': false, 'day':  7 } },
  { 'rataDie':  744313, 'hinduLunarOld': { 'year': 5139, 'month':  8, 'monthLeap': false, 'day': 14 } },
  { 'rataDie':  764652, 'hinduLunarOld': { 'year': 5195, 'month':  4, 'monthLeap': false, 'day':  6 } }
];

describe ('Hindu Lunar Old calendar spec', () => {
  let date, expected, actual, julian;

  it ('should convert a Hindu Lunar Old date to Julian day', () => {
    data4.forEach (dt => {
      julian = dt.rataDie + Const.J0000;
      date   = dt.hinduLunarOld;
      actual = cal.toJdn (date.year, date.month, date.monthLeap, date.day, date.dayLeap);
      expect (julian).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Hindu Lunar Old date', () => {
    data4.forEach (dt => {
      julian   = dt.rataDie + Const.J0000;
      date     = dt.hinduLunarOld;
      expected = { 'jdn': julian, 'year': date.year, 'month': date.month, 'monthLeap': date.monthLeap, 'day': date.day };
      actual   = cal.fromJdn (julian);

      expect (expected).to.be.eql (actual);
      // expect (expected.year).to.be.equal (actual.year);
      // expect (expected.month).to.be.equal (actual.month);
      // expect (expected.monthLeap).to.be.equal (actual.monthLeap);
      // expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('should establish whether a Hindu Lunar Old year is leap', () => {
    [ 2933, 3570, 3795, 4197, 4340, 4389, 4492, 4536, 4593, 4660, 4869, 4940 ].forEach (year => {
        actual   = cal.isLeapYear (year);
        expect (true).to.be.equal (actual);
      });

    [ 2515, 3171, 3236, 3677, 4114, 4291, 4399, 4654, 4749, 4781, 4817, 4920, 5004, 5030, 5042, 5044, 5092, 5096, 5139, 5195 ].forEach (year => {
        actual   = cal.isLeapYear (year);
        expect (false).to.be.equal (actual);
      });
  });

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (3570,  0, false,  1)).to.throw ('Invalid month');
    expect (() => cal.toJdn (3570, 13, false,  1)).to.throw ('Invalid month');
    expect (() => cal.toJdn (3570, 11, true ,  3)).not.to.throw ();
    expect (() => cal.toJdn (3570,  9, true ,  1)).to.throw ('Invalid leap month');
    expect (() => cal.toJdn (3570,  4, false,  0)).to.throw ('Invalid day');
    expect (() => cal.toJdn (3570,  4, false, 31)).to.throw ('Invalid day');
  });
});
