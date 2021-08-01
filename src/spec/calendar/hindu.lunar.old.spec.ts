import { INVALID_DAY, INVALID_LEAP_MONTH, INVALID_MONTH } from '../../Const';
import { HinduLunarOldCalendar as cal } from '../../calendar/HinduLunarOldCalendar';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { year: 2515, month: 6, monthLeap: false, day: 11 } },
  { jdn: 1660037.5, rataDie: -61387, date: { year: 2933, month: 9, monthLeap: false, day: 26 } },
  { jdn: 1746893.5, rataDie: 25469, date: { year: 3171, month: 8, monthLeap: false, day: 3 } },
  { jdn: 1770641.5, rataDie: 49217, date: { year: 3236, month: 8, monthLeap: false, day: 9 } },
  { jdn: 1892731.5, rataDie: 171307, date: { year: 3570, month: 11, monthLeap: true, day: 19 } },
  { jdn: 1931579.5, rataDie: 210155, date: { year: 3677, month: 3, monthLeap: false, day: 5 } },
  { jdn: 1974851.5, rataDie: 253427, date: { year: 3795, month: 9, monthLeap: false, day: 15 } },
  { jdn: 2091164.5, rataDie: 369740, date: { year: 4114, month: 2, monthLeap: false, day: 7 } },
  { jdn: 2121509.5, rataDie: 400085, date: { year: 4197, month: 2, monthLeap: false, day: 24 } },
  { jdn: 2155779.5, rataDie: 434355, date: { year: 4291, month: 1, monthLeap: false, day: 9 } },
  { jdn: 2174029.5, rataDie: 452605, date: { year: 4340, month: 12, monthLeap: false, day: 9 } },
  { jdn: 2191584.5, rataDie: 470160, date: { year: 4389, month: 1, monthLeap: false, day: 23 } },
  { jdn: 2195261.5, rataDie: 473837, date: { year: 4399, month: 2, monthLeap: false, day: 8 } },
  { jdn: 2229274.5, rataDie: 507850, date: { year: 4492, month: 4, monthLeap: false, day: 2 } },
  { jdn: 2245580.5, rataDie: 524156, date: { year: 4536, month: 11, monthLeap: false, day: 7 } },
  { jdn: 2266100.5, rataDie: 544676, date: { year: 4593, month: 1, monthLeap: false, day: 3 } },
  { jdn: 2288542.5, rataDie: 567118, date: { year: 4654, month: 7, monthLeap: false, day: 2 } },
  { jdn: 2290901.5, rataDie: 569477, date: { year: 4660, month: 11, monthLeap: false, day: 29 } },
  { jdn: 2323140.5, rataDie: 601716, date: { year: 4749, month: 3, monthLeap: false, day: 20 } },
  { jdn: 2334848.5, rataDie: 613424, date: { year: 4781, month: 4, monthLeap: false, day: 4 } },
  { jdn: 2348020.5, rataDie: 626596, date: { year: 4817, month: 5, monthLeap: false, day: 6 } },
  { jdn: 2366978.5, rataDie: 645554, date: { year: 4869, month: 4, monthLeap: false, day: 5 } },
  { jdn: 2385648.5, rataDie: 664224, date: { year: 4920, month: 5, monthLeap: false, day: 12 } },
  { jdn: 2392825.5, rataDie: 671401, date: { year: 4940, month: 1, monthLeap: true, day: 13 } },
  { jdn: 2416223.5, rataDie: 694799, date: { year: 5004, month: 1, monthLeap: false, day: 23 } },
  { jdn: 2425848.5, rataDie: 704424, date: { year: 5030, month: 5, monthLeap: false, day: 21 } },
  { jdn: 2430266.5, rataDie: 708842, date: { year: 5042, month: 7, monthLeap: false, day: 9 } },
  { jdn: 2430833.5, rataDie: 709409, date: { year: 5044, month: 1, monthLeap: false, day: 15 } },
  { jdn: 2431004.5, rataDie: 709580, date: { year: 5044, month: 7, monthLeap: false, day: 9 } },
  { jdn: 2448698.5, rataDie: 727274, date: { year: 5092, month: 12, monthLeap: false, day: 14 } },
  { jdn: 2450138.5, rataDie: 728714, date: { year: 5096, month: 12, monthLeap: false, day: 7 } },
  { jdn: 2465737.5, rataDie: 744313, date: { year: 5139, month: 8, monthLeap: false, day: 14 } },
  { jdn: 2486076.5, rataDie: 764652, date: { year: 5195, month: 4, monthLeap: false, day: 6 } },
];

describe('Hindu Lunar Old calendar spec', () => {
  it('should convert a Hindu Lunar Old date to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.toJdn(date.year, date.month, date.monthLeap, date.day);

      expect(actual).toBe(jdn);
    });
  });

  it('should convert a Julian day number (JDN) to a Hindu Lunar Old date', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, ...date };

      expect(expected).toEqual(actual);
      expect(expected.day).toBe(actual.getDay());
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.monthLeap).toBe(actual.isMonthLeap());
      expect(expected.year).toBe(actual.getYear());
    });
  });

  it('should establish whether a Hindu Lunar Old year is leap', () => {
    [2933, 3570, 3795, 4197, 4340, 4389, 4492, 4536, 4593, 4660, 4869, 4940].forEach((year) => {
      const actual = cal.isLeapYear(year);
      expect(true).toBe(actual);
    });

    [
      2515, 3171, 3236, 3677, 4114, 4291, 4399, 4654, 4749, 4781, 4817, 4920, 5004, 5030, 5042, 5044, 5092, 5096, 5139,
      5195,
    ].forEach((year) => {
      const actual = cal.isLeapYear(year);
      expect(false).toBe(actual);
    });
  });

  it('throws a validation exception', () => {
    expect(() => cal.toJdn(3570, 0, false, 1)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(3570, 13, false, 1)).toThrow(INVALID_MONTH);
    expect(() => cal.toJdn(3570, 11, true, 3)).not.toThrow();
    expect(() => cal.toJdn(3570, 9, true, 1)).toThrow(INVALID_LEAP_MONTH);
    expect(() => cal.toJdn(3570, 4, false, 0)).toThrow(INVALID_DAY);
    expect(() => cal.toJdn(3570, 4, false, 31)).toThrow(INVALID_DAY);
  });

  it('should foo', () => {
    // let day = 19;
    // for (let index = 2458300.5; index < 2458448.5; index++) {
    //   const d = cal.fromJdn(index);
    //   if ((d.getDay() - day) > 1) {
    //     expect ({}).toEqual(d);
    //   }
    //   day = d.getDay();
    // }
    const date1 = cal.fromJdn(2458354.5);
    const date2 = cal.fromJdn(2458353.5);

    expect(date1).toEqual({ jdn: 2458354.5, year: 5119, month: 5, monthLeap: false, day: 14 });
    expect(date2).toEqual({ jdn: 2458353.5, year: 5119, month: 5, monthLeap: false, day: 12 });
    expect(() => cal.toJdn(5119, 5, false, 13)).toThrow(INVALID_DAY);
  });
});
