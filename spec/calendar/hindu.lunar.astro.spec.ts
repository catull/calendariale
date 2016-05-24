/* global describe it: true */

'use strict';

const chai = require ('chai');
const astro = require ('../../build/Calendrical/Astro.js');
const Const = require ('../../build/Calendrical/Const.js');
const cal = require ('../../build/Calendrical/calendar/HinduLunarAstroCalendar.js').HinduLunarAstroCalendar;

require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data4 = [
  { 'rataDie': -214193, 'hinduLunarAstro': { 'year': -529, 'month':  6, 'monthLeap': true,  'day': 11, 'dayLeap': false } },
  { 'rataDie':  -61387, 'hinduLunarAstro': { 'year': -111, 'month':  9, 'monthLeap': false, 'day': 27, 'dayLeap': false } },
  { 'rataDie':   25469, 'hinduLunarAstro': { 'year':  127, 'month':  8, 'monthLeap': false, 'day':  3, 'dayLeap': true  } },
  { 'rataDie':   49217, 'hinduLunarAstro': { 'year':  192, 'month':  8, 'monthLeap': false, 'day':  9, 'dayLeap': false } },
  { 'rataDie':  171307, 'hinduLunarAstro': { 'year':  526, 'month': 10, 'monthLeap': false, 'day': 20, 'dayLeap': false } },
  { 'rataDie':  210155, 'hinduLunarAstro': { 'year':  633, 'month':  3, 'monthLeap': false, 'day':  5, 'dayLeap': false } },
  { 'rataDie':  253427, 'hinduLunarAstro': { 'year':  751, 'month':  8, 'monthLeap': false, 'day': 15, 'dayLeap': false } },
  { 'rataDie':  369740, 'hinduLunarAstro': { 'year': 1070, 'month':  2, 'monthLeap': false, 'day':  6, 'dayLeap': false } },
  { 'rataDie':  400085, 'hinduLunarAstro': { 'year': 1153, 'month':  2, 'monthLeap': false, 'day': 23, 'dayLeap': false } },
  { 'rataDie':  434355, 'hinduLunarAstro': { 'year': 1247, 'month':  1, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  452605, 'hinduLunarAstro': { 'year': 1296, 'month': 12, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  470160, 'hinduLunarAstro': { 'year': 1345, 'month':  1, 'monthLeap': false, 'day': 23, 'dayLeap': false } },
  { 'rataDie':  473837, 'hinduLunarAstro': { 'year': 1355, 'month':  2, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  507850, 'hinduLunarAstro': { 'year': 1448, 'month':  4, 'monthLeap': false, 'day':  1, 'dayLeap': false } },
  { 'rataDie':  524156, 'hinduLunarAstro': { 'year': 1492, 'month': 11, 'monthLeap': false, 'day':  7, 'dayLeap': false } },
  { 'rataDie':  544676, 'hinduLunarAstro': { 'year': 1549, 'month':  2, 'monthLeap': true,  'day':  4, 'dayLeap': false } },
  { 'rataDie':  567118, 'hinduLunarAstro': { 'year': 1610, 'month':  7, 'monthLeap': false, 'day':  2, 'dayLeap': false } },
  { 'rataDie':  569477, 'hinduLunarAstro': { 'year': 1616, 'month': 11, 'monthLeap': false, 'day': 29, 'dayLeap': false } },
  { 'rataDie':  601716, 'hinduLunarAstro': { 'year': 1705, 'month':  3, 'monthLeap': false, 'day': 20, 'dayLeap': false } },
  { 'rataDie':  613424, 'hinduLunarAstro': { 'year': 1737, 'month':  4, 'monthLeap': false, 'day':  5, 'dayLeap': false } },
  { 'rataDie':  626596, 'hinduLunarAstro': { 'year': 1773, 'month':  5, 'monthLeap': false, 'day':  6, 'dayLeap': false } },
  { 'rataDie':  645554, 'hinduLunarAstro': { 'year': 1825, 'month':  4, 'monthLeap': false, 'day':  5, 'dayLeap': false } },
  { 'rataDie':  664224, 'hinduLunarAstro': { 'year': 1876, 'month':  5, 'monthLeap': false, 'day': 11, 'dayLeap': false } },
  { 'rataDie':  671401, 'hinduLunarAstro': { 'year': 1896, 'month':  1, 'monthLeap': false, 'day': 13, 'dayLeap': false } },
  { 'rataDie':  694799, 'hinduLunarAstro': { 'year': 1960, 'month':  1, 'monthLeap': false, 'day': 22, 'dayLeap': false } },
  { 'rataDie':  704424, 'hinduLunarAstro': { 'year': 1986, 'month':  5, 'monthLeap': false, 'day': 20, 'dayLeap': false } },
  { 'rataDie':  708842, 'hinduLunarAstro': { 'year': 1998, 'month':  7, 'monthLeap': false, 'day':  9, 'dayLeap': false } },
  { 'rataDie':  709409, 'hinduLunarAstro': { 'year': 2000, 'month':  1, 'monthLeap': false, 'day': 14, 'dayLeap': false } },
  { 'rataDie':  709580, 'hinduLunarAstro': { 'year': 2000, 'month':  7, 'monthLeap': false, 'day':  8, 'dayLeap': false } },
  { 'rataDie':  727274, 'hinduLunarAstro': { 'year': 2048, 'month': 12, 'monthLeap': false, 'day': 14, 'dayLeap': false } },
  { 'rataDie':  728714, 'hinduLunarAstro': { 'year': 2052, 'month': 12, 'monthLeap': false, 'day':  7, 'dayLeap': false } },
  { 'rataDie':  744313, 'hinduLunarAstro': { 'year': 2095, 'month':  8, 'monthLeap': false, 'day': 14, 'dayLeap': false } },
  { 'rataDie':  764652, 'hinduLunarAstro': { 'year': 2151, 'month':  4, 'monthLeap': false, 'day':  6, 'dayLeap': false } }
];

describe ('Hindu Lunar Astro calendar spec', function () {
  let date, expected, actual;

  it ('should convert a Hindu Lunar Astro date to Julian day', function () {
    data4.forEach (function (data) {
      date     = data.hinduLunarAstro;
      expected = data.rataDie + Const.J0000;
      actual   = cal.toJdn (date.year, date.month, date.monthLeap, date.day, date.dayLeap);
      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Hindu Lunar Astro date', function () {
    data4.forEach (function (data) {
      date     = data.hinduLunarAstro;
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
});
