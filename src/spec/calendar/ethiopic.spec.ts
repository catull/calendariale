import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { EthiopicCalendar as cal } from '../../calendar/EthiopicCalendar';

const dates = [
  { jdn: 1507231.5, date: { year: -594, month: 12, day:  6 } },
  { jdn: 1660037.5, date: { year: -175, month:  4, day: 12 } },
  { jdn: 1746893.5, date: { year:   63, month:  1, day: 29 } },
  { jdn: 1770641.5, date: { year:  128, month:  2, day:  5 } },
  { jdn: 1892731.5, date: { year:  462, month:  5, day: 12 } },
  { jdn: 1931579.5, date: { year:  568, month:  9, day: 23 } },
  { jdn: 1974851.5, date: { year:  687, month:  3, day: 11 } },
  { jdn: 2091164.5, date: { year: 1005, month:  8, day: 24 } },
  { jdn: 2121509.5, date: { year: 1088, month:  9, day: 23 } },
  { jdn: 2155779.5, date: { year: 1182, month:  7, day: 20 } },
  { jdn: 2174029.5, date: { year: 1232, month:  7, day:  7 } },
  { jdn: 2191584.5, date: { year: 1280, month:  7, day: 30 } },
  { jdn: 2195261.5, date: { year: 1290, month:  8, day: 25 } },
  { jdn: 2229274.5, date: { year: 1383, month: 10, day: 10 } },
  { jdn: 2245580.5, date: { year: 1428, month:  5, day: 29 } },
  { jdn: 2266100.5, date: { year: 1484, month:  8, day:  5 } },
  { jdn: 2288542.5, date: { year: 1546, month:  1, day: 12 } },
  { jdn: 2290901.5, date: { year: 1552, month:  6, day: 29 } },
  { jdn: 2323140.5, date: { year: 1640, month: 10, day:  6 } },
  { jdn: 2334848.5, date: { year: 1672, month: 10, day: 26 } },
  { jdn: 2348020.5, date: { year: 1708, month: 11, day: 19 } },
  { jdn: 2366978.5, date: { year: 1760, month: 10, day: 14 } },
  { jdn: 2385648.5, date: { year: 1811, month: 11, day: 27 } },
  { jdn: 2392825.5, date: { year: 1831, month:  7, day: 19 } },
  { jdn: 2416223.5, date: { year: 1895, month:  8, day: 11 } },
  { jdn: 2425848.5, date: { year: 1921, month: 12, day: 19 } },
  { jdn: 2430266.5, date: { year: 1934, month:  1, day: 19 } },
  { jdn: 2430833.5, date: { year: 1935, month:  8, day: 11 } },
  { jdn: 2431004.5, date: { year: 1936, month:  1, day: 26 } },
  { jdn: 2448698.5, date: { year: 1984, month:  7, day:  8 } },
  { jdn: 2450138.5, date: { year: 1988, month:  6, day: 17 } },
  { jdn: 2465737.5, date: { year: 2031, month:  3, day:  1 } },
  { jdn: 2486076.5, date: { year: 2086, month: 11, day: 11 } },
];

describe ('Ethiopic calendar spec', () => {
  it ('should convert an Ethiopic date to Julian day number (JDN)', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day number (JDN) to an Ethiopic date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (actual).toEqual (expected);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1000,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, 15, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000,  7,  0)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, 35)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000, 13,  7)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1001, 13,  6)).toThrow (INVALID_DAY);
   });
});
