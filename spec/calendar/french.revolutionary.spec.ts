/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/FrenchRevolutionaryCalendar.js').FrenchRevolutionaryCalendar;
const astro = require ('../../lib/Astro.js');
const Const = require ('../../lib/Const.js');

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data3 = [
  { 'rataDie': -214193, 'french': { 'year': -2378, 'month': 11, 'day':  5 } },
  { 'rataDie':  -61387, 'french': { 'year': -1959, 'month':  3, 'day': 14 } },
  { 'rataDie':   25469, 'french': { 'year': -1721, 'month':  1, 'day':  2 } },
  { 'rataDie':   49217, 'french': { 'year': -1656, 'month':  1, 'day': 10 } },
  { 'rataDie':  171307, 'french': { 'year': -1322, 'month':  4, 'day': 19 } },
  { 'rataDie':  210155, 'french': { 'year': -1216, 'month':  9, 'day':  1 } },
  { 'rataDie':  253427, 'french': { 'year': -1097, 'month':  2, 'day': 19 } },
  { 'rataDie':  369740, 'french': { 'year':  -779, 'month':  8, 'day':  5 } },
  { 'rataDie':  400085, 'french': { 'year':  -696, 'month':  9, 'day':  5 } },
  { 'rataDie':  434355, 'french': { 'year':  -602, 'month':  7, 'day':  2 } },
  { 'rataDie':  452605, 'french': { 'year':  -552, 'month':  6, 'day': 20 } },
  { 'rataDie':  470160, 'french': { 'year':  -504, 'month':  7, 'day': 13 } },
  { 'rataDie':  473837, 'french': { 'year':  -494, 'month':  8, 'day':  8 } },
  { 'rataDie':  507850, 'french': { 'year':  -401, 'month':  9, 'day': 23 } },
  { 'rataDie':  524156, 'french': { 'year':  -356, 'month':  5, 'day': 14 } },
  { 'rataDie':  544676, 'french': { 'year':  -300, 'month':  7, 'day': 20 } },
  { 'rataDie':  567118, 'french': { 'year':  -239, 'month': 13, 'day':  2 } },
  { 'rataDie':  569477, 'french': { 'year':  -232, 'month':  6, 'day': 15 } },
  { 'rataDie':  601716, 'french': { 'year':  -144, 'month':  9, 'day': 22 } },
  { 'rataDie':  613424, 'french': { 'year':  -112, 'month': 10, 'day': 12 } },
  { 'rataDie':  626596, 'french': { 'year':   -76, 'month': 11, 'day':  6 } },
  { 'rataDie':  645554, 'french': { 'year':   -24, 'month': 10, 'day':  1 } },
  { 'rataDie':  664224, 'french': { 'year':    27, 'month': 11, 'day': 14 } },
  { 'rataDie':  671401, 'french': { 'year':    47, 'month':  7, 'day':  6 } },
  { 'rataDie':  694799, 'french': { 'year':   111, 'month':  7, 'day': 28 } },
  { 'rataDie':  704424, 'french': { 'year':   137, 'month': 12, 'day':  7 } },
  { 'rataDie':  708842, 'french': { 'year':   150, 'month':  1, 'day':  7 } },
  { 'rataDie':  709409, 'french': { 'year':   151, 'month':  7, 'day': 29 } },
  { 'rataDie':  709580, 'french': { 'year':   152, 'month':  1, 'day': 15 } },
  { 'rataDie':  727274, 'french': { 'year':   200, 'month':  6, 'day': 27 } },
  { 'rataDie':  728714, 'french': { 'year':   204, 'month':  6, 'day':  6 } },
  { 'rataDie':  744313, 'french': { 'year':   247, 'month':  2, 'day': 20 } },
  { 'rataDie':  764652, 'french': { 'year':   302, 'month': 10, 'day': 30 } }
];

describe ('French Revolutionary calendar spec', () => {
  let date, expected, actual, julian, decade, jour;

  it ('should convert a French Revolutionary date to Julian day', () => {
    data3.forEach (dt => {
      date   = dt.french;
      julian = dt.rataDie + Const.J0000;
      jour   = date.day;
      decade = Math.floor ((jour - 1) / 10) + 1;
      jour   = astro.amod (jour, 10);
      actual = cal.toJdn (date.year, date.month, decade, jour);
      expect (julian).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a French Revolutionary date', () => {
    data3.forEach (dt => {
      julian   = dt.rataDie + Const.J0000;
      date     = dt.french;
      jour     = date.day;
      decade   = Math.floor ((jour - 1) / 10) + 1;
      jour     = astro.amod (jour, 10);
      expected = { jdn: julian, year: date.year, month: date.month, decade: decade, day: jour };
      actual   = cal.fromJdn (julian);

      expect (expected).to.be.eql (actual);
      // expect (expected.year).to.be.equal (actual.year);
      // expect (expected.month).to.be.equal (actual.month);
      // expect (expected.decade).to.be.equal (actual.decade);
      // expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('throws validation excetions', () => {
    expect (() => cal.toJdn (1,  0, 3, 10)).to.throw ('Invalid mois');
    expect (() => cal.toJdn (1, -2, 3, 10)).to.throw ('Invalid mois');
    expect (() => cal.toJdn (1, 15, 3, 10)).to.throw ('Invalid mois');
    expect (() => cal.toJdn (1,  7, 0, 10)).to.throw ('Invalid decadi');
    expect (() => cal.toJdn (1,  7, 4, 10)).to.throw ('Invalid decadi');
    expect (() => cal.toJdn (1,  7, 3, -5)).to.throw ('Invalid jour');
    expect (() => cal.toJdn (1,  7, 3, 12)).to.throw ('Invalid jour');
    expect (() => cal.toJdn (1, 13, 1,  6)).to.throw ('Invalid jour');
    expect (() => cal.toJdn (3, 13, 1,  7)).to.throw ('Invalid jour');
   });
});
