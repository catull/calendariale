import { INVALID_DAY, INVALID_MONTH } from '../../Const';
import { PersianAstronomicalCalendar as cal } from '../../calendar/PersianAstronomicalCalendar';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -1208, month: 5, day: 1 } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: -790, month: 9, day: 14 } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: -552, month: 7, day: 2 } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: -487, month: 7, day: 9 } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: -153, month: 10, day: 19 } },
  { jdn: 1931579.5, rataDie: 210155, date: { year: -46, month: 2, day: 31 } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: 73, month: 8, day: 19 } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: 392, month: 2, day: 5 } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: 475, month: 3, day: 4 } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: 569, month: 1, day: 3 } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: 618, month: 12, day: 20 } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: 667, month: 1, day: 14 } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: 677, month: 2, day: 8 } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: 770, month: 3, day: 22 } },
  { jdn: 2245580.5, rataDie: 524156, date: { year: 814, month: 11, day: 13 } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: 871, month: 1, day: 21 } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: 932, month: 6, day: 28 } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: 938, month: 12, day: 14 } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: 1027, month: 3, day: 21 } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: 1059, month: 4, day: 10 } },
  { jdn: 2348020.5, rataDie: 626596, date: { year: 1095, month: 5, day: 2 } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: 1147, month: 3, day: 30 } },
  { jdn: 2385648.5, rataDie: 664224, date: { year: 1198, month: 5, day: 10 } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 1218, month: 1, day: 7 } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 1282, month: 1, day: 29 } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 1308, month: 6, day: 3 } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 1320, month: 7, day: 7 } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 1322, month: 1, day: 29 } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 1322, month: 7, day: 14 } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 1370, month: 12, day: 27 } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 1374, month: 12, day: 6 } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 1417, month: 8, day: 19 } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 1473, month: 4, day: 28 } },
  { jdn: 3151426.5, date: { year: 3294, month: 12, day: 28 } },
];

describe('Persian Astronomical calendar spec', () => {
  it('should convert a Persian Astronomical date to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.toJdn(date.year, date.month, date.day);

      expect(actual).toBe(jdn);
    });
  });

  it('should convert a Julian day number (JDN) to a Persian Astronomical date', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.fromJdn(jdn);
      const yearLeap = cal.isLeapYear(date.year);
      const expected = { jdn, ...date, yearLeap };

      expect(expected).toEqual(actual);
      expect(expected.year).toBe(actual.getYear());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.day).toBe(actual.getDay());
    });
  });

  it('should determine that a Persian Astronomical year is a leap year', () => {
    [
      38, 75, 112, 149, 186, 223, 260, 1111, 1148, 1185,
      1210, 1214, 1218, 1222, 1226, 1230, 1234, 1238, 1243, 1247, 1251, 1255, 1259, 1263,
      1267, 1271, 1276, 1280, 1284, 1288, 1292, 1296, 1300, 1304, 1309, 1313, 1317, 1321,
      1325, 1329, 1333, 1337, 1342, 1346, 1350, 1354, 1358, 1362, 1366, 1370, 1375, 1379,
      1383, 1387, 1391, 1395, 1399, 1403, 1408, 1412, 1416, 1420, 1424, 1428, 1432, 1436,
      1441, 1445, 1449, 1453, 1457, 1461, 1465, 1470, 1474, 1478, 1482, 1486, 1490, 1494,
      1498
    ]
    .forEach((year) => {
      expect(cal.isLeapYear(year)).toBe(true);
    });
  });

  it('should determine that a Persian Astronomical year is not a leap year', () => {
    [
      165, 206, 247, 288, 329, 370, 411, 452, 493, 534, 575, 616, 821, 862, 903, 944, 985, 1026, 1067, 1108, 1149, 1190,
      1231, 1272,
    ].forEach((year) => {
      expect(cal.isLeapYear(year)).toBe(false);
    });
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1333, 0, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1333, -2, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1333, 13, 10)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(1333, 7, -5)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1333, 7, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1333, 12, 31)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(1334, 12, 30)).toThrow(INVALID_DAY);
  });
});
