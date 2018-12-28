import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { IslamicUmmAlQuraCalendar as cal } from '../../calendar/IslamicUmmAlQuraCalendar';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -1245, month: 12, day: 11 } },
  { jdn: 1660037.5, rataDie:  -61387, date: { year:  -813, month:  2, day: 26 } },
  { jdn: 1746893.5, rataDie:   25469, date: { year:  -568, month:  4, day:  3 } },
  { jdn: 1770641.5, rataDie:   49217, date: { year:  -501, month:  4, day:  8 } },
  { jdn: 1892731.5, rataDie:  171307, date: { year:  -157, month: 10, day: 18 } },
  { jdn: 1931579.5, rataDie:  210155, date: { year:   -47, month:  6, day:  4 } },
  { jdn: 1974851.5, rataDie:  253427, date: { year:    75, month:  7, day: 14 } },
  { jdn: 2091164.5, rataDie:  369740, date: { year:   403, month: 10, day:  6 } },
  { jdn: 2121509.5, rataDie:  400085, date: { year:   489, month:  5, day: 23 } },
  { jdn: 2155779.5, rataDie:  434355, date: { year:   586, month:  2, day:  8 } },
  { jdn: 2174029.5, rataDie:  452605, date: { year:   637, month:  8, day:  8 } },
  { jdn: 2191584.5, rataDie:  470160, date: { year:   687, month:  2, day: 22 } },
  { jdn: 2195261.5, rataDie:  473837, date: { year:   697, month:  7, day:  8 } },
  { jdn: 2229274.5, rataDie:  507850, date: { year:   793, month:  7, day:  1 } },
  { jdn: 2245580.5, rataDie:  524156, date: { year:   839, month:  7, day:  7 } },
  { jdn: 2266100.5, rataDie:  544676, date: { year:   897, month:  6, day:  3 } },
  { jdn: 2288542.5, rataDie:  567118, date: { year:   960, month: 10, day:  1 } },
  { jdn: 2290901.5, rataDie:  569477, date: { year:   967, month:  5, day: 28 } },
  { jdn: 2323140.5, rataDie:  601716, date: { year:  1058, month:  5, day: 19 } },
  { jdn: 2334848.5, rataDie:  613424, date: { year:  1091, month:  6, day:  4 } },
  { jdn: 2348020.5, rataDie:  626596, date: { year:  1128, month:  8, day:  5 } },
  { jdn: 2366978.5, rataDie:  645554, date: { year:  1182, month:  2, day:  4 } },
  { jdn: 2385648.5, rataDie:  664224, date: { year:  1234, month: 10, day: 11 } },
  { jdn: 2392825.5, rataDie:  671401, date: { year:  1255, month:  1, day: 11 } },
  { jdn: 2416223.5, rataDie:  694799, date: { year:  1321, month:  1, day: 21 } },
  { jdn: 2425848.5, rataDie:  704424, date: { year:  1348, month:  3, day: 20 } },
  { jdn: 2430266.5, rataDie:  708842, date: { year:  1360, month:  9, day:  8 } },
  { jdn: 2430833.5, rataDie:  709409, date: { year:  1362, month:  4, day: 14 } },
  { jdn: 2431004.5, rataDie:  709580, date: { year:  1362, month: 10, day:  8 } },
  // { jdn: 2448698.5, rataDie:  727274, date: { year:  1412, month:  9, day: 12 } }, // day: 13??
  { jdn: 2450138.5, rataDie:  728714, date: { year:  1416, month: 10, day:  6 } },
  { jdn: 2465737.5, rataDie:  744313, date: { year:  1460, month: 10, day: 13 } },
  { jdn: 2486076.5, rataDie:  764652, date: { year:  1518, month:  3, day:  6 } },
];

// (saudi-islamic-from-fixed (moment-from-jd 2334848.5))
// (1091 6 4.0d0)
// (saudi-islamic-from-fixed 613424)
// (1091 6 4)

// (saudi-islamic-from-fixed (moment-from-jd 2448698.5))
// (1412 9 12.0d0)
// (saudi-islamic-from-fixed 727274)
// (1412 9 12)

describe ('Islamic Umm al-Qura calendar spec', () => {
  it ('should convert a Islamic Umm al-Qura date to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.year, date.month, date.day);
      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Islamic Umm al-Qura date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const yearLeap =  cal.isLeapYear (date.year);
      const expected = { jdn, ...date, yearLeap };

      expect (expected).toEqual (actual);
      expect (expected.year).toBe (actual.getYear());
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });

  it ('should throw validation exceptions', () => {
    expect (() => cal.toJdn (220,  0, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (220, -2, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (220, 13, 10)).toThrow (INVALID_MONTH);
    expect (() => cal.toJdn (220,  7, -5)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (220,  1, 31)).toThrow (INVALID_DAY);
  });
});
