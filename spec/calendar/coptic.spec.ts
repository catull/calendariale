/* global describe it: true */

'use strict';

const cal = require ('../../lib/calendar/CopticCalendar.js').CopticCalendar;

const chai = require ('chai');
require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data1 = [
  { 'julianDay': 1507231.5, 'coptic': { 'year': -870, 'month': 12, 'day':  6 } },
  { 'julianDay': 1660037.5, 'coptic': { 'year': -451, 'month':  4, 'day': 12 } },
  { 'julianDay': 1746893.5, 'coptic': { 'year': -213, 'month':  1, 'day': 29 } },
  { 'julianDay': 1770641.5, 'coptic': { 'year': -148, 'month':  2, 'day':  5 } },
  { 'julianDay': 1892731.5, 'coptic': { 'year':  186, 'month':  5, 'day': 12 } },
  { 'julianDay': 1931579.5, 'coptic': { 'year':  292, 'month':  9, 'day': 23 } },
  { 'julianDay': 1974851.5, 'coptic': { 'year':  411, 'month':  3, 'day': 11 } },
  { 'julianDay': 2091164.5, 'coptic': { 'year':  729, 'month':  8, 'day': 24 } },
  { 'julianDay': 2121509.5, 'coptic': { 'year':  812, 'month':  9, 'day': 23 } },
  { 'julianDay': 2155779.5, 'coptic': { 'year':  906, 'month':  7, 'day': 20 } },
  { 'julianDay': 2174029.5, 'coptic': { 'year':  956, 'month':  7, 'day':  7 } },
  { 'julianDay': 2191584.5, 'coptic': { 'year': 1004, 'month':  7, 'day': 30 } },
  { 'julianDay': 2195261.5, 'coptic': { 'year': 1014, 'month':  8, 'day': 25 } },
  { 'julianDay': 2229274.5, 'coptic': { 'year': 1107, 'month': 10, 'day': 10 } },
  { 'julianDay': 2245580.5, 'coptic': { 'year': 1152, 'month':  5, 'day': 29 } },
  { 'julianDay': 2266100.5, 'coptic': { 'year': 1208, 'month':  8, 'day':  5 } },
  { 'julianDay': 2288542.5, 'coptic': { 'year': 1270, 'month':  1, 'day': 12 } },
  { 'julianDay': 2290901.5, 'coptic': { 'year': 1276, 'month':  6, 'day': 29 } },
  { 'julianDay': 2323140.5, 'coptic': { 'year': 1364, 'month': 10, 'day':  6 } },
  { 'julianDay': 2334848.5, 'coptic': { 'year': 1396, 'month': 10, 'day': 26 } },
  { 'julianDay': 2348020.5, 'coptic': { 'year': 1432, 'month': 11, 'day': 19 } },
  { 'julianDay': 2366978.5, 'coptic': { 'year': 1484, 'month': 10, 'day': 14 } },
  { 'julianDay': 2385648.5, 'coptic': { 'year': 1535, 'month': 11, 'day': 27 } },
  { 'julianDay': 2392825.5, 'coptic': { 'year': 1555, 'month':  7, 'day': 19 } },
  { 'julianDay': 2416223.5, 'coptic': { 'year': 1619, 'month':  8, 'day': 11 } },
  { 'julianDay': 2425848.5, 'coptic': { 'year': 1645, 'month': 12, 'day': 19 } },
  { 'julianDay': 2430266.5, 'coptic': { 'year': 1658, 'month':  1, 'day': 19 } },
  { 'julianDay': 2430833.5, 'coptic': { 'year': 1659, 'month':  8, 'day': 11 } },
  { 'julianDay': 2431004.5, 'coptic': { 'year': 1660, 'month':  1, 'day': 26 } },
  { 'julianDay': 2448698.5, 'coptic': { 'year': 1708, 'month':  7, 'day':  8 } },
  { 'julianDay': 2450138.5, 'coptic': { 'year': 1712, 'month':  6, 'day': 17 } },
  { 'julianDay': 2465737.5, 'coptic': { 'year': 1755, 'month':  3, 'day':  1 } },
  { 'julianDay': 2486076.5, 'coptic': { 'year': 1810, 'month': 11, 'day': 11 } }
];

describe ('Coptic calendar spec', () => {
  let date, expected, actual;

  it ('should convert a Coptic date to Julian day', () => {
    data1.forEach ((data) => {
      date = data.coptic;
      expected = data.julianDay;
      actual = cal.toJdn (date.year, date.month, date.day);

      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Coptic date', () => {
    data1.forEach ((data) => {
      date = data.coptic;
      expected = { year: date.year, month: date.month, day: date.day };
      actual = cal.fromJdn (data.julianDay);

      // expect (expected).to.be.eql (actual);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });


  it ('should determine whether a Coptic year is leap year', () => {
    [ 3, 7, 23, 1603, 1763, 1843, 1907, 1991, 2007 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).to.be.equal (true);
    });

    [ 0, 1, 2, 4, 5, 1598, 1700, 1800, 1900, 1970, 2001 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).to.be.equal (false);
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
    expect (() => cal.toJdn (1003, 13,  7)).to.throw ('Invalid day');
   });
});
