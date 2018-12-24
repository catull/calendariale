import { AztecXihuitlCalendar as cal } from '../../calendar/AztecXihuitlCalendar';

const dates = [
  { jdn: 1507231.5, date: { month:  2, day:  6 } },
  { jdn: 1660037.5, date: { month: 14, day:  2 } },
  { jdn: 1746893.5, date: { month: 13, day:  8 } },
  { jdn: 1770641.5, date: { month: 14, day: 11 } },
  { jdn: 1892731.5, date: { month:  5, day:  6 } },
  { jdn: 1931579.5, date: { month: 13, day:  4 } },
  { jdn: 1974851.5, date: { month:  5, day:  1 } },
  { jdn: 2091164.5, date: { month: 17, day:  4 } },
  { jdn: 2121509.5, date: { month:  1, day:  9 } },
  { jdn: 2155779.5, date: { month: 17, day: 14 } },
  { jdn: 2174029.5, date: { month: 17, day: 14 } },
  { jdn: 2191584.5, date: { month:  1, day:  4 } },
  { jdn: 2195261.5, date: { month:  2, day: 11 } },
  { jdn: 2229274.5, date: { month:  5, day: 19 } },
  { jdn: 2245580.5, date: { month: 18, day:  5 } },
  { jdn: 2266100.5, date: { month:  3, day: 20 } },
  { jdn: 2288542.5, date: { month: 12, day: 17 } },
  { jdn: 2290901.5, date: { month:  3, day:  1 } },
  { jdn: 2323140.5, date: { month:  8, day: 20 } },
  { jdn: 2334848.5, date: { month: 10, day:  8 } },
  { jdn: 2348020.5, date: { month: 11, day: 20 } },
  { jdn: 2366978.5, date: { month: 10, day: 18 } },
  { jdn: 2385648.5, date: { month: 13, day: 13 } },
  { jdn: 2392825.5, date: { month:  7, day: 10 } },
  { jdn: 2416223.5, date: { month:  9, day:  8 } },
  { jdn: 2425848.5, date: { month: 16, day:  3 } },
  { jdn: 2430266.5, date: { month: 18, day:  1 } },
  { jdn: 2430833.5, date: { month:  9, day: 18 } },
  { jdn: 2431004.5, date: { month: 18, day:  9 } },
  { jdn: 2448698.5, date: { month:  8, day: 18 } },
  { jdn: 2450138.5, date: { month:  7, day: 18 } },
  { jdn: 2465737.5, date: { month:  3, day:  2 } },
  { jdn: 2486076.5, date: { month: 16, day:  6 } },
];

describe('Aztec Xihuitl calendar spec', () => {
  it('should convert a Julian day number (JDN) to a Aztec Xihuitl', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, ...date };

      expect(expected).toEqual(actual);
      expect(expected.month).toBe(actual.getMonth());
      expect(expected.day).toBe(actual.getDay());
    });
  });

  it('should calculate an Aztec Xihuitl ordinal', () => {
    const ordinal = cal.toOrdinal(10, 10);
    expect(ordinal).toBeLessThan(260);
    expect(ordinal).toBe(189);
  });

  it('should interpolate an Aztec Xihuitl date', () => {
    const jdn = cal.onOrBefore(10, 10, 2451544.5); // gregorian: 2000/01/01
    expect(jdn).toBe(2451285.5); // gregorian: 1999/04/17
  });
});
