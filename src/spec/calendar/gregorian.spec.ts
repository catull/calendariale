import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { GregorianCalendar as cal } from '../../calendar/GregorianCalendar';

const dates = [
  { jdn: 1507231.5, date: { year: -586, month:  7, day: 24  } },
  { jdn: 1660037.5, date: { year: -168, month: 12, day:  5  } },
  { jdn: 1746893.5, date: { year:   70, month:  9, day: 24  } },
  { jdn: 1770641.5, date: { year:  135, month: 10, day:  2  } },
  { jdn: 1892731.5, date: { year:  470, month:  1, day:  8  } },
  { jdn: 1931579.5, date: { year:  576, month:  5, day: 20  } },
  { jdn: 1974851.5, date: { year:  694, month: 11, day: 10  } },
  { jdn: 2091164.5, date: { year: 1013, month:  4, day: 25  } },
  { jdn: 2121509.5, date: { year: 1096, month:  5, day: 24  } },
  { jdn: 2155779.5, date: { year: 1190, month:  3, day: 23  } },
  { jdn: 2174029.5, date: { year: 1240, month:  3, day: 10  } },
  { jdn: 2191584.5, date: { year: 1288, month:  4, day:  2  } },
  { jdn: 2195261.5, date: { year: 1298, month:  4, day: 27  } },
  { jdn: 2229274.5, date: { year: 1391, month:  6, day: 12  } },
  { jdn: 2245580.5, date: { year: 1436, month:  2, day:  3  } },
  { jdn: 2266100.5, date: { year: 1492, month:  4, day:  9  } },
  { jdn: 2288542.5, date: { year: 1553, month:  9, day: 19  } },
  { jdn: 2290901.5, date: { year: 1560, month:  3, day:  5  } },
  { jdn: 2323140.5, date: { year: 1648, month:  6, day: 10  } },
  { jdn: 2334848.5, date: { year: 1680, month:  6, day: 30  } },
  { jdn: 2348020.5, date: { year: 1716, month:  7, day: 24  } },
  { jdn: 2366978.5, date: { year: 1768, month:  6, day: 19  } },
  { jdn: 2385648.5, date: { year: 1819, month:  8, day:  2  } },
  { jdn: 2392825.5, date: { year: 1839, month:  3, day: 27  } },
  { jdn: 2416223.5, date: { year: 1903, month:  4, day: 19  } },
  { jdn: 2425848.5, date: { year: 1929, month:  8, day: 25  } },
  { jdn: 2430266.5, date: { year: 1941, month:  9, day: 29  } },
  { jdn: 2430833.5, date: { year: 1943, month:  4, day: 19  } },
  { jdn: 2431004.5, date: { year: 1943, month: 10, day:  7  } },
  { jdn: 2448698.5, date: { year: 1992, month:  3, day: 17  } },
  { jdn: 2450138.5, date: { year: 1996, month:  2, day: 25  } },
  { jdn: 2465737.5, date: { year: 2038, month: 11, day: 10  } },
  { jdn: 2486076.5, date: { year: 2094, month:  7, day: 18  } },
];

describe ('Gregorian calendar spec', () => {
  it ('should convert a Gregorian date to Julian day number (JDN)', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day number (JDN) to a Gregorian date', () => {
    dates.forEach (({ jdn, date }) => {
      const yearLeap = cal.isLeapYear (date.year);
      const expected = { jdn, ...date, yearLeap };
      const actual   = cal.fromJdn (jdn);

      expect (expected).toEqual (actual);
      expect (expected.jdn).toBe (actual.getJdn());
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
      expect (expected.yearLeap).toBe (actual.isYearLeap());
    });
  });

  it ('should determine whether a Gregorian year is leap year', () => {
    [ 0, 4, 20, 1600, 1760, 1840, 1904, 1980, 2000 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).toBe (true);
    });

    [ 1, 2, 3, 5, 1599, 1700, 1800, 1900, 1970, 2001 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).toBe (false);
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (1999,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999, 15, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1999,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  7, 32)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1999,  2, 29)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (2000,  2, 30)).toThrow (INVALID_DAY);
   });

   it ('should calculate the difference between to Gregorian dates', () => {
     // Days between 1999/01/01 and 2000/01/01
     expect(cal.dateDifference(cal.fromJdn(2451179.5), cal.fromJdn(2451544.5))).toBe(365);
     // Days between 2000/01/01 and 2001/01/01
     expect(cal.dateDifference(cal.fromJdn(2451544.5), cal.fromJdn(2451910.5))).toBe(366);
   });

});
