/* global describe it: true */

'use strict';

const chai = require ('chai');
const astro = require ('../../build/Calendrical/Astro.js');
const Const = require ('../../build/Calendrical/Const.js');
const cal = require ('../../build/Calendrical/calendar/TibetanCalendar.js').TibetanCalendar;

require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data4 = [
  { 'rataDie': -214193, 'tibetan': { 'year': -459, 'month': 8, 'monthLeap': false, 'day': 11, 'dayLeap': false } },
  { 'rataDie': -61387, 'tibetan': { 'year': -41, 'month': 12, 'monthLeap': false, 'day': 27, 'dayLeap': false } },
  { 'rataDie': 25469, 'tibetan': { 'year': 197, 'month': 10, 'monthLeap': false, 'day': 3, 'dayLeap': false } },
  { 'rataDie': 49217, 'tibetan': { 'year': 262, 'month': 10, 'monthLeap': false, 'day': 9, 'dayLeap': false } },
  { 'rataDie': 171307, 'tibetan': { 'year': 596, 'month': 12, 'monthLeap': false, 'day': 19, 'dayLeap': false } },
  { 'rataDie': 210155, 'tibetan': { 'year': 703, 'month': 5, 'monthLeap': false, 'day': 4, 'dayLeap': false } },
  { 'rataDie': 253427, 'tibetan': { 'year': 821, 'month': 10, 'monthLeap': false, 'day': 15, 'dayLeap': false } },
  { 'rataDie': 369740, 'tibetan': { 'year': 1140, 'month': 4, 'monthLeap': false, 'day': 6, 'dayLeap': false } },
  { 'rataDie': 400085, 'tibetan': { 'year': 1223, 'month': 4, 'monthLeap': false, 'day': 23, 'dayLeap': false } },
  { 'rataDie': 434355, 'tibetan': { 'year': 1317, 'month': 3, 'monthLeap': false, 'day': 8, 'dayLeap': false } },
  { 'rataDie': 452605, 'tibetan': { 'year': 1367, 'month': 2, 'monthLeap': false, 'day': 8, 'dayLeap': false } },
  { 'rataDie': 470160, 'tibetan': { 'year': 1415, 'month': 2, 'monthLeap': false, 'day': 22, 'dayLeap': false } },
  { 'rataDie': 473837, 'tibetan': { 'year': 1425, 'month': 4, 'monthLeap': false, 'day': 8, 'dayLeap': false } },
  { 'rataDie': 507850, 'tibetan': { 'year': 1518, 'month': 5, 'monthLeap': false, 'day': 1, 'dayLeap': false } },
  { 'rataDie': 524156, 'tibetan': { 'year': 1563, 'month': 1, 'monthLeap': false, 'day': 7, 'dayLeap': false } },
  { 'rataDie': 544676, 'tibetan': { 'year': 1619, 'month': 3, 'monthLeap': false, 'day': 3, 'dayLeap': false } },
  { 'rataDie': 567118, 'tibetan': { 'year': 1680, 'month': 8, 'monthLeap': false, 'day': 2, 'dayLeap': false } },
  { 'rataDie': 569477, 'tibetan': { 'year': 1687, 'month': 1, 'monthLeap': false, 'day': 29, 'dayLeap': false } },
  { 'rataDie': 601716, 'tibetan': { 'year': 1775, 'month': 4, 'monthLeap': false, 'day': 20, 'dayLeap': false } },
  { 'rataDie': 613424, 'tibetan': { 'year': 1807, 'month': 6, 'monthLeap': true, 'day': 4, 'dayLeap': false } },
  { 'rataDie': 626596, 'tibetan': { 'year': 1843, 'month': 6, 'monthLeap': false, 'day': 6, 'dayLeap': false } },
  { 'rataDie': 645554, 'tibetan': { 'year': 1895, 'month': 5, 'monthLeap': false, 'day': 5, 'dayLeap': false } },
  { 'rataDie': 664224, 'tibetan': { 'year': 1946, 'month': 6, 'monthLeap': false, 'day': 11, 'dayLeap': false } },
  { 'rataDie': 671401, 'tibetan': { 'year': 1966, 'month': 2, 'monthLeap': false, 'day': 13, 'dayLeap': false } },
  { 'rataDie': 694799, 'tibetan': { 'year': 2030, 'month': 2, 'monthLeap': false, 'day': 22, 'dayLeap': false } },
  { 'rataDie': 704424, 'tibetan': { 'year': 2056, 'month': 7, 'monthLeap': false, 'day': 20, 'dayLeap': false } },
  { 'rataDie': 708842, 'tibetan': { 'year': 2068, 'month': 8, 'monthLeap': false, 'day': 9, 'dayLeap': false } },
  { 'rataDie': 709409, 'tibetan': { 'year': 2070, 'month': 3, 'monthLeap': true, 'day': 14, 'dayLeap': false } },
  { 'rataDie': 709580, 'tibetan': { 'year': 2070, 'month': 8, 'monthLeap': false, 'day': 8, 'dayLeap': false } },
  { 'rataDie': 727274, 'tibetan': { 'year': 2119, 'month': 1, 'monthLeap': false, 'day': 14, 'dayLeap': false } },
  { 'rataDie': 728714, 'tibetan': { 'year': 2123, 'month': 1, 'monthLeap': false, 'day': 7, 'dayLeap': false } },
  { 'rataDie': 744313, 'tibetan': { 'year': 2165, 'month': 9, 'monthLeap': false, 'day': 14, 'dayLeap': false } },
  { 'rataDie': 764652, 'tibetan': { 'year': 2221, 'month': 6, 'monthLeap': false, 'day': 6, 'dayLeap': false } }
];

describe ('Tibetan calendar spec', function () {
  let date, expected, actual;

  it ('should convert a Tibetan date to Julian day', function () {
    data4.forEach (function (data) {
      date     = data.tibetan;
      expected = data.rataDie + Const.J0000;
      actual   = cal.toJdn (date.year, date.month, date.monthLeap, date.day, date.dayLeap);
      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Tibetan date', function () {
    data4.forEach (function (data) {
      date     = data.tibetan;
      expected = { year: date.year, month: date.month, monthLeap: date.monthLeap, day: date.day, dayLeap: date.dayLeap };
      actual   = cal.fromJdn (data.rataDie + Const.J0000);

      // expect (expected).to.be.eql (actual);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.monthLeap).to.be.equal (actual.monthLeap);
      expect (expected.day).to.be.equal (actual.day);
      expect (expected.dayLeap).to.be.equal (actual.dayLeap);
    });
  });

  it ('should establish whether a Tibetan month is leap', function () {
    data4.forEach (function (data) {
      date     = data.tibetan;
      expected = date.monthLeap;
      actual   = cal.isLeapMonth (date.year, date.month);

      expect (expected).to.be.equal (actual);
    });
  });
});
