import { ChineseDayNameCalendar as cal } from '../../calendar/ChineseDayNameCalendar';

const dates = [
  { jdn: 1507231.5, rataDie: -214192, date: { stem: 2, branch: 10 } },
  { jdn: 1660037.5, rataDie: -61387, date: { stem: 8, branch: 8 } },
  { jdn: 1746893.5, rataDie: 25469, date: { stem: 4, branch: 8 } },
  { jdn: 1770641.5, rataDie: 49217, date: { stem: 2, branch: 8 } },
  { jdn: 1892731.5, rataDie: 171307, date: { stem: 2, branch: 10 } },
  { jdn: 1931579.5, rataDie: 210155, date: { stem: 10, branch: 2 } },
  { jdn: 1974851.5, rataDie: 253427, date: { stem: 2, branch: 2 } },
  { jdn: 2091164.5, rataDie: 369740, date: { stem: 5, branch: 11 } },
  { jdn: 2121509.5, rataDie: 400085, date: { stem: 10, branch: 8 } },
  { jdn: 2155779.5, rataDie: 434355, date: { stem: 10, branch: 6 } },
  { jdn: 2174029.5, rataDie: 452605, date: { stem: 10, branch: 4 } },
  { jdn: 2191584.5, rataDie: 470160, date: { stem: 5, branch: 3 } },
  { jdn: 2195261.5, rataDie: 473837, date: { stem: 2, branch: 8 } },
  { jdn: 2229274.5, rataDie: 507850, date: { stem: 5, branch: 1 } },
  { jdn: 2245580.5, rataDie: 524156, date: { stem: 1, branch: 11 } },
  { jdn: 2266100.5, rataDie: 544676, date: { stem: 1, branch: 11 } },
  { jdn: 2288542.5, rataDie: 567118, date: { stem: 3, branch: 1 } },
  { jdn: 2290901.5, rataDie: 569477, date: { stem: 2, branch: 8 } },
  { jdn: 2323140.5, rataDie: 601716, date: { stem: 1, branch: 3 } },
  { jdn: 2334848.5, rataDie: 613424, date: { stem: 9, branch: 11 } },
  { jdn: 2348020.5, rataDie: 626596, date: { stem: 1, branch: 7 } },
  { jdn: 2366978.5, rataDie: 645554, date: { stem: 9, branch: 5 } },
  { jdn: 2385648.5, rataDie: 664224, date: { stem: 9, branch: 3 } },
  { jdn: 2392825.5, rataDie: 671401, date: { stem: 6, branch: 4 } },
  { jdn: 2416223.5, rataDie: 694799, date: { stem: 4, branch: 2 } },
  { jdn: 2425848.5, rataDie: 704424, date: { stem: 9, branch: 3 } },
  { jdn: 2430266.5, rataDie: 708842, date: { stem: 7, branch: 5 } },
  { jdn: 2430833.5, rataDie: 709409, date: { stem: 4, branch: 8 } },
  { jdn: 2431004.5, rataDie: 709580, date: { stem: 5, branch: 11 } },
  { jdn: 2448698.5, rataDie: 727274, date: { stem: 9, branch: 5 } },
  { jdn: 2450138.5, rataDie: 728714, date: { stem: 9, branch: 5 } },
  { jdn: 2465737.5, rataDie: 744313, date: { stem: 8, branch: 4 } },
  { jdn: 2486076.5, rataDie: 764652, date: { stem: 7, branch: 3 } },
];

describe('Chinese Day Name calendar spec', () => {
  it('should convert a Julian day number (JDN) to a Chinese Day Name date', () => {
    dates.forEach(({ jdn, date }) => {
      const actual = cal.fromJdn(jdn);
      const expected = { jdn, ...date };

      expect(expected).toEqual(actual);
      expect(expected.stem).toBe(actual.getStem());
      expect(expected.branch).toBe(actual.getBranch());
    });
  });
});
