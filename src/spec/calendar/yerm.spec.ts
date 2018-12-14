import { INVALID_DAY, INVALID_MONTH, INVALID_YERM } from '../../Const';
import { YermCalendar as cal } from '../../calendar/YermCalendar';

const data1 = [
  { 'julianDay': 1507231.5, 'yerm': { 'cycle': -17, 'yerm': 23, 'month':  2, 'day': 10.5 } },
  { 'julianDay': 1660037.5, 'yerm': { 'cycle': -11, 'yerm': 27, 'month': 10, 'day': 25.5 } },
  { 'julianDay': 1746893.5, 'yerm': { 'cycle':  -8, 'yerm': 51, 'month': 10, 'day':  2.5 } },
  { 'julianDay': 1770641.5, 'yerm': { 'cycle':  -7, 'yerm': 48, 'month': 13, 'day':  8.5 } },
  { 'julianDay': 1892731.5, 'yerm': { 'cycle':  -2, 'yerm': 41, 'month': 12, 'day': 18.5 } },
  { 'julianDay': 1931579.5, 'yerm': { 'cycle':   0, 'yerm': 18, 'month':  3, 'day':  4.5 } },
  { 'julianDay': 1974851.5, 'yerm': { 'cycle':   2, 'yerm':  3, 'month': 13, 'day': 14.5 } },
  { 'julianDay': 2091164.5, 'yerm': { 'cycle':   6, 'yerm': 36, 'month': 13, 'day':  6.5 } },
  { 'julianDay': 2121509.5, 'yerm': { 'cycle':   7, 'yerm': 47, 'month': 11, 'day': 23.5 } },
  { 'julianDay': 2155779.5, 'yerm': { 'cycle':   9, 'yerm': 14, 'month': 11, 'day':  8.5 } },
  { 'julianDay': 2174029.5, 'yerm': { 'cycle':   9, 'yerm': 52, 'month':  9, 'day':  8.5 } },
  { 'julianDay': 2191584.5, 'yerm': { 'cycle':  10, 'yerm': 36, 'month': 13, 'day': 22.5 } },
  { 'julianDay': 2195261.5, 'yerm': { 'cycle':  10, 'yerm': 44, 'month':  8, 'day':  7.5 } },
  { 'julianDay': 2229274.5, 'yerm': { 'cycle':  12, 'yerm': 10, 'month': 16, 'day':  1.5 } },
  { 'julianDay': 2245580.5, 'yerm': { 'cycle':  12, 'yerm': 44, 'month': 12, 'day':  6.5 } },
  { 'julianDay': 2266100.5, 'yerm': { 'cycle':  13, 'yerm': 35, 'month':  4, 'day':  2.5 } },
  { 'julianDay': 2288542.5, 'yerm': { 'cycle':  14, 'yerm': 29, 'month': 12, 'day':  1.5 } },
  { 'julianDay': 2290901.5, 'yerm': { 'cycle':  14, 'yerm': 34, 'month': 10, 'day': 27.5 } },
  { 'julianDay': 2323140.5, 'yerm': { 'cycle':  15, 'yerm': 49, 'month':  7, 'day': 19.5 } },
  { 'julianDay': 2334848.5, 'yerm': { 'cycle':  16, 'yerm': 21, 'month': 10, 'day':  3.5 } },
  { 'julianDay': 2348020.5, 'yerm': { 'cycle':  16, 'yerm': 48, 'month': 15, 'day':  5.5 } },
  { 'julianDay': 2366978.5, 'yerm': { 'cycle':  17, 'yerm': 36, 'month':  3, 'day':  4.5 } },
  { 'julianDay': 2385648.5, 'yerm': { 'cycle':  18, 'yerm': 22, 'month': 15, 'day': 11.5 } },
  { 'julianDay': 2392825.5, 'yerm': { 'cycle':  18, 'yerm': 37, 'month': 13, 'day': 12.5 } },
  { 'julianDay': 2416223.5, 'yerm': { 'cycle':  19, 'yerm': 34, 'month':  4, 'day': 21.5 } },
  { 'julianDay': 2425848.5, 'yerm': { 'cycle':  20, 'yerm':  2, 'month':  2, 'day': 19.5 } },
  { 'julianDay': 2430266.5, 'yerm': { 'cycle':  20, 'yerm': 11, 'month':  5, 'day':  8.5 } },
  { 'julianDay': 2430833.5, 'yerm': { 'cycle':  20, 'yerm': 12, 'month':  7, 'day': 14.5 } },
  { 'julianDay': 2431004.5, 'yerm': { 'cycle':  20, 'yerm': 12, 'month': 13, 'day':  8.5 } },
  { 'julianDay': 2448698.5, 'yerm': { 'cycle':  20, 'yerm': 49, 'month':  9, 'day': 13.5 } },
  { 'julianDay': 2450138.5, 'yerm': { 'cycle':  20, 'yerm': 52, 'month':  9, 'day':  6.5 } },
  { 'julianDay': 2465737.5, 'yerm': { 'cycle':  21, 'yerm': 32, 'month': 13, 'day': 13.5 } },
  { 'julianDay': 2486076.5, 'yerm': { 'cycle':  22, 'yerm': 22, 'month': 16, 'day':  5.5 } }
];

describe ('Yerm calendar spec', () => {
  let date;
  let expected;
  let actual;

  it ('should convert an Yerm date to Julian day', () => {
    data1.forEach (dt => {
      date     = dt.yerm;
      actual   = cal.toJdn (date.cycle, date.yerm, date.month, date.day);

      expect (dt.julianDay).toBe (actual);
    });
  });

  it ('should convert a Julian day to an Yerm date', () => {
    data1.forEach (dt => {
      date     = dt.yerm;
      // expected = { 'jdn': dt.julianDay, 'year': 0, 'cycle': date.cycle, 'yerm': date.yerm, 'month': date.month, 'day': date.day };
      expected = { 'jdn': dt.julianDay, 'year': 0, ...date };
      actual   = cal.fromJdn (dt.julianDay);

      expect (expected).toEqual (actual);
      expect (expected.cycle).toBe (actual.getCycle());
      expect (expected.yerm).toBe (actual.getYerm());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('throws validation exceptions', () => {
    expect (() => cal.toJdn (1,  0,  1,  1)).toThrow (INVALID_YERM);
    expect (() => cal.toJdn (1, 53,  1,  1)).toThrow (INVALID_YERM);
    expect (() => cal.toJdn (1,  1,  0,  1)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,  1, 18,  1)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,  3, 16,  1)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1,  1,  1,  0)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1,  1,  1, 31)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1,  1,  2, 30)).toThrow (INVALID_DAY);
   });
});
