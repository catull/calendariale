import { MayanHaabCalendar as cal } from '../../calendar/MayanHaabCalendar';

const dates = [
  { jdn: 1507231.5, date: { month: 11, day: 12 } },
  { jdn: 1660037.5, date: { month:  5, day:  3 } },
  { jdn: 1746893.5, date: { month:  4, day:  9 } },
  { jdn: 1770641.5, date: { month:  5, day: 12 } },
  { jdn: 1892731.5, date: { month: 14, day: 12 } },
  { jdn: 1931579.5, date: { month:  4, day:  5 } },
  { jdn: 1974851.5, date: { month: 14, day:  7 } },
  { jdn: 2091164.5, date: { month:  8, day:  5 } },
  { jdn: 2121509.5, date: { month: 10, day: 15 } },
  { jdn: 2155779.5, date: { month:  8, day: 15 } },
  { jdn: 2174029.5, date: { month:  8, day: 15 } },
  { jdn: 2191584.5, date: { month: 10, day: 10 } },
  { jdn: 2195261.5, date: { month: 11, day: 17 } },
  { jdn: 2229274.5, date: { month: 15, day:  5 } },
  { jdn: 2245580.5, date: { month:  9, day:  6 } },
  { jdn: 2266100.5, date: { month: 13, day:  6 } },
  { jdn: 2288542.5, date: { month:  3, day: 18 } },
  { jdn: 2290901.5, date: { month: 12, day:  7 } },
  { jdn: 2323140.5, date: { month: 18, day:  6 } },
  { jdn: 2334848.5, date: { month:  1, day:  9 } },
  { jdn: 2348020.5, date: { month:  3, day:  1 } },
  { jdn: 2366978.5, date: { month:  1, day: 19 } },
  { jdn: 2385648.5, date: { month:  4, day: 14 } },
  { jdn: 2392825.5, date: { month: 16, day: 16 } },
  { jdn: 2416223.5, date: { month: 18, day: 14 } },
  { jdn: 2425848.5, date: { month:  7, day:  4 } },
  { jdn: 2430266.5, date: { month:  9, day:  2 } },
  { jdn: 2430833.5, date: { month: 19, day:  4 } },
  { jdn: 2431004.5, date: { month:  9, day: 10 } },
  { jdn: 2448698.5, date: { month: 18, day:  4 } },
  { jdn: 2450138.5, date: { month: 17, day:  4 } },
  { jdn: 2465737.5, date: { month: 12, day:  8 } },
  { jdn: 2486076.5, date: { month:  7, day:  7 } },
];

describe ('Mayan Haab calendar spec', () => {
  it ('should convert a Julian day number (JDN) to a Mayan Haab', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.month).toBe (actual.getMonth());
      expect (expected.day).toBe (actual.getDay());
    });
  });
});
