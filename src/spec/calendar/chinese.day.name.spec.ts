import { ChineseDayNameCalendar as cal } from '../../calendar/ChineseDayNameCalendar';

const dates = [
  { jdn: 1507231.5, date: { stem:  2, branch: 10 } },
  { jdn: 1660037.5, date: { stem:  8, branch:  8 } },
  { jdn: 1746893.5, date: { stem:  4, branch:  8 } },
  { jdn: 1770641.5, date: { stem:  2, branch:  8 } },
  { jdn: 1892731.5, date: { stem:  2, branch: 10 } },
  { jdn: 1931579.5, date: { stem: 10, branch:  2 } },
  { jdn: 1974851.5, date: { stem:  2, branch:  2 } },
  { jdn: 2091164.5, date: { stem:  5, branch: 11 } },
  { jdn: 2121509.5, date: { stem: 10, branch:  8 } },
  { jdn: 2155779.5, date: { stem: 10, branch:  6 } },
  { jdn: 2174029.5, date: { stem: 10, branch:  4 } },
  { jdn: 2191584.5, date: { stem:  5, branch:  3 } },
  { jdn: 2195261.5, date: { stem:  2, branch:  8 } },
  { jdn: 2229274.5, date: { stem:  5, branch:  1 } },
  { jdn: 2245580.5, date: { stem:  1, branch: 11 } },
  { jdn: 2266100.5, date: { stem:  1, branch: 11 } },
  { jdn: 2288542.5, date: { stem:  3, branch:  1 } },
  { jdn: 2290901.5, date: { stem:  2, branch:  8 } },
  { jdn: 2323140.5, date: { stem:  1, branch:  3 } },
  { jdn: 2334848.5, date: { stem:  9, branch: 11 } },
  { jdn: 2348020.5, date: { stem:  1, branch:  7 } },
  { jdn: 2366978.5, date: { stem:  9, branch:  5 } },
  { jdn: 2385648.5, date: { stem:  9, branch:  3 } },
  { jdn: 2392825.5, date: { stem:  6, branch:  4 } },
  { jdn: 2416223.5, date: { stem:  4, branch:  2 } },
  { jdn: 2425848.5, date: { stem:  9, branch:  3 } },
  { jdn: 2430266.5, date: { stem:  7, branch:  5 } },
  { jdn: 2430833.5, date: { stem:  4, branch:  8 } },
  { jdn: 2431004.5, date: { stem:  5, branch: 11 } },
  { jdn: 2448698.5, date: { stem:  9, branch:  5 } },
  { jdn: 2450138.5, date: { stem:  9, branch:  5 } },
  { jdn: 2465737.5, date: { stem:  8, branch:  4 } },
  { jdn: 2486076.5, date: { stem:  7, branch:  3 } }
];

describe ('Chinese Day Name calendar spec', () => {
  it ('should convert a Julian day number to a Chinese Day Name date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.stem).toBe (actual.getStem());
      expect (expected.branch).toBe (actual.getBranch());
    });
  });

});
