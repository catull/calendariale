import { AztecTonalpohualliCalendar as cal } from '../../calendar/AztecTonalpohualliCalendar';

const dates = [
  { jdn: 1507231.5, date: { num:  5, name:  9 } },
  { jdn: 1660037.5, date: { num:  9, name: 15 } },
  { jdn: 1746893.5, date: { num: 12, name: 11 } },
  { jdn: 1770641.5, date: { num:  9, name: 19 } },
  { jdn: 1892731.5, date: { num:  3, name:  9 } },
  { jdn: 1931579.5, date: { num:  7, name: 17 } },
  { jdn: 1974851.5, date: { num:  2, name:  9 } },
  { jdn: 2091164.5, date: { num:  4, name:  2 } },
  { jdn: 2121509.5, date: { num:  7, name:  7 } },
  { jdn: 2155779.5, date: { num:  9, name: 17 } },
  { jdn: 2174029.5, date: { num:  7, name:  7 } },
  { jdn: 2191584.5, date: { num: 12, name:  2 } },
  { jdn: 2195261.5, date: { num: 10, name: 19 } },
  { jdn: 2229274.5, date: { num:  2, name: 12 } },
  { jdn: 2245580.5, date: { num:  6, name: 18 } },
  { jdn: 2266100.5, date: { num: 12, name: 18 } },
  { jdn: 2288542.5, date: { num:  3, name: 20 } },
  { jdn: 2290901.5, date: { num:  9, name: 19 } },
  { jdn: 2323140.5, date: { num:  8, name: 18 } },
  { jdn: 2334848.5, date: { num:  3, name:  6 } },
  { jdn: 2348020.5, date: { num:  6, name: 18 } },
  { jdn: 2366978.5, date: { num: 10, name: 16 } },
  { jdn: 2385648.5, date: { num: 12, name:  6 } },
  { jdn: 2392825.5, date: { num: 13, name:  3 } },
  { jdn: 2416223.5, date: { num: 11, name:  1 } },
  { jdn: 2425848.5, date: { num:  3, name:  6 } },
  { jdn: 2430266.5, date: { num:  1, name:  4 } },
  { jdn: 2430833.5, date: { num:  9, name: 11 } },
  { jdn: 2431004.5, date: { num: 11, name:  2 } },
  { jdn: 2448698.5, date: { num: 12, name: 16 } },
  { jdn: 2450138.5, date: { num:  9, name: 16 } },
  { jdn: 2465737.5, date: { num:  8, name: 15 } },
  { jdn: 2486076.5, date: { num:  2, name: 14 } },
];

describe('Aztec Tonalpohualli calendar spec', () => {
  it('should convert a Julian day to a Aztec Tonalpohualli', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, ...date };

      expect(expected).toEqual(actual);
      expect(date.num).toBe(actual.getNumber());
      expect(date.name).toBe(actual.getName());
    });
  });

  it('should calculate an Aztec Tonalpohualli ordinal', () => {
    const ordinal = cal.toOrdinal(10, 10);
    expect(ordinal).toBeLessThan(260);
    expect(ordinal).toBe(9);
  });

  it('should interpolate an Aztec Tonalpohualli date', () => {
    const jdn = cal.onOrBefore(10, 10, 2451544.5); // gregorian: 2000/01/01
    expect(jdn).toBe(2451452.5); // gregorian: 1999/10/01
  });
});
