import {
  binarySearch,
  dynamicalToUniversal,
  ephemerisCorrection,
  equationOfTime,
  jdnToWeekDay,
  julianCenturies,
  moonRise,
  moonSet,
  nutation,
  obliquity,
  poly,
  sigma
} from '../../Astro';
import { WeekDay, islamic } from '../../Const';

const dates = [
  { rataDie: -214193, rise: { tee: 0.645260, h: 15, m: 29, s: 10 }, set: { tee: 0.084225, h:  2, m:  1, s: 17 } },
  { rataDie:  -61387, rise: { tee: 0.146650, h:  3, m: 31, s: 11 }, set: { tee: 0.627607, h: 15, m:  3, s: 45 } },
  { rataDie:   25469, rise: { tee: 0.365595, h:  8, m: 46, s: 27 }, set: { tee: 0.842646, h: 20, m: 13, s: 25 } },
  { rataDie:   49217, rise: { tee: 0.582553, h: 13, m: 58, s: 53 }, set: { tee: 0.030307, h:  0, m: 43, s: 39 } },
  { rataDie:  171307, rise: { tee: 0.926722, h: 22, m: 14, s: 29 }, set: { tee: 0.419886, h: 10, m:  4, s: 38 } },
  { rataDie:  210155, rise: { tee: 0.391565, h:  9, m: 23, s: 51 }, set: { tee: 0.965784, h: 23, m: 10, s: 44 } },
  { rataDie:  253427, rise: { tee: 0.737227, h: 17, m: 41, s: 36 }, set: { tee: 0.252852, h:  6, m:  4, s:  6 } },
  { rataDie:  369740, rise: { tee: 0.434271, h: 10, m: 25, s: 21 }, set: { tee:       -1, h:  0, m:  0, s:  0 } },
  { rataDie:  400085, rise: { tee: 0.028119, h:  0, m: 40, s: 30 }, set: { tee: 0.528119, h: 12, m: 40, s: 30 } },
  { rataDie:  434355, rise: { tee: 0.501712, h: 12, m:  2, s: 28 }, set: { tee: 0.052493, h:  1, m: 15, s: 35 } },
  { rataDie:  452605, rise: { tee: 0.494050, h: 11, m: 51, s: 26 }, set: { tee: 0.037996, h:  0, m: 54, s: 43 } },
  { rataDie:  470160, rise: { tee: 0.013196, h:  0, m: 19, s:  0 }, set: { tee: 0.493177, h: 11, m: 50, s: 11 } },
  { rataDie:  473837, rise: { tee: 0.519306, h: 12, m: 27, s: 48 }, set: { tee: 0.060322, h:  1, m: 26, s: 52 } },
  { rataDie:  507850, rise: { tee: 0.259826, h:  6, m: 14, s:  9 }, set: { tee: 0.856017, h: 20, m: 32, s: 40 } },
  { rataDie:  524156, rise: { tee: 0.452190, h: 10, m: 51, s:  9 }, set: { tee:       -1, h:  0, m:  0, s:  0 } },
  { rataDie:  544676, rise: { tee: 0.343276, h:  8, m: 14, s: 19 }, set: { tee: 0.908706, h: 21, m: 48, s: 32 } },
  { rataDie:  567118, rise: { tee: 0.300431, h:  7, m: 12, s: 37 }, set: { tee: 0.818009, h: 19, m: 37, s: 56 } },
  { rataDie:  569477, rise: { tee: 0.231763, h:  5, m: 33, s: 44 }, set: { tee: 0.714185, h: 17, m:  8, s: 26 } },
  { rataDie:  601716, rise: { tee: 0.973015, h: 23, m: 21, s:  9 }, set: { tee: 0.416862, h: 10, m:  0, s: 17 } },
  { rataDie:  613424, rise: { tee: 0.394417, h:  9, m: 27, s: 58 }, set: { tee: 0.932503, h: 22, m: 22, s: 48 } },
  { rataDie:  626596, rise: { tee: 0.450518, h: 10, m: 48, s: 45 }, set: { tee: 0.956378, h: 22, m: 57, s: 11 } },
  { rataDie:  645554, rise: { tee: 0.416008, h:  9, m: 59, s:  3 }, set: { tee: 0.952629, h: 22, m: 51, s: 47 } },
  { rataDie:  664224, rise: { tee: 0.657391, h: 15, m: 46, s: 39 }, set: { tee: 0.070965, h:  1, m: 42, s: 11 } },
  { rataDie:  671401, rise: { tee: 0.686259, h: 16, m: 28, s: 13 }, set: { tee: 0.200419, h:  4, m: 48, s: 36 } },
  { rataDie:  694799, rise: { tee: 0.008243, h:  0, m: 11, s: 52 }, set: { tee: 0.489200, h: 11, m: 44, s: 27 } },
  { rataDie:  704424, rise: { tee: 0.916779, h: 22, m:  0, s: 10 }, set: { tee: 0.429962, h: 10, m: 19, s:  9 } },
  { rataDie:  708842, rise: { tee: 0.586590, h: 14, m:  4, s: 41 }, set: { tee: 0.031414, h:  0, m: 45, s: 14 } },
  { rataDie:  709409, rise: { tee: 0.742587, h: 17, m: 49, s: 20 }, set: { tee: 0.224521, h:  5, m: 23, s: 19 } },
  { rataDie:  709580, rise: { tee: 0.555246, h: 13, m: 19, s: 33 }, set: { tee:       -1, h:  0, m:  0, s:  0 } },
  { rataDie:  727274, rise: { tee: 0.719220, h: 17, m: 15, s: 41 }, set: { tee: 0.214825, h:  5, m:  9, s: 21 } },
  { rataDie:  728714, rise: { tee: 0.466211, h: 11, m: 11, s: 21 }, set: { tee:       -1, h:  0, m:  0, s:  0 } },
  { rataDie:  744313, rise: { tee: 0.705999, h: 16, m: 56, s: 38 }, set: { tee: 0.211858, h:  5, m:  5, s:  5 } },
  { rataDie:  764652, rise: { tee: 0.436806, h: 10, m: 29, s:  0 }, set: { tee: 0.963174, h: 23, m:  6, s: 58 } },
];

describe('Astro spec', () => {

  it ('should calculate moon-rise for rata die', () => {
    // const misses: number[] = [];
    dates.forEach (({ rataDie, rise }) => {
      const actual = moonRise (rataDie, islamic.MECCA_LOCATION);

      expect (actual).toBeCloseTo (rataDie + rise.tee, .00001);
    });
  });

  it ('should calculate moon-set for rata die', () => {
     dates.forEach (({ rataDie, set }) => {
      const actual = moonSet (rataDie, islamic.MECCA_LOCATION);

      if (actual !== -1) {
        expect (actual).toBeCloseTo (rataDie + set.tee, .00001);
      }
    });
  });

  const jdn = 2456435.5;

  it ('should determine the week-day', () => {
    expect(jdnToWeekDay(jdn)).toBe(WeekDay.THURSDAY);
  });

  it ('should calculate a polynomial', () => {
    expect( poly(1, [ -0.00002, 0.000297, 0.025184, -0.181133, 0.55304, -0.861938, 0.677066, -0.212591 ])
    ).toBeCloseTo(-0.000095, 1e-6);

    expect( poly(50, [ -0.00002, 0.000297, 0.025184, -0.181133, 0.55304, -0.861938, 0.677066, -0.212591 ])
    ).toBe(-1.557734842036502e11);

    expect( poly(7000, [ -0.00002, 0.000297, 0.025184, -0.181133, 0.55304, -0.861938, 0.677066, -0.212591 ])
    ).toBe(-1.749981882604302e26);
  });

  it ('should calculate a Julian centuries relative to 2000-01-01', () => {
    expect(julianCenturies(584023)).toBeCloseTo(-4.0, 1e-4);
  });

  it ('should calculate the obliquity of an ecliptic of a rataDie date', () => {
    expect(obliquity(jdn)).toBe(22.877468971740665);
  });

  it ('should calculate an ephemeris correction', () => {
    expect(ephemerisCorrection(584023)).toBeCloseTo(0.001485, 1e-5);
  });

  it ('should calculate the equation of time', () => {
    expect(equationOfTime(jdn)).toBeCloseTo(-0.007214, 1e-6);

    expect(equationOfTime(10623767.143 / 6)).toBeCloseTo( 0.01025589, 1e-8);
  });

  it ('should calculate a sigma of a matrix', () => {
    const matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];

    expect(sigma(matrix, (x0: number, y0: number, z0: number): number => x0 * y0 * z0)).toBe(780);
  });

  it ('should calculate a nutation', () => {
    const tee = dynamicalToUniversal(2448724.5);
    const actual = nutation(tee);

    expect(actual).toBeCloseTo(0.00154264, 1e-8);
  });

  it ('should sort an array with binary search', () => {
    let func = (arg: number): number => arg;
    let y1 = 1.0;

    const fMinusY = (x0: number, y0: number): number => func(x0) - y0;
    const predicate = (a0: number, b0: number): boolean => Math.abs(fMinusY((a0 + b0) / 2, y1)) <= 1e-5;
    const discriminator = (x0: number, y0: number): boolean => fMinusY((x0 + y0) / 2, y1) >= 0;

    expect(binarySearch(0.0, 3.1, predicate, discriminator)).toBeCloseTo(1.0, 1e-4);

    y1 = 0.0;
    func = (x0: number): number => x0 * x0 - 4 * x0 + 4;

    expect(binarySearch(1.5, 2.5, predicate, discriminator)).toBeCloseTo(2.0, 1e-4);
  });

});
