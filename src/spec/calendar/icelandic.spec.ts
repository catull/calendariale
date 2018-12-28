import { INVALID_DAY, INVALID_SEASON, INVALID_WEEK, Season, WeekDay } from '../../Const';
import { IcelandicCalendar as cal } from '../../calendar/IcelandicCalendar';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: -586, season: Season.SUMMER, week: 14, day: WeekDay.SUNDAY } },
  { jdn: 1660037.5, rataDie:  -61387, date: { year: -168, season: Season.WINTER, week:  6, day: WeekDay.WEDNESDAY } },
  { jdn: 1746893.5, rataDie:   25469, date: { year:   70, season: Season.SUMMER, week: 22, day: WeekDay.WEDNESDAY } },
  { jdn: 1770641.5, rataDie:   49217, date: { year:  135, season: Season.SUMMER, week: 24, day: WeekDay.SUNDAY } },
  { jdn: 1892731.5, rataDie:  171307, date: { year:  469, season: Season.WINTER, week: 11, day: WeekDay.WEDNESDAY } },
  { jdn: 1931579.5, rataDie:  210155, date: { year:  576, season: Season.SUMMER, week:  4, day: WeekDay.MONDAY } },
  { jdn: 1974851.5, rataDie:  253427, date: { year:  694, season: Season.WINTER, week:  3, day: WeekDay.SATURDAY } },
  { jdn: 2091164.5, rataDie:  369740, date: { year: 1013, season: Season.SUMMER, week:  1, day: WeekDay.SUNDAY } },
  { jdn: 2121509.5, rataDie:  400085, date: { year: 1096, season: Season.SUMMER, week:  5, day: WeekDay.SUNDAY } },
  { jdn: 2155779.5, rataDie:  434355, date: { year: 1189, season: Season.WINTER, week: 22, day: WeekDay.FRIDAY } },
  { jdn: 2174029.5, rataDie:  452605, date: { year: 1239, season: Season.WINTER, week: 21, day: WeekDay.SATURDAY } },
  { jdn: 2191584.5, rataDie:  470160, date: { year: 1287, season: Season.WINTER, week: 23, day: WeekDay.FRIDAY } },
  { jdn: 2195261.5, rataDie:  473837, date: { year: 1298, season: Season.SUMMER, week:  1, day: WeekDay.SUNDAY } },
  { jdn: 2229274.5, rataDie:  507850, date: { year: 1391, season: Season.SUMMER, week:  8, day: WeekDay.SUNDAY } },
  { jdn: 2245580.5, rataDie:  524156, date: { year: 1435, season: Season.WINTER, week: 15, day: WeekDay.WEDNESDAY } },
  { jdn: 2266100.5, rataDie:  544676, date: { year: 1491, season: Season.WINTER, week: 25, day: WeekDay.SATURDAY } },
  { jdn: 2288542.5, rataDie:  567118, date: { year: 1553, season: Season.SUMMER, week: 22, day: WeekDay.SATURDAY } },
  { jdn: 2290901.5, rataDie:  569477, date: { year: 1559, season: Season.WINTER, week: 20, day: WeekDay.SATURDAY } },
  { jdn: 2323140.5, rataDie:  601716, date: { year: 1648, season: Season.SUMMER, week:  7, day: WeekDay.WEDNESDAY } },
  { jdn: 2334848.5, rataDie:  613424, date: { year: 1680, season: Season.SUMMER, week: 10, day: WeekDay.SUNDAY } },
  { jdn: 2348020.5, rataDie:  626596, date: { year: 1716, season: Season.SUMMER, week: 14, day: WeekDay.FRIDAY } },
  { jdn: 2366978.5, rataDie:  645554, date: { year: 1768, season: Season.SUMMER, week:  9, day: WeekDay.SUNDAY } },
  { jdn: 2385648.5, rataDie:  664224, date: { year: 1819, season: Season.SUMMER, week: 15, day: WeekDay.MONDAY } },
  { jdn: 2392825.5, rataDie:  671401, date: { year: 1838, season: Season.WINTER, week: 22, day: WeekDay.WEDNESDAY } },
  { jdn: 2416223.5, rataDie:  694799, date: { year: 1902, season: Season.WINTER, week: 26, day: WeekDay.SUNDAY } },
  { jdn: 2425848.5, rataDie:  704424, date: { year: 1929, season: Season.SUMMER, week: 18, day: WeekDay.SUNDAY } },
  { jdn: 2430266.5, rataDie:  708842, date: { year: 1941, season: Season.SUMMER, week: 23, day: WeekDay.MONDAY } },
  { jdn: 2430833.5, rataDie:  709409, date: { year: 1942, season: Season.WINTER, week: 26, day: WeekDay.MONDAY } },
  { jdn: 2431004.5, rataDie:  709580, date: { year: 1943, season: Season.SUMMER, week: 25, day: WeekDay.THURSDAY } },
  { jdn: 2448698.5, rataDie:  727274, date: { year: 1991, season: Season.WINTER, week: 21, day: WeekDay.TUESDAY } },
  { jdn: 2450138.5, rataDie:  728714, date: { year: 1995, season: Season.WINTER, week: 18, day: WeekDay.SUNDAY } },
  { jdn: 2465737.5, rataDie:  744313, date: { year: 2038, season: Season.WINTER, week:  3, day: WeekDay.WEDNESDAY } },
  { jdn: 2486076.5, rataDie:  764652, date: { year: 2094, season: Season.SUMMER, week: 13, day: WeekDay.SUNDAY } },
];

describe('Icelandic calendar spec', () => {
  it('should convert a Icelandic date to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.toJdn(date.year, date.season, date.week, date.day);

      expect(actual).toBe(jdn);
    });
  });

  it('should convert a Julian day number (JDN) to a Icelandic date', () => {
    dates.forEach(({ jdn, date }) => {
      const expected = { jdn, ...date };
      const actual = cal.fromJdn(jdn);

      expect(expected).toEqual(actual);
      expect(expected.jdn).toBe(actual.getJdn());
      expect(expected.year).toBe(actual.getYear());
      expect(expected.season).toBe(actual.getSeason());
      expect(expected.week).toBe(actual.getWeek());
      expect(expected.day).toBe(actual.getDay());
    });
  });

  it ('should determine whether a Icelandic year is a leap year', () => {
    [ 1, 7, 12, 18, 164, 514, 734, 975, 1066, 1477, 1551, 1877, 1900, 1951, 2001 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).toBe (true);
    });
  });

  it ('should determine whether a Icelandic year is not a leap year', () => {
    [ 0, 4, 17, 27, 37, 137, 477, 877, 1057, 1377, 1600, 1760, 1840, 1904, 1980, 2000 ].forEach ((year) => {
      expect (cal.isLeapYear (year)).toBe (false);
    });
  });

  it('should throw validation exceptions', () => {
    expect (() => cal.toJdn (2002, Season.SPRING, 1, 1)).toThrow (INVALID_SEASON);
    expect (() => cal.toJdn (2002, Season.AUTUMN, 1, 1)).toThrow (INVALID_SEASON);

    expect (() => cal.toJdn (2002, Season.SUMMER, 1, -1)).toThrow (INVALID_DAY);
    expect (() => cal.toJdn (2002, Season.SUMMER, 1, 7)).toThrow (INVALID_DAY);

    expect (() => cal.toJdn (2002, Season.SUMMER, 27, 0)).toThrow (INVALID_WEEK);
    expect (() => cal.toJdn (2002, Season.WINTER, 27, 0)).toThrow (INVALID_WEEK);
    expect (() => cal.toJdn (2001, Season.SUMMER, 28, 0)).toThrow (INVALID_WEEK);
    expect (() => cal.toJdn (2001, Season.WINTER, 27, 0)).toThrow (INVALID_WEEK);
  });

});
