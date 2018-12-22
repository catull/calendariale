import { INVALID_DAY, INVALID_LEAP_DAY, INVALID_LEAP_MONTH, INVALID_MONTH } from '../../Const';
import { HinduLunarModernCalendar as cal } from '../../calendar/HinduLunarModernCalendar';

const dates = [
  { jdn: 1507231.5, date: { year: -529, month:  6, monthLeap: false, day: 11, dayLeap: false } },
  { jdn: 1660037.5, date: { year: -111, month:  9, monthLeap: false, day: 27, dayLeap: false } },
  { jdn: 1746893.5, date: { year:  127, month:  8, monthLeap: false, day:  3, dayLeap: false } },
  { jdn: 1770641.5, date: { year:  192, month:  8, monthLeap: false, day:  9, dayLeap: false } },
  { jdn: 1892731.5, date: { year:  526, month: 11, monthLeap: false, day: 19, dayLeap: false } },
  { jdn: 1931579.5, date: { year:  633, month:  3, monthLeap: false, day:  5, dayLeap: false } },
  { jdn: 1974851.5, date: { year:  751, month:  9, monthLeap: false, day: 15, dayLeap: false } },
  { jdn: 2091164.5, date: { year: 1070, month:  2, monthLeap: false, day:  6, dayLeap: false } },
  { jdn: 2121509.5, date: { year: 1153, month:  3, monthLeap: true,  day: 23, dayLeap: false } },
  { jdn: 2155779.5, date: { year: 1247, month:  1, monthLeap: false, day:  8, dayLeap: false } },
  { jdn: 2174029.5, date: { year: 1297, month:  1, monthLeap: false, day:  8, dayLeap: false } },
  { jdn: 2191584.5, date: { year: 1345, month:  1, monthLeap: false, day: 22, dayLeap: false } },
  { jdn: 2195261.5, date: { year: 1355, month:  2, monthLeap: false, day:  8, dayLeap: false } },
  { jdn: 2229274.5, date: { year: 1448, month:  4, monthLeap: false, day:  1, dayLeap: false } },
  { jdn: 2245580.5, date: { year: 1492, month: 11, monthLeap: false, day:  7, dayLeap: false } },
  { jdn: 2266100.5, date: { year: 1549, month:  2, monthLeap: true,  day:  3, dayLeap: false } },
  { jdn: 2288542.5, date: { year: 1610, month:  7, monthLeap: false, day:  2, dayLeap: false } },
  { jdn: 2290901.5, date: { year: 1616, month: 11, monthLeap: false, day: 28, dayLeap: true  } },
  { jdn: 2323140.5, date: { year: 1705, month:  3, monthLeap: false, day: 20, dayLeap: false } },
  { jdn: 2334848.5, date: { year: 1737, month:  4, monthLeap: false, day:  4, dayLeap: false } },
  { jdn: 2348020.5, date: { year: 1773, month:  5, monthLeap: false, day:  6, dayLeap: false } },
  { jdn: 2366978.5, date: { year: 1825, month:  4, monthLeap: false, day:  5, dayLeap: false } },
  { jdn: 2385648.5, date: { year: 1876, month:  5, monthLeap: false, day: 11, dayLeap: false } },
  { jdn: 2392825.5, date: { year: 1896, month:  1, monthLeap: false, day: 13, dayLeap: false } },
  { jdn: 2416223.5, date: { year: 1960, month:  1, monthLeap: false, day: 22, dayLeap: false } },
  { jdn: 2425848.5, date: { year: 1986, month:  5, monthLeap: false, day: 20, dayLeap: false } },
  { jdn: 2430266.5, date: { year: 1998, month:  7, monthLeap: false, day:  9, dayLeap: false } },
  { jdn: 2430833.5, date: { year: 2000, month:  1, monthLeap: false, day: 14, dayLeap: false } },
  { jdn: 2431004.5, date: { year: 2000, month:  7, monthLeap: false, day:  8, dayLeap: false } },
  { jdn: 2448698.5, date: { year: 2048, month: 12, monthLeap: false, day: 14, dayLeap: false } },
  { jdn: 2450138.5, date: { year: 2052, month: 12, monthLeap: false, day:  7, dayLeap: false } },
  { jdn: 2465737.5, date: { year: 2095, month:  8, monthLeap: false, day: 14, dayLeap: false } },
  { jdn: 2486076.5, date: { year: 2151, month:  4, monthLeap: false, day:  6, dayLeap: false } },
];

describe ('Hindu Lunar Modern calendar spec', () => {
  it ('should convert a Hindu Lunar Modern date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.monthLeap, date.day, date.dayLeap);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Hindu Lunar Modern date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.monthLeap).toBe (actual.isMonthLeap());
      expect (expected.day).toBe (actual.getDay());
      expect (expected.dayLeap).toBe (actual.isDayLeap());
    });
  });

  it ('throws a validation exception', () => {
    expect (() => cal.toJdn (1549,  0, false,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1549, 13, false,  1, false)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (1549,  2, true ,  3, false)).not.toThrow ();
    expect (() => cal.toJdn (1549,  9, true ,  1, false)).toThrow (INVALID_LEAP_MONTH);
    expect (() => cal.toJdn (1549,  4, false,  0, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1549,  4, false, 31, false)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (1549,  6, false, 17, true )).toThrow (INVALID_LEAP_DAY);
  });

  it ('should foo', () => {
    // let day = 18;
    // for (let index = 2458300.5; index < 2458448.5; index++) {
    //   const d = cal.fromJdn(index);
    //   if ((d.getDay() - day) > 1) {
    //     expect ({}).toEqual(d);
    //   }
    //   day = d.getDay();
    // }
    const date1 = cal.fromJdn(2458314.5);
    const date2 = cal.fromJdn(2458313.5);

    expect (date1).toEqual({ jdn: 2458314.5, year: 2075, month: 4, monthLeap: false, day: 3, dayLeap: false });
    expect (date2).toEqual({ jdn: 2458313.5, year: 2075, month: 4, monthLeap: false, day: 1, dayLeap: false });
    expect (() => cal.toJdn (2075,  4, false, 2, false)).toThrow (INVALID_DAY);
  });
});
