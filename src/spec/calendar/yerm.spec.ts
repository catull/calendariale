import { INVALID_DAY, INVALID_MONTH, INVALID_YERM } from '../../Const';
import { YermCalendar as cal } from '../../calendar/YermCalendar';

const dates = [
  { jdn: 1507231.5, date: { cycle: -17, yerm: 23, month:  2, day: 10.5 } },
  { jdn: 1660037.5, date: { cycle: -11, yerm: 27, month: 10, day: 25.5 } },
  { jdn: 1746893.5, date: { cycle:  -8, yerm: 51, month: 10, day:  2.5 } },
  { jdn: 1770641.5, date: { cycle:  -7, yerm: 48, month: 13, day:  8.5 } },
  { jdn: 1892731.5, date: { cycle:  -2, yerm: 41, month: 12, day: 18.5 } },
  { jdn: 1931579.5, date: { cycle:   0, yerm: 18, month:  3, day:  4.5 } },
  { jdn: 1974851.5, date: { cycle:   2, yerm:  3, month: 13, day: 14.5 } },
  { jdn: 2091164.5, date: { cycle:   6, yerm: 36, month: 13, day:  6.5 } },
  { jdn: 2121509.5, date: { cycle:   7, yerm: 47, month: 11, day: 23.5 } },
  { jdn: 2155779.5, date: { cycle:   9, yerm: 14, month: 11, day:  8.5 } },
  { jdn: 2174029.5, date: { cycle:   9, yerm: 52, month:  9, day:  8.5 } },
  { jdn: 2191584.5, date: { cycle:  10, yerm: 36, month: 13, day: 22.5 } },
  { jdn: 2195261.5, date: { cycle:  10, yerm: 44, month:  8, day:  7.5 } },
  { jdn: 2229274.5, date: { cycle:  12, yerm: 10, month: 16, day:  1.5 } },
  { jdn: 2245580.5, date: { cycle:  12, yerm: 44, month: 12, day:  6.5 } },
  { jdn: 2266100.5, date: { cycle:  13, yerm: 35, month:  4, day:  2.5 } },
  { jdn: 2288542.5, date: { cycle:  14, yerm: 29, month: 12, day:  1.5 } },
  { jdn: 2290901.5, date: { cycle:  14, yerm: 34, month: 10, day: 27.5 } },
  { jdn: 2323140.5, date: { cycle:  15, yerm: 49, month:  7, day: 19.5 } },
  { jdn: 2334848.5, date: { cycle:  16, yerm: 21, month: 10, day:  3.5 } },
  { jdn: 2348020.5, date: { cycle:  16, yerm: 48, month: 15, day:  5.5 } },
  { jdn: 2366978.5, date: { cycle:  17, yerm: 36, month:  3, day:  4.5 } },
  { jdn: 2385648.5, date: { cycle:  18, yerm: 22, month: 15, day: 11.5 } },
  { jdn: 2392825.5, date: { cycle:  18, yerm: 37, month: 13, day: 12.5 } },
  { jdn: 2416223.5, date: { cycle:  19, yerm: 34, month:  4, day: 21.5 } },
  { jdn: 2425848.5, date: { cycle:  20, yerm:  2, month:  2, day: 19.5 } },
  { jdn: 2430266.5, date: { cycle:  20, yerm: 11, month:  5, day:  8.5 } },
  { jdn: 2430833.5, date: { cycle:  20, yerm: 12, month:  7, day: 14.5 } },
  { jdn: 2431004.5, date: { cycle:  20, yerm: 12, month: 13, day:  8.5 } },
  { jdn: 2448698.5, date: { cycle:  20, yerm: 49, month:  9, day: 13.5 } },
  { jdn: 2450138.5, date: { cycle:  20, yerm: 52, month:  9, day:  6.5 } },
  { jdn: 2465737.5, date: { cycle:  21, yerm: 32, month: 13, day: 13.5 } },
  { jdn: 2486076.5, date: { cycle:  22, yerm: 22, month: 16, day:  5.5 } },
];

describe ('Yerm calendar spec', () => {
  it ('should convert an Yerm date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.cycle, date.yerm, date.month, date.day);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to an Yerm date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, year: 0, ...date };

      expect (expected).toEqual (actual);
      expect (expected.cycle).toBe (actual.getCycle());
      expect (expected.yerm).toBe (actual.getYerm());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
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
