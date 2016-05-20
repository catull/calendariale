/* global describe it: true */

'use strict';

const chai = require ('chai');
const cal = require ('../../build/Calendrical/calendar/GregorianCalendar.js').GregorianCalendar;

require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data1 = [
  { 'julianDay': 1507231.5, 'gregorian': { 'year': -586, 'month':  7, 'day': 24  } },
  { 'julianDay': 1660037.5, 'gregorian': { 'year': -168, 'month': 12, 'day':  5  } },
  { 'julianDay': 1746893.5, 'gregorian': { 'year':   70, 'month':  9, 'day': 24  } },
  { 'julianDay': 1770641.5, 'gregorian': { 'year':  135, 'month': 10, 'day':  2  } },
  { 'julianDay': 1892731.5, 'gregorian': { 'year':  470, 'month':  1, 'day':  8  } },
  { 'julianDay': 1931579.5, 'gregorian': { 'year':  576, 'month':  5, 'day': 20  } },
  { 'julianDay': 1974851.5, 'gregorian': { 'year':  694, 'month': 11, 'day': 10  } },
  { 'julianDay': 2091164.5, 'gregorian': { 'year': 1013, 'month':  4, 'day': 25  } },
  { 'julianDay': 2121509.5, 'gregorian': { 'year': 1096, 'month':  5, 'day': 24  } },
  { 'julianDay': 2155779.5, 'gregorian': { 'year': 1190, 'month':  3, 'day': 23  } },
  { 'julianDay': 2174029.5, 'gregorian': { 'year': 1240, 'month':  3, 'day': 10  } },
  { 'julianDay': 2191584.5, 'gregorian': { 'year': 1288, 'month':  4, 'day':  2  } },
  { 'julianDay': 2195261.5, 'gregorian': { 'year': 1298, 'month':  4, 'day': 27  } },
  { 'julianDay': 2229274.5, 'gregorian': { 'year': 1391, 'month':  6, 'day': 12  } },
  { 'julianDay': 2245580.5, 'gregorian': { 'year': 1436, 'month':  2, 'day':  3  } },
  { 'julianDay': 2266100.5, 'gregorian': { 'year': 1492, 'month':  4, 'day':  9  } },
  { 'julianDay': 2288542.5, 'gregorian': { 'year': 1553, 'month':  9, 'day': 19  } },
  { 'julianDay': 2290901.5, 'gregorian': { 'year': 1560, 'month':  3, 'day':  5  } },
  { 'julianDay': 2323140.5, 'gregorian': { 'year': 1648, 'month':  6, 'day': 10  } },
  { 'julianDay': 2334848.5, 'gregorian': { 'year': 1680, 'month':  6, 'day': 30  } },
  { 'julianDay': 2348020.5, 'gregorian': { 'year': 1716, 'month':  7, 'day': 24  } },
  { 'julianDay': 2366978.5, 'gregorian': { 'year': 1768, 'month':  6, 'day': 19  } },
  { 'julianDay': 2385648.5, 'gregorian': { 'year': 1819, 'month':  8, 'day':  2  } },
  { 'julianDay': 2392825.5, 'gregorian': { 'year': 1839, 'month':  3, 'day': 27  } },
  { 'julianDay': 2416223.5, 'gregorian': { 'year': 1903, 'month':  4, 'day': 19  } },
  { 'julianDay': 2425848.5, 'gregorian': { 'year': 1929, 'month':  8, 'day': 25  } },
  { 'julianDay': 2430266.5, 'gregorian': { 'year': 1941, 'month':  9, 'day': 29  } },
  { 'julianDay': 2430833.5, 'gregorian': { 'year': 1943, 'month':  4, 'day': 19  } },
  { 'julianDay': 2431004.5, 'gregorian': { 'year': 1943, 'month': 10, 'day':  7  } },
  { 'julianDay': 2448698.5, 'gregorian': { 'year': 1992, 'month':  3, 'day': 17  } },
  { 'julianDay': 2450138.5, 'gregorian': { 'year': 1996, 'month':  2, 'day': 25  } },
  { 'julianDay': 2465737.5, 'gregorian': { 'year': 2038, 'month': 11, 'day': 10  } },
  { 'julianDay': 2486076.5, 'gregorian': { 'year': 2094, 'month':  7, 'day': 18  } }
];

describe ('Gregorian calendar spec', function () {
  let date, expected, actual;


  it ('should convert a Gregorian date to Julian day', function () {
    data1.forEach (function (data) {
      date = data.gregorian;
      expected = data.julianDay;
      actual = cal.toJdn (date.year, date.month, date.day);

      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Gregorian date', function () {
    data1.forEach (function (data) {
      date = data.gregorian;
      expected = { year: date.year, month: date.month, day: date.day };
      actual = cal.fromJdn (data.julianDay);

      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('should determine whether a Gregorian year is leap year', function () {
    [ 0, 4, 20, 1600, 1760, 1840, 1904, 1980, 2000 ].forEach (function (year) {
      expect (cal.isLeapYear (year)).to.be.equal (true);
    });

    [ 1, 2, 3, 5, 1599, 1700, 1800, 1900, 1970, 2001 ].forEach (function (year) {
      expect (cal.isLeapYear (year)).to.be.equal (false);
    });
  });
});
