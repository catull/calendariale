import { mod } from '../../Astro';
import { J0000, akan } from '../../Const';
import { AkanNameCalendar as cal } from '../../calendar/AkanNameCalendar';
import { AkanNameDate } from '../../calendar/AkanNameDate';

const dates = [
  { jdn: 1507231.5, date: { prefix: 6, stem: 5 } },
  { jdn: 1660037.5, date: { prefix: 4, stem: 1 } },
  { jdn: 1746893.5, date: { prefix: 4, stem: 1 } },
  { jdn: 1770641.5, date: { prefix: 4, stem: 5 } },
  { jdn: 1892731.5, date: { prefix: 6, stem: 1 } },
  { jdn: 1931579.5, date: { prefix: 4, stem: 6 } },
  { jdn: 1974851.5, date: { prefix: 4, stem: 4 } },
  { jdn: 2091164.5, date: { prefix: 1, stem: 5 } },
  { jdn: 2121509.5, date: { prefix: 4, stem: 5 } },
  { jdn: 2155779.5, date: { prefix: 2, stem: 3 } },
  { jdn: 2174029.5, date: { prefix: 6, stem: 4 } },
  { jdn: 2191584.5, date: { prefix: 5, stem: 3 } },
  { jdn: 2195261.5, date: { prefix: 4, stem: 5 } },
  { jdn: 2229274.5, date: { prefix: 3, stem: 5 } },
  { jdn: 2245580.5, date: { prefix: 1, stem: 1 } },
  { jdn: 2266100.5, date: { prefix: 1, stem: 4 } },
  { jdn: 2288542.5, date: { prefix: 3, stem: 4 } },
  { jdn: 2290901.5, date: { prefix: 4, stem: 4 } },
  { jdn: 2323140.5, date: { prefix: 5, stem: 1 } },
  { jdn: 2334848.5, date: { prefix: 1, stem: 5 } },
  { jdn: 2348020.5, date: { prefix: 3, stem: 3 } },
  { jdn: 2366978.5, date: { prefix: 1, stem: 5 } },
  { jdn: 2385648.5, date: { prefix: 5, stem: 6 } },
  { jdn: 2392825.5, date: { prefix: 6, stem: 1 } },
  { jdn: 2416223.5, date: { prefix: 4, stem: 5 } },
  { jdn: 2425848.5, date: { prefix: 5, stem: 5 } },
  { jdn: 2430266.5, date: { prefix: 1, stem: 6 } },
  { jdn: 2430833.5, date: { prefix: 4, stem: 6 } },
  { jdn: 2431004.5, date: { prefix: 1, stem: 2 } },
  { jdn: 2448698.5, date: { prefix: 1, stem: 7 } },
  { jdn: 2450138.5, date: { prefix: 1, stem: 5 } },
  { jdn: 2465737.5, date: { prefix: 6, stem: 1 } },
  { jdn: 2486076.5, date: { prefix: 5, stem: 5 } },
];
describe ('Akan Name calendar spec', () => {
  it ('should convert a Julian day number (JDN) to a Akan Name date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.prefix).toBe (actual.getPrefix());
      expect (expected.stem).toBe (actual.getStem());
    });
  });

  it ('should handle modulo arithmetic', () => {
    const modulo: number           = mod(akan.EPOCH, 42);
    const epochStart: AkanNameDate = cal.fromJdn(J0000 + 37);
    const epochNext: AkanNameDate  = cal.fromJdn(J0000 + 38);

    expect (modulo).toBe(7.5);
    expect (epochStart).toEqual({ jdn: J0000 + 37, prefix: 6, stem: 7 });
    expect (epochNext).toEqual({ jdn: J0000 + 38, prefix: 1, stem: 1 });
  });
});
