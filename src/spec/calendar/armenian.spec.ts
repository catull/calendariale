import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { ArmenianDate } from '../../calendar';
import { ArmenianCalendar as cal } from '../../calendar/ArmenianCalendar';

const dates = [
  { jdn: 1507231.5, date: { year: -1138, month:  4, day: 10 } },
  { jdn: 1660037.5, date: { year:  -720, month: 12, day:  6 } },
  { jdn: 1746893.5, date: { year:  -482, month: 11, day: 22 } },
  { jdn: 1770641.5, date: { year:  -417, month: 12, day: 15 } },
  { jdn: 1892731.5, date: { year:   -82, month:  6, day: 10 } },
  { jdn: 1931579.5, date: { year:    24, month: 11, day: 18 } },
  { jdn: 1974851.5, date: { year:   143, month:  6, day:  5 } },
  { jdn: 2091164.5, date: { year:   462, month:  2, day:  3 } },
  { jdn: 2121509.5, date: { year:   545, month:  3, day: 23 } },
  { jdn: 2155779.5, date: { year:   639, month:  2, day: 13 } },
  { jdn: 2174029.5, date: { year:   689, month:  2, day: 13 } },
  { jdn: 2191584.5, date: { year:   737, month:  3, day: 18 } },
  { jdn: 2195261.5, date: { year:   747, month:  4, day: 15 } },
  { jdn: 2229274.5, date: { year:   840, month:  6, day: 23 } },
  { jdn: 2245580.5, date: { year:   885, month:  2, day: 24 } },
  { jdn: 2266100.5, date: { year:   941, month:  5, day: 14 } },
  { jdn: 2288542.5, date: { year:  1002, month: 11, day: 11 } },
  { jdn: 2290901.5, date: { year:  1009, month:  4, day: 25 } },
  { jdn: 2323140.5, date: { year:  1097, month:  8, day: 24 } },
  { jdn: 2334848.5, date: { year:  1129, month:  9, day: 22 } },
  { jdn: 2348020.5, date: { year:  1165, month: 10, day: 24 } },
  { jdn: 2366978.5, date: { year:  1217, month: 10, day:  2 } },
  { jdn: 2385648.5, date: { year:  1268, month: 11, day: 27 } },
  { jdn: 2392825.5, date: { year:  1288, month:  7, day: 24 } },
  { jdn: 2416223.5, date: { year:  1352, month:  9, day:  2 } },
  { jdn: 2425848.5, date: { year:  1379, month:  1, day: 12 } },
  { jdn: 2430266.5, date: { year:  1391, month:  2, day: 20 } },
  { jdn: 2430833.5, date: { year:  1392, month:  9, day: 12 } },
  { jdn: 2431004.5, date: { year:  1393, month:  2, day: 28 } },
  { jdn: 2448698.5, date: { year:  1441, month:  8, day: 22 } },
  { jdn: 2450138.5, date: { year:  1445, month:  8, day:  2 } },
  { jdn: 2465737.5, date: { year:  1488, month:  4, day: 26 } },
  { jdn: 2486076.5, date: { year:  1544, month:  1, day: 15 } },
];

describe ('Armenian calendar spec', () => {
  it ('should convert an Armenian date to Julian day number (JDN)', () => {
    dates.forEach (({ jdn, date}) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (jdn).toBe (actual);
    });
  });

  it ('should convert a Julian day number (JDN) to an Armenian date', () => {
    dates.forEach (({ jdn, date}) => {
      const actual: ArmenianDate = cal.fromJdn (jdn);

      expect ({ jdn, ...date }).toEqual (actual);
      expect (date.year).toBe (actual.getYear());
      expect (date.month).toBe (actual.getMonth());
      expect (date.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1000,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000, 15, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1000,  7,  0)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000,  7, 35)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1000, 13,  6)).toThrow (INVALID_DAY);
   });
});
