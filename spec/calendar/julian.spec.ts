/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/JulianCalendar.js').JulianCalendar;

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data1 = [
  { 'julianDay': 1507231.5, 'julianDate': { 'year': -587, 'month':  7, 'day': 30 } },
  { 'julianDay': 1660037.5, 'julianDate': { 'year': -169, 'month': 12, 'day':  8 } },
  { 'julianDay': 1746893.5, 'julianDate': { 'year':   70, 'month':  9, 'day': 26 } },
  { 'julianDay': 1770641.5, 'julianDate': { 'year':  135, 'month': 10, 'day':  3 } },
  { 'julianDay': 1892731.5, 'julianDate': { 'year':  470, 'month':  1, 'day':  7 } },
  { 'julianDay': 1931579.5, 'julianDate': { 'year':  576, 'month':  5, 'day': 18 } },
  { 'julianDay': 1974851.5, 'julianDate': { 'year':  694, 'month': 11, 'day':  7 } },
  { 'julianDay': 2091164.5, 'julianDate': { 'year': 1013, 'month':  4, 'day': 19 } },
  { 'julianDay': 2121509.5, 'julianDate': { 'year': 1096, 'month':  5, 'day': 18 } },
  { 'julianDay': 2155779.5, 'julianDate': { 'year': 1190, 'month':  3, 'day': 16 } },
  { 'julianDay': 2174029.5, 'julianDate': { 'year': 1240, 'month':  3, 'day':  3 } },
  { 'julianDay': 2191584.5, 'julianDate': { 'year': 1288, 'month':  3, 'day': 26 } },
  { 'julianDay': 2195261.5, 'julianDate': { 'year': 1298, 'month':  4, 'day': 20 } },
  { 'julianDay': 2229274.5, 'julianDate': { 'year': 1391, 'month':  6, 'day':  4 } },
  { 'julianDay': 2245580.5, 'julianDate': { 'year': 1436, 'month':  1, 'day': 25 } },
  { 'julianDay': 2266100.5, 'julianDate': { 'year': 1492, 'month':  3, 'day': 31 } },
  { 'julianDay': 2288542.5, 'julianDate': { 'year': 1553, 'month':  9, 'day':  9 } },
  { 'julianDay': 2290901.5, 'julianDate': { 'year': 1560, 'month':  2, 'day': 24 } },
  { 'julianDay': 2323140.5, 'julianDate': { 'year': 1648, 'month':  5, 'day': 31 } },
  { 'julianDay': 2334848.5, 'julianDate': { 'year': 1680, 'month':  6, 'day': 20 } },
  { 'julianDay': 2348020.5, 'julianDate': { 'year': 1716, 'month':  7, 'day': 13 } },
  { 'julianDay': 2366978.5, 'julianDate': { 'year': 1768, 'month':  6, 'day':  8 } },
  { 'julianDay': 2385648.5, 'julianDate': { 'year': 1819, 'month':  7, 'day': 21 } },
  { 'julianDay': 2392825.5, 'julianDate': { 'year': 1839, 'month':  3, 'day': 15 } },
  { 'julianDay': 2416223.5, 'julianDate': { 'year': 1903, 'month':  4, 'day':  6 } },
  { 'julianDay': 2425848.5, 'julianDate': { 'year': 1929, 'month':  8, 'day': 12 } },
  { 'julianDay': 2430266.5, 'julianDate': { 'year': 1941, 'month':  9, 'day': 16 } },
  { 'julianDay': 2430833.5, 'julianDate': { 'year': 1943, 'month':  4, 'day':  6 } },
  { 'julianDay': 2431004.5, 'julianDate': { 'year': 1943, 'month':  9, 'day': 24 } },
  { 'julianDay': 2448698.5, 'julianDate': { 'year': 1992, 'month':  3, 'day':  4 } },
  { 'julianDay': 2450138.5, 'julianDate': { 'year': 1996, 'month':  2, 'day': 12 } },
  { 'julianDay': 2465737.5, 'julianDate': { 'year': 2038, 'month': 10, 'day': 28 } },
  { 'julianDay': 2486076.5, 'julianDate': { 'year': 2094, 'month':  7, 'day':  5 } }
];

describe ('Julian calendar spec', () => {
  let date, expected, actual;

  it ('should convert a Julian date to Julian day', () => {
    data1.forEach ((data) => {
      date = data.julianDate;
      expected = data.julianDay;
      actual = cal.toJdn (date.year, date.month, date.day);

      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Julian date', () => {
    data1.forEach ((data) => {
      date = data.julianDate;
      expected = { year: date.year, month: date.month, day: date.day };
      actual = cal.fromJdn (data.julianDay);

      // expect (expected).to.be.eql (actual);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('should determine whether a Julian year is leap year', () => {
    [ 4, 20, 1600, 1700, 1760, 1800, 1840, 1904, 1980, 2000 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).to.be.equal (true);
    });

    [ 1, 2, 3, 5, 1599, 1970, 2001 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).to.be.equal (false);
    });
  });

  it ('throws validation excetions', () => {
    expect (() => cal.toJdn (1999,  0, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (1999, -2, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (1999, 15, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (1999,  7, -5)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1999,  7, 32)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1999,  2, 29)).to.throw ('Invalid day');
    expect (() => cal.toJdn (2000,  2, 30)).to.throw ('Invalid day');
   });
});
