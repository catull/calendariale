/* global describe it: true */

import { expect } from 'chai';
import 'dirty-chai';
import { describe, it } from 'mocha';

import { IsoWeekCalendar as cal } from '../../lib/calendar/IsoWeekCalendar';

const data1 = [
  { 'julianDay': 1507231.5, 'iso': { 'year': -586, 'week': 29, 'day': 7 } },
  { 'julianDay': 1660037.5, 'iso': { 'year': -168, 'week': 49, 'day': 3 } },
  { 'julianDay': 1746893.5, 'iso': { 'year':   70, 'week': 39, 'day': 3 } },
  { 'julianDay': 1770641.5, 'iso': { 'year':  135, 'week': 39, 'day': 7 } },
  { 'julianDay': 1892731.5, 'iso': { 'year':  470, 'week':  2, 'day': 3 } },
  { 'julianDay': 1931579.5, 'iso': { 'year':  576, 'week': 21, 'day': 1 } },
  { 'julianDay': 1974851.5, 'iso': { 'year':  694, 'week': 45, 'day': 6 } },
  { 'julianDay': 2091164.5, 'iso': { 'year': 1013, 'week': 16, 'day': 7 } },
  { 'julianDay': 2121509.5, 'iso': { 'year': 1096, 'week': 21, 'day': 7 } },
  { 'julianDay': 2155779.5, 'iso': { 'year': 1190, 'week': 12, 'day': 5 } },
  { 'julianDay': 2174029.5, 'iso': { 'year': 1240, 'week': 10, 'day': 6 } },
  { 'julianDay': 2191584.5, 'iso': { 'year': 1288, 'week': 14, 'day': 5 } },
  { 'julianDay': 2195261.5, 'iso': { 'year': 1298, 'week': 17, 'day': 7 } },
  { 'julianDay': 2229274.5, 'iso': { 'year': 1391, 'week': 23, 'day': 7 } },
  { 'julianDay': 2245580.5, 'iso': { 'year': 1436, 'week':  5, 'day': 3 } },
  { 'julianDay': 2266100.5, 'iso': { 'year': 1492, 'week': 14, 'day': 6 } },
  { 'julianDay': 2288542.5, 'iso': { 'year': 1553, 'week': 38, 'day': 6 } },
  { 'julianDay': 2290901.5, 'iso': { 'year': 1560, 'week':  9, 'day': 6 } },
  { 'julianDay': 2323140.5, 'iso': { 'year': 1648, 'week': 24, 'day': 3 } },
  { 'julianDay': 2334848.5, 'iso': { 'year': 1680, 'week': 26, 'day': 7 } },
  { 'julianDay': 2348020.5, 'iso': { 'year': 1716, 'week': 30, 'day': 5 } },
  { 'julianDay': 2366978.5, 'iso': { 'year': 1768, 'week': 24, 'day': 7 } },
  { 'julianDay': 2385648.5, 'iso': { 'year': 1819, 'week': 31, 'day': 1 } },
  { 'julianDay': 2392825.5, 'iso': { 'year': 1839, 'week': 13, 'day': 3 } },
  { 'julianDay': 2416223.5, 'iso': { 'year': 1903, 'week': 16, 'day': 7 } },
  { 'julianDay': 2425848.5, 'iso': { 'year': 1929, 'week': 34, 'day': 7 } },
  { 'julianDay': 2430266.5, 'iso': { 'year': 1941, 'week': 40, 'day': 1 } },
  { 'julianDay': 2430833.5, 'iso': { 'year': 1943, 'week': 16, 'day': 1 } },
  { 'julianDay': 2431004.5, 'iso': { 'year': 1943, 'week': 40, 'day': 4 } },
  { 'julianDay': 2448698.5, 'iso': { 'year': 1992, 'week': 12, 'day': 2 } },
  { 'julianDay': 2450138.5, 'iso': { 'year': 1996, 'week':  8, 'day': 7 } },
  { 'julianDay': 2465737.5, 'iso': { 'year': 2038, 'week': 45, 'day': 3 } },
  { 'julianDay': 2486076.5, 'iso': { 'year': 2094, 'week': 28, 'day': 7 } }
];

describe ('ISO Week calendar spec', () => {
  let date, expected, actual;


  it ('should convert an ISO Week date to Julian day', () => {
    data1.forEach (dt => {
      date     = dt.iso;
      actual   = cal.toJdn (date.year, date.week, date.day);

      expect (dt.julianDay).to.be.equal (actual);
    });
  });

  it ('should convert a Julian day to an ISO Week date', () => {
    data1.forEach (dt => {
      date     = dt.iso;
      expected = { 'jdn': dt.julianDay, 'year': date.year, 'week': date.week, 'day': date.day };
      actual   = cal.fromJdn (dt.julianDay);

      // expect (expected).to.be.equal (actual);
      expect (expected.year).to.be.equal (actual.year);
      expect (expected.week).to.be.equal (actual.week);
      expect (expected.day).to.be.equal (actual.day);
    });
  });

  it ('throws validation exceptions', () => {
    expect (() => cal.toJdn (1999,  0, 2)).to.throw ('Invalid week');
    expect (() => cal.toJdn (1999, -2, 2)).to.throw ('Invalid week');
    expect (() => cal.toJdn (1999, 54, 1)).to.throw ('Invalid week');
    expect (() => cal.toJdn (1999, 52, 0)).to.throw ('Invalid day');
    expect (() => cal.toJdn (1999,  1, 8)).to.throw ('Invalid day');
  });
});
