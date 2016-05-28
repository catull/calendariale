/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/RomanCalendar.js').RomanCalendar;
const RomanEvent = require ('../../lib/Const.js').RomanEvent;

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data1 = [
  { 'julianDay': 1507231.5, 'roman': { 'year': -587, 'month':  8, 'event':  RomanEvent.KALENDS, 'count':  3, 'leap': false } },
  { 'julianDay': 1660037.5, 'roman': { 'year': -169, 'month': 12, 'event':  RomanEvent.IDES,    'count':  6, 'leap': false } },
  { 'julianDay': 1746893.5, 'roman': { 'year':   70, 'month': 10, 'event':  RomanEvent.KALENDS, 'count':  6, 'leap': false } },
  { 'julianDay': 1770641.5, 'roman': { 'year':  135, 'month': 10, 'event':  RomanEvent.NONES,   'count':  5, 'leap': false } },
  { 'julianDay': 1892731.5, 'roman': { 'year':  470, 'month':  1, 'event':  RomanEvent.IDES,    'count':  7, 'leap': false } },
  { 'julianDay': 1931579.5, 'roman': { 'year':  576, 'month':  6, 'event':  RomanEvent.KALENDS, 'count': 15, 'leap': false } },
  { 'julianDay': 1974851.5, 'roman': { 'year':  694, 'month': 11, 'event':  RomanEvent.IDES,    'count':  7, 'leap': false } },
  { 'julianDay': 2091164.5, 'roman': { 'year': 1013, 'month':  5, 'event':  RomanEvent.KALENDS, 'count': 13, 'leap': false } },
  { 'julianDay': 2121509.5, 'roman': { 'year': 1096, 'month':  6, 'event':  RomanEvent.KALENDS, 'count': 15, 'leap': false } },
  { 'julianDay': 2155779.5, 'roman': { 'year': 1190, 'month':  4, 'event':  RomanEvent.KALENDS, 'count': 17, 'leap': false } },
  { 'julianDay': 2174029.5, 'roman': { 'year': 1240, 'month':  3, 'event':  RomanEvent.NONES,   'count':  5, 'leap': false } },
  { 'julianDay': 2191584.5, 'roman': { 'year': 1288, 'month':  4, 'event':  RomanEvent.KALENDS, 'count':  7, 'leap': false } },
  { 'julianDay': 2195261.5, 'roman': { 'year': 1298, 'month':  5, 'event':  RomanEvent.KALENDS, 'count': 12, 'leap': false } },
  { 'julianDay': 2229274.5, 'roman': { 'year': 1391, 'month':  6, 'event':  RomanEvent.NONES,   'count':  2, 'leap': false } },
  { 'julianDay': 2245580.5, 'roman': { 'year': 1436, 'month':  2, 'event':  RomanEvent.KALENDS, 'count':  8, 'leap': false } },
  { 'julianDay': 2266100.5, 'roman': { 'year': 1492, 'month':  4, 'event':  RomanEvent.KALENDS, 'count':  2, 'leap': false } },
  { 'julianDay': 2288542.5, 'roman': { 'year': 1553, 'month':  9, 'event':  RomanEvent.IDES,    'count':  5, 'leap': false } },
  { 'julianDay': 2290901.5, 'roman': { 'year': 1560, 'month':  3, 'event':  RomanEvent.KALENDS, 'count':  6, 'leap': false } },
  { 'julianDay': 2323140.5, 'roman': { 'year': 1648, 'month':  6, 'event':  RomanEvent.KALENDS, 'count':  2, 'leap': false } },
  { 'julianDay': 2334848.5, 'roman': { 'year': 1680, 'month':  7, 'event':  RomanEvent.KALENDS, 'count': 12, 'leap': false } },
  { 'julianDay': 2348020.5, 'roman': { 'year': 1716, 'month':  7, 'event':  RomanEvent.IDES,    'count':  3, 'leap': false } },
  { 'julianDay': 2366978.5, 'roman': { 'year': 1768, 'month':  6, 'event':  RomanEvent.IDES,    'count':  6, 'leap': false } },
  { 'julianDay': 2385648.5, 'roman': { 'year': 1819, 'month':  8, 'event':  RomanEvent.KALENDS, 'count': 12, 'leap': false } },
  { 'julianDay': 2392825.5, 'roman': { 'year': 1839, 'month':  3, 'event':  RomanEvent.IDES,    'count':  1, 'leap': false } },
  { 'julianDay': 2416223.5, 'roman': { 'year': 1903, 'month':  4, 'event':  RomanEvent.IDES,    'count':  8, 'leap': false } },
  { 'julianDay': 2425848.5, 'roman': { 'year': 1929, 'month':  8, 'event':  RomanEvent.IDES,    'count':  2, 'leap': false } },
  { 'julianDay': 2430266.5, 'roman': { 'year': 1941, 'month': 10, 'event':  RomanEvent.KALENDS, 'count': 16, 'leap': false } },
  { 'julianDay': 2430833.5, 'roman': { 'year': 1943, 'month':  4, 'event':  RomanEvent.IDES,    'count':  8, 'leap': false } },
  { 'julianDay': 2431004.5, 'roman': { 'year': 1943, 'month': 10, 'event':  RomanEvent.KALENDS, 'count':  8, 'leap': false } },
  { 'julianDay': 2448698.5, 'roman': { 'year': 1992, 'month':  3, 'event':  RomanEvent.NONES,   'count':  4, 'leap': false } },
  { 'julianDay': 2450138.5, 'roman': { 'year': 1996, 'month':  2, 'event':  RomanEvent.IDES,    'count':  2, 'leap': false } },
  { 'julianDay': 2465737.5, 'roman': { 'year': 2038, 'month': 11, 'event':  RomanEvent.KALENDS, 'count':  5, 'leap': false } },
  { 'julianDay': 2486076.5, 'roman': { 'year': 2094, 'month':  7, 'event':  RomanEvent.NONES,   'count':  3, 'leap': false } }
];


describe ('Roman calendar spec', function () {
  let date, expected, actual;

  it ('should convert a Roman date to Julian day', function () {
    data1.forEach (function (data) {
      date = data.roman;
      expected = data.julianDay;
      actual = cal.toJdn (date.year, date.month, date.event, date.count, date.leap);

      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Roman date', function () {
    data1.forEach (function (data) {
      date = data.roman;
      expected = { year: date.year, month: date.month, event: date.event, count: date.count, leap: date.leap };
      actual = cal.fromJdn (data.julianDay);

      // expect (expected).to.be.eql (actual);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.event).to.be.equal (actual.event);
      expect (expected.count).to.be.equal (actual.count);
      expect (expected.leap).to.be.equal (actual.leap);
    });
  });
});
