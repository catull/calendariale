/* global describe it: true */

'use strict';

const chai = require ('chai');
const Const = require ('../../build/Calendrical/Const.js');
const cal = require ('../../build/Calendrical/calendar/BahaiCalendar.js').BahaiCalendar;

require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

const data2 = [
  { 'rataDie': -214193, 'bahai': { 'kull_i_shay': -6, 'vahid': 6, 'year': 3, 'month': 7, 'day': 12 } },
  { 'rataDie': -61387, 'bahai': { 'kull_i_shay': -5, 'vahid': 9, 'year': 3, 'month': 14, 'day': 13 } },
  { 'rataDie':  25469, 'bahai': { 'kull_i_shay': -4, 'vahid': 2, 'year': 13, 'month': 10, 'day': 17 } },
  { 'rataDie':  49217, 'bahai': { 'kull_i_shay': -4, 'vahid': 6, 'year': 2, 'month': 11, 'day': 6 } },
  { 'rataDie': 171307, 'bahai': { 'kull_i_shay': -3, 'vahid': 4, 'year': 13, 'month': 16, 'day': 9 } },
  { 'rataDie': 210155, 'bahai': { 'kull_i_shay': -3, 'vahid': 10, 'year': 6, 'month': 4, 'day': 4 } },
  { 'rataDie': 253427, 'bahai': { 'kull_i_shay': -3, 'vahid': 16, 'year': 10, 'month': 13, 'day': 7 } },
  { 'rataDie': 369740, 'bahai': { 'kull_i_shay': -2, 'vahid': 14, 'year': 6, 'month': 2, 'day': 17 } },
  { 'rataDie': 400085, 'bahai': { 'kull_i_shay': -2, 'vahid': 18, 'year': 13, 'month': 4, 'day': 8 } },
  { 'rataDie': 434355, 'bahai': { 'kull_i_shay': -1, 'vahid': 4, 'year': 12, 'month': 1, 'day': 3 } },
  { 'rataDie': 452605, 'bahai': { 'kull_i_shay': -1, 'vahid': 7, 'year': 4, 'month': 19, 'day': 9 } },
  { 'rataDie': 470160, 'bahai': { 'kull_i_shay': -1, 'vahid': 9, 'year': 15, 'month': 1, 'day': 13 } },
  { 'rataDie': 473837, 'bahai': { 'kull_i_shay': -1, 'vahid': 10, 'year': 6, 'month': 2, 'day': 19 } },
  { 'rataDie': 507850, 'bahai': { 'kull_i_shay': -1, 'vahid': 15, 'year': 4, 'month': 5, 'day': 8 } },
  { 'rataDie': 524156, 'bahai': { 'kull_i_shay': -1, 'vahid': 17, 'year': 10, 'month': 17, 'day': 16 } },
  { 'rataDie': 544676, 'bahai': { 'kull_i_shay': 0, 'vahid': 1, 'year': 10, 'month': 2, 'day': 1 } },
  { 'rataDie': 567118, 'bahai': { 'kull_i_shay': 0, 'vahid': 4, 'year': 14, 'month': 10, 'day': 12 } },
  { 'rataDie': 569477, 'bahai': { 'kull_i_shay': 0, 'vahid': 5, 'year': 1, 'month': 19, 'day': 4 } },
  { 'rataDie': 601716, 'bahai': { 'kull_i_shay': 0, 'vahid': 9, 'year': 14, 'month': 5, 'day': 6 } },
  { 'rataDie': 613424, 'bahai': { 'kull_i_shay': 0, 'vahid': 11, 'year': 8, 'month': 6, 'day': 7 } },
  { 'rataDie': 626596, 'bahai': { 'kull_i_shay': 0, 'vahid': 13, 'year': 6, 'month': 7, 'day': 12 } },
  { 'rataDie': 645554, 'bahai': { 'kull_i_shay': 0, 'vahid': 16, 'year': 1, 'month': 5, 'day': 15 } },
  { 'rataDie': 664224, 'bahai': { 'kull_i_shay': 0, 'vahid': 18, 'year': 14, 'month': 8, 'day': 2 } },
  { 'rataDie': 671401, 'bahai': { 'kull_i_shay': 0, 'vahid': 19, 'year': 15, 'month': 1, 'day': 7 } },
  { 'rataDie': 694799, 'bahai': { 'kull_i_shay': 1, 'vahid': 4, 'year': 3, 'month': 2, 'day': 11 } },
  { 'rataDie': 704424, 'bahai': { 'kull_i_shay': 1, 'vahid': 5, 'year': 10, 'month': 9, 'day': 6 } },
  { 'rataDie': 708842, 'bahai': { 'kull_i_shay': 1, 'vahid': 6, 'year': 3, 'month': 11, 'day': 3 } },
  { 'rataDie': 709409, 'bahai': { 'kull_i_shay': 1, 'vahid': 6, 'year': 5, 'month': 2, 'day': 11 } },
  { 'rataDie': 709580, 'bahai': { 'kull_i_shay': 1, 'vahid': 6, 'year': 5, 'month': 11, 'day': 11 } },
  { 'rataDie': 727274, 'bahai': { 'kull_i_shay': 1, 'vahid': 8, 'year': 15, 'month': 19, 'day': 16 } },
  { 'rataDie': 728714, 'bahai': { 'kull_i_shay': 1, 'vahid': 8, 'year': 19, 'month': 18, 'day': 19 } },
  { 'rataDie': 744313, 'bahai': { 'kull_i_shay': 1, 'vahid': 11, 'year': 5, 'month': 13, 'day': 7 } },
  { 'rataDie': 764652, 'bahai': { 'kull_i_shay': 1, 'vahid': 14, 'year': 4, 'month': 7, 'day': 6 } },
];

describe ('Bahai calendar spec', function () {
  let date, expected, actual,
      julian = 2456435.5;

  /*
  it ('should convert a date to Bahai calendar', function () {
    expect (date.getBahai()).to.be.eql ({
      kull_i_shay: 1,
      vahid: 9,
      year: 'Abhá',
      month: 'Rahmat',
      day: 'Bahá',
      weekday: 'Jalál',
      leap: false,
      official: true
    }
    );
  });
  */

  it ('should convert a Bahai date to Julian day', function () {
    // expect (cal.bahaiToJdn ( 1,  9, 18,  6,  1)).to.be.equal (julian);
    // expect (cal.bahaiToJdn ( 1, 10,  2,  0,  1)).to.be.equal (2457810.5);

    data2.forEach (function (data) {
      expected = data.rataDie + Const.J0000;
      date = data.bahai;
      actual = cal.bahaiToJdn (date.kull_i_shay, date.vahid, date.year, date.month, date.day);

      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Bahai date', function () {
    // expect (cal.fromJdn (julian)).to.be.eql ([ 1, 9, 18, 6, 1 ]);
    // expect (cal.fromJdn (2457810.5)).to.be.eql ([ 1, 10,  2,  0,  1 ]);

    data2.forEach (function (data) {
      julian = data.rataDie + Const.J0000;
      date = data.bahai;
      expected = { kull_i_shay: date.kull_i_shay, vahid: date.vahid, year: date.year, month: date.month, day: date.day };
      actual = cal.fromJdn (julian);

      expect (expected.kull_i_shay).to.be.equal (actual.kull_i_shay);
      expect (expected.vahid).to.be.equal (actual.vahid);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.month).to.be.equal (actual.month);
      expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('should determine whether a Bahai year is leap year', function () {
    // the Bahai years 1 and 169 are the limits of the old leap rule
    expect (cal.isLeapYear (1)).to.be.equal (true);
    expect (cal.isLeapYear (168)).to.be.equal (false);
    expect (cal.isLeapYear (169)).to.be.equal (true);
    expect (cal.isLeapYear (170)).to.be.equal (false);

    // starting with the Bahai year 172, the new rule is in place
    expect (cal.isLeapYear (173)).to.be.equal (false);
    expect (cal.isLeapYear (174)).to.be.equal (true);
    expect (cal.isLeapYear (220)).to.be.equal (true);
  });
});
