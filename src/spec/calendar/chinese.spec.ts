/* global describe it: true */

import { expect } from 'chai';
import 'dirty-chai';
import { describe, it } from 'mocha';

import { J0000 } from '../../Const';
import { ChineseCalendar as cal } from '../../calendar/ChineseCalendar';

const data4 = [
  { 'rataDie': -214193, 'chinese': { 'cycle': 35, 'year': 11, 'month':  6, 'monthLeap': false, 'day': 12 } },
  { 'rataDie':  -61387, 'chinese': { 'cycle': 42, 'year':  9, 'month': 10, 'monthLeap': false, 'day': 27 } },
  { 'rataDie':   25469, 'chinese': { 'cycle': 46, 'year':  7, 'month':  8, 'monthLeap': false, 'day':  4 } },
  { 'rataDie':   49217, 'chinese': { 'cycle': 47, 'year': 12, 'month':  8, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  171307, 'chinese': { 'cycle': 52, 'year': 46, 'month': 11, 'monthLeap': false, 'day': 20 } },
  { 'rataDie':  210155, 'chinese': { 'cycle': 54, 'year': 33, 'month':  4, 'monthLeap': false, 'day':  5 } },
  { 'rataDie':  253427, 'chinese': { 'cycle': 56, 'year': 31, 'month': 10, 'monthLeap': false, 'day': 15 } },
  { 'rataDie':  369740, 'chinese': { 'cycle': 61, 'year': 50, 'month':  3, 'monthLeap': false, 'day':  7 } },
  { 'rataDie':  400085, 'chinese': { 'cycle': 63, 'year': 13, 'month':  4, 'monthLeap': false, 'day': 24 } },
  { 'rataDie':  434355, 'chinese': { 'cycle': 64, 'year': 47, 'month':  2, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  452605, 'chinese': { 'cycle': 65, 'year': 37, 'month':  2, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  470160, 'chinese': { 'cycle': 66, 'year': 25, 'month':  2, 'monthLeap': false, 'day': 23 } },
  { 'rataDie':  473837, 'chinese': { 'cycle': 66, 'year': 35, 'month':  3, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  507850, 'chinese': { 'cycle': 68, 'year':  8, 'month':  5, 'monthLeap': false, 'day':  2 } },
  { 'rataDie':  524156, 'chinese': { 'cycle': 68, 'year': 53, 'month':  1, 'monthLeap': false, 'day':  8 } },
  { 'rataDie':  544676, 'chinese': { 'cycle': 69, 'year': 49, 'month':  3, 'monthLeap': false, 'day':  4 } },
  { 'rataDie':  567118, 'chinese': { 'cycle': 70, 'year': 50, 'month':  8, 'monthLeap': false, 'day':  2 } },
  { 'rataDie':  569477, 'chinese': { 'cycle': 70, 'year': 57, 'month':  1, 'monthLeap': false, 'day': 29 } },
  { 'rataDie':  601716, 'chinese': { 'cycle': 72, 'year': 25, 'month':  4, 'monthLeap': true,  'day': 20 } },
  { 'rataDie':  613424, 'chinese': { 'cycle': 72, 'year': 57, 'month':  6, 'monthLeap': false, 'day':  5 } },
  { 'rataDie':  626596, 'chinese': { 'cycle': 73, 'year': 33, 'month':  6, 'monthLeap': false, 'day':  6 } },
  { 'rataDie':  645554, 'chinese': { 'cycle': 74, 'year': 25, 'month':  5, 'monthLeap': false, 'day':  5 } },
  { 'rataDie':  664224, 'chinese': { 'cycle': 75, 'year': 16, 'month':  6, 'monthLeap': false, 'day': 12 } },
  { 'rataDie':  671401, 'chinese': { 'cycle': 75, 'year': 36, 'month':  2, 'monthLeap': false, 'day': 13 } },
  { 'rataDie':  694799, 'chinese': { 'cycle': 76, 'year': 40, 'month':  3, 'monthLeap': false, 'day': 22 } },
  { 'rataDie':  704424, 'chinese': { 'cycle': 77, 'year':  6, 'month':  7, 'monthLeap': false, 'day': 21 } },
  { 'rataDie':  708842, 'chinese': { 'cycle': 77, 'year': 18, 'month':  8, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  709409, 'chinese': { 'cycle': 77, 'year': 20, 'month':  3, 'monthLeap': false, 'day': 15 } },
  { 'rataDie':  709580, 'chinese': { 'cycle': 77, 'year': 20, 'month':  9, 'monthLeap': false, 'day':  9 } },
  { 'rataDie':  727274, 'chinese': { 'cycle': 78, 'year':  9, 'month':  2, 'monthLeap': false, 'day': 14 } },
  { 'rataDie':  728714, 'chinese': { 'cycle': 78, 'year': 13, 'month':  1, 'monthLeap': false, 'day':  7 } },
  { 'rataDie':  744313, 'chinese': { 'cycle': 78, 'year': 55, 'month': 10, 'monthLeap': false, 'day': 14 } },
  { 'rataDie':  764652, 'chinese': { 'cycle': 79, 'year': 51, 'month':  6, 'monthLeap': false, 'day':  7 } }
];

describe ('Chinese calendar spec', () => {
  let date, expected, actual, julian;

  it ('should convert a Chinese date to Julian day', () => {
    data4.forEach (dt => {
      date     = dt.chinese;
      julian   = dt.rataDie + J0000;
      actual   = cal.toJdn (date.cycle, date.year, date.month, date.monthLeap, date.day);
      expect (julian).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to a Chinese date', () => {
    data4.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.chinese;
      expected = { jdn: julian, cycle: date.cycle, year: date.year, month: date.month, monthLeap: date.monthLeap, day: date.day };
      actual   = cal.fromJdn (julian);

      expect (expected).to.be.eql (actual);
      // expect (expected.cycle).to.be.equal (actual.cycle);
      // expect (expected.year).to.be.equal (actual.year);
      // expect (expected.month).to.be.equal (actual.month);
      // expect (expected.monthLeap).to.be.equal (actual.monthLeap);
      // expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (78,  0,  1, false,  1)).to.throw ('Invalid year');
    expect (() => cal.toJdn (78, 61,  1, false,  1)).to.throw ('Invalid year');
    expect (() => cal.toJdn (78,  1,  0, false,  1)).to.throw ('Invalid month');
    expect (() => cal.toJdn (78,  1, 14, false,  1)).to.throw ('Invalid month');
    expect (() => cal.toJdn (78, 34,  5, true ,  1)).to.throw ('Invalid leap month');
    expect (() => cal.toJdn (78, 34,  4, false, 31)).to.throw ('Invalid day');
    expect (() => cal.toJdn (78, 34,  5, false, 30)).to.throw ('Invalid day');
    expect (() => cal.toJdn (78, 34,  6, false, 30)).to.throw ('Invalid day');
    expect (() => cal.toJdn (78, 34,  6, true , 30)).not.to.throw ('Invalid day');
  });
});
