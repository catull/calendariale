/* global describe it: true */

import { expect } from 'chai';
import 'dirty-chai';
import { describe, it } from 'mocha';

import { J0000 } from '../../Const';
import { IslamicCalendar as cal } from '../../calendar/IslamicCalendar';

const data2 = [
  { 'rataDie': -214193, 'islamic': { 'year': -1245, 'month': 12, 'day':  9 } },
  { 'rataDie':  -61387, 'islamic': { 'year':  -813, 'month':  2, 'day': 23 } },
  { 'rataDie':   25469, 'islamic': { 'year':  -568, 'month':  4, 'day':  1 } },
  { 'rataDie':   49217, 'islamic': { 'year':  -501, 'month':  4, 'day':  6 } },
  { 'rataDie':  171307, 'islamic': { 'year':  -157, 'month': 10, 'day': 17 } },
  { 'rataDie':  210155, 'islamic': { 'year':   -47, 'month':  6, 'day':  3 } },
  { 'rataDie':  253427, 'islamic': { 'year':    75, 'month':  7, 'day': 13 } },
  { 'rataDie':  369740, 'islamic': { 'year':   403, 'month': 10, 'day':  5 } },
  { 'rataDie':  400085, 'islamic': { 'year':   489, 'month':  5, 'day': 22 } },
  { 'rataDie':  434355, 'islamic': { 'year':   586, 'month':  2, 'day':  7 } },
  { 'rataDie':  452605, 'islamic': { 'year':   637, 'month':  8, 'day':  7 } },
  { 'rataDie':  470160, 'islamic': { 'year':   687, 'month':  2, 'day': 20 } },
  { 'rataDie':  473837, 'islamic': { 'year':   697, 'month':  7, 'day':  7 } },
  { 'rataDie':  507850, 'islamic': { 'year':   793, 'month':  7, 'day':  1 } },
  { 'rataDie':  524156, 'islamic': { 'year':   839, 'month':  7, 'day':  6 } },
  { 'rataDie':  544676, 'islamic': { 'year':   897, 'month':  6, 'day':  1 } },
  { 'rataDie':  567118, 'islamic': { 'year':   960, 'month':  9, 'day': 30 } },
  { 'rataDie':  569477, 'islamic': { 'year':   967, 'month':  5, 'day': 27 } },
  { 'rataDie':  601716, 'islamic': { 'year':  1058, 'month':  5, 'day': 18 } },
  { 'rataDie':  613424, 'islamic': { 'year':  1091, 'month':  6, 'day':  2 } },
  { 'rataDie':  626596, 'islamic': { 'year':  1128, 'month':  8, 'day':  4 } },
  { 'rataDie':  645554, 'islamic': { 'year':  1182, 'month':  2, 'day':  3 } },
  { 'rataDie':  664224, 'islamic': { 'year':  1234, 'month': 10, 'day': 10 } },
  { 'rataDie':  671401, 'islamic': { 'year':  1255, 'month':  1, 'day': 11 } },
  { 'rataDie':  694799, 'islamic': { 'year':  1321, 'month':  1, 'day': 21 } },
  { 'rataDie':  704424, 'islamic': { 'year':  1348, 'month':  3, 'day': 19 } },
  { 'rataDie':  708842, 'islamic': { 'year':  1360, 'month':  9, 'day':  8 } },
  { 'rataDie':  709409, 'islamic': { 'year':  1362, 'month':  4, 'day': 13 } },
  { 'rataDie':  709580, 'islamic': { 'year':  1362, 'month': 10, 'day':  7 } },
  { 'rataDie':  727274, 'islamic': { 'year':  1412, 'month':  9, 'day': 13 } },
  { 'rataDie':  728714, 'islamic': { 'year':  1416, 'month': 10, 'day':  5 } },
  { 'rataDie':  744313, 'islamic': { 'year':  1460, 'month': 10, 'day': 12 } },
  { 'rataDie':  764652, 'islamic': { 'year':  1518, 'month':  3, 'day':  5 } }
];

describe ('Islamic calendar spec', () => {
  let julian, date, expected, actual;

  it ('should convert a Islamic date to Julian day', () => {
    data2.forEach (dt => {
      expected = dt.rataDie + J0000;
      date     = dt.islamic;
      actual   = cal.toJdn (date.year, date.month, date.day);
      expect (expected).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Islamic date', () => {
    data2.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.islamic;
      expected = { 'jdn': julian, 'year': date.year, 'month': date.month, 'day': date.day, 'yearLeap': cal.isLeapYear (date.year) };
      actual   = cal.fromJdn (julian);

      expect (expected).to.be.eql (actual);
      // expect (expected.year).to.be.equal (actual.year);
      // expect (expected.month).to.be.equal (actual.month);
      // expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('should determine whether a Islamic year is leap year', () => {
    expect (cal.isLeapYear (  1)).to.be.equal (false);
    expect (cal.isLeapYear (168)).to.be.equal (true);
    expect (cal.isLeapYear (169)).to.be.equal (false);
    expect (cal.isLeapYear (170)).to.be.equal (false);
    expect (cal.isLeapYear (173)).to.be.equal (false);
    expect (cal.isLeapYear (174)).to.be.equal (true);
    expect (cal.isLeapYear (220)).to.be.equal (true);
  });

  it ('throws validation exceptions', () => {
    expect (() => cal.toJdn (220,  0, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (220, -2, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (220, 13, 10)).to.throw ('Invalid month');
    expect (() => cal.toJdn (220,  7, -5)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220,  1, 31)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220,  2, 30)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220,  3, 31)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220,  4, 30)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220,  5, 31)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220,  6, 30)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220,  7, 31)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220,  8, 30)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220,  9, 31)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220, 10, 30)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220, 11, 31)).to.throw ('Invalid day');
    expect (() => cal.toJdn (220, 12, 31)).to.throw ('Invalid day');
    expect (() => cal.toJdn (221, 12, 30)).to.throw ('Invalid day');
  });
});
