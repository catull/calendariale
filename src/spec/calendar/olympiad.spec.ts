import { INVALID_YEAR } from '../../Const';
import { OlympiadCalendar as cal } from '../../calendar/OlympiadCalendar';

const dates = [
  { jdn: 1507231.5, date: { cycle:  48, year: 2 } },
  { jdn: 1660037.5, date: { cycle: 152, year: 4 } },
  { jdn: 1746893.5, date: { cycle: 212, year: 2 } },
  { jdn: 1770641.5, date: { cycle: 228, year: 3 } },
  { jdn: 1892731.5, date: { cycle: 312, year: 2 } },
  { jdn: 1931579.5, date: { cycle: 338, year: 4 } },
  { jdn: 1974851.5, date: { cycle: 368, year: 2 } },
  { jdn: 2091164.5, date: { cycle: 448, year: 1 } },
  { jdn: 2121509.5, date: { cycle: 468, year: 4 } },
  { jdn: 2155779.5, date: { cycle: 492, year: 2 } },
  { jdn: 2174029.5, date: { cycle: 504, year: 4 } },
  { jdn: 2191584.5, date: { cycle: 516, year: 4 } },
  { jdn: 2195261.5, date: { cycle: 519, year: 2 } },
  { jdn: 2229274.5, date: { cycle: 542, year: 3 } },
  { jdn: 2245580.5, date: { cycle: 553, year: 4 } },
  { jdn: 2266100.5, date: { cycle: 567, year: 4 } },
  { jdn: 2288542.5, date: { cycle: 583, year: 1 } },
  { jdn: 2290901.5, date: { cycle: 584, year: 4 } },
  { jdn: 2323140.5, date: { cycle: 606, year: 4 } },
  { jdn: 2334848.5, date: { cycle: 614, year: 4 } },
  { jdn: 2348020.5, date: { cycle: 623, year: 4 } },
  { jdn: 2366978.5, date: { cycle: 636, year: 4 } },
  { jdn: 2385648.5, date: { cycle: 649, year: 3 } },
  { jdn: 2392825.5, date: { cycle: 654, year: 3 } },
  { jdn: 2416223.5, date: { cycle: 670, year: 3 } },
  { jdn: 2425848.5, date: { cycle: 677, year: 1 } },
  { jdn: 2430266.5, date: { cycle: 680, year: 1 } },
  { jdn: 2430833.5, date: { cycle: 680, year: 3 } },
  { jdn: 2431004.5, date: { cycle: 680, year: 3 } },
  { jdn: 2448698.5, date: { cycle: 692, year: 4 } },
  { jdn: 2450138.5, date: { cycle: 693, year: 4 } },
  { jdn: 2465737.5, date: { cycle: 704, year: 2 } },
  { jdn: 2486076.5, date: { cycle: 718, year: 2 } },
];

describe('Olympiad calendar spec', () => {
  it('should convert a Olympiad to Julian day number (JDN)', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.toJdn(date.cycle, date.year) - jdn;

      expect(Math.abs(actual)).toBeLessThan(365);
    });
  });

  it('should convert a Julian day number (JDN) to a Olympiad', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, ...date };

      expect(expected).toEqual(actual);
      expect(expected.cycle).toBe(actual.getCycle());
      expect(expected.year).toBe(actual.getYear());
    });
  });

  it('should throw validation exceptions', () => {
    expect(() => cal.toJdn(1, -1)).toThrow(INVALID_YEAR);
    expect(() => cal.toJdn(1,  0)).toThrow(INVALID_YEAR);
    expect(() => cal.toJdn(1,  5)).toThrow(INVALID_YEAR);
    expect(() => cal.toJdn(1, 99)).toThrow(INVALID_YEAR);
  });
});
