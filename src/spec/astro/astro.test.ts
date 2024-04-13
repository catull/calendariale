import {
  apparentToUniversal,
  arcTanDeg,
  binarySearch,
  dawn,
  dynamicalToUniversal,
  ephemerisCorrection,
  equationOfTime,
  fixAngle,
  fixAngleRadians,
  jhms,
  jdnToWeekDay,
  julianCenturies,
  jwday,
  kdayNearest,
  mod3,
  moonLag,
  moonRise,
  moonSet,
  nthKday,
  nutation,
  obliquity,
  poly,
  sigma,
  standardToLocal,
  sunset,
} from '../../Astro';
import { WeekDay, babylonian, islamic, J1970 } from '../../Const';
import { Location } from '../../Location';

import { describe, expect, it } from 'vitest';

const dates = [
  {
    jdn: 1507231.5,
    rataDie: -214193,
    rise: { tee: 0.64526, h: 15, m: 29, s: 10 },
    set: { tee: 0.084225, h: 2, m: 1, s: 17 },
  },
  {
    jdn: 1660037.5,
    rataDie: -61387,
    rise: { tee: 0.14665, h: 3, m: 31, s: 11 },
    set: { tee: 0.627607, h: 15, m: 3, s: 45 },
  },
  {
    jdn: 1746893.5,
    rataDie: 25469,
    rise: { tee: 0.365595, h: 8, m: 46, s: 27 },
    set: { tee: 0.842646, h: 20, m: 13, s: 25 },
  },
  {
    jdn: 1770641.5,
    rataDie: 49217,
    rise: { tee: 0.582553, h: 13, m: 58, s: 53 },
    set: { tee: 0.030307, h: 0, m: 43, s: 39 },
  },
  {
    jdn: 1892731.5,
    rataDie: 171307,
    rise: { tee: 0.926722, h: 22, m: 14, s: 29 },
    set: { tee: 0.419886, h: 10, m: 4, s: 38 },
  },
  {
    jdn: 1931579.5,
    rataDie: 210155,
    rise: { tee: 0.391565, h: 9, m: 23, s: 51 },
    set: { tee: 0.965784, h: 23, m: 10, s: 44 },
  },
  {
    jdn: 1974851.5,
    rataDie: 253427,
    rise: { tee: 0.737227, h: 17, m: 41, s: 36 },
    set: { tee: 0.252852, h: 6, m: 4, s: 6 },
  },
  { jdn: 2091164.5, rataDie: 369740, rise: { tee: 0.434271, h: 10, m: 25, s: 21 }, set: { tee: -1, h: 0, m: 0, s: 0 } },
  {
    jdn: 2121509.5,
    rataDie: 400085,
    rise: { tee: 0.028119, h: 0, m: 40, s: 30 },
    set: { tee: 0.528119, h: 12, m: 40, s: 30 },
  },
  {
    jdn: 2155779.5,
    rataDie: 434355,
    rise: { tee: 0.501712, h: 12, m: 2, s: 28 },
    set: { tee: 0.052493, h: 1, m: 15, s: 35 },
  },
  {
    jdn: 2174029.5,
    rataDie: 452605,
    rise: { tee: 0.49405, h: 11, m: 51, s: 26 },
    set: { tee: 0.037996, h: 0, m: 54, s: 43 },
  },
  {
    jdn: 2191584.5,
    rataDie: 470160,
    rise: { tee: 0.013196, h: 0, m: 19, s: 0 },
    set: { tee: 0.493177, h: 11, m: 50, s: 11 },
  },
  {
    jdn: 2195261.5,
    rataDie: 473837,
    rise: { tee: 0.519306, h: 12, m: 27, s: 48 },
    set: { tee: 0.060322, h: 1, m: 26, s: 52 },
  },
  {
    jdn: 2229274.5,
    rataDie: 507850,
    rise: { tee: 0.259826, h: 6, m: 14, s: 9 },
    set: { tee: 0.856017, h: 20, m: 32, s: 40 },
  },
  { jdn: 2245580.5, rataDie: 524156, rise: { tee: 0.45219, h: 10, m: 51, s: 9 }, set: { tee: -1, h: 0, m: 0, s: 0 } },
  {
    jdn: 2266100.5,
    rataDie: 544676,
    rise: { tee: 0.343276, h: 8, m: 14, s: 19 },
    set: { tee: 0.908706, h: 21, m: 48, s: 32 },
  },
  {
    jdn: 2288542.5,
    rataDie: 567118,
    rise: { tee: 0.300431, h: 7, m: 12, s: 37 },
    set: { tee: 0.818009, h: 19, m: 37, s: 56 },
  },
  {
    jdn: 2290901.5,
    rataDie: 569477,
    rise: { tee: 0.231763, h: 5, m: 33, s: 44 },
    set: { tee: 0.714185, h: 17, m: 8, s: 26 },
  },
  {
    jdn: 2323140.5,
    rataDie: 601716,
    rise: { tee: 0.973015, h: 23, m: 21, s: 9 },
    set: { tee: 0.416862, h: 10, m: 0, s: 17 },
  },
  {
    jdn: 2334848.5,
    rataDie: 613424,
    rise: { tee: 0.394417, h: 9, m: 27, s: 58 },
    set: { tee: 0.932503, h: 22, m: 22, s: 48 },
  },
  {
    jdn: 2348020.5,
    rataDie: 626596,
    rise: { tee: 0.450518, h: 10, m: 48, s: 45 },
    set: { tee: 0.956378, h: 22, m: 57, s: 11 },
  },
  {
    jdn: 2366978.5,
    rataDie: 645554,
    rise: { tee: 0.416008, h: 9, m: 59, s: 3 },
    set: { tee: 0.952629, h: 22, m: 51, s: 47 },
  },
  {
    jdn: 2385648.5,
    rataDie: 664224,
    rise: { tee: 0.657391, h: 15, m: 46, s: 39 },
    set: { tee: 0.070965, h: 1, m: 42, s: 11 },
  },
  {
    jdn: 2392825.5,
    rataDie: 671401,
    rise: { tee: 0.686259, h: 16, m: 28, s: 13 },
    set: { tee: 0.200419, h: 4, m: 48, s: 36 },
  },
  {
    jdn: 2416223.5,
    rataDie: 694799,
    rise: { tee: 0.008243, h: 0, m: 11, s: 52 },
    set: { tee: 0.4892, h: 11, m: 44, s: 27 },
  },
  {
    jdn: 2425848.5,
    rataDie: 704424,
    rise: { tee: 0.916779, h: 22, m: 0, s: 10 },
    set: { tee: 0.429962, h: 10, m: 19, s: 9 },
  },
  {
    jdn: 2430266.5,
    rataDie: 708842,
    rise: { tee: 0.58659, h: 14, m: 4, s: 41 },
    set: { tee: 0.031414, h: 0, m: 45, s: 14 },
  },
  {
    jdn: 2430833.5,
    rataDie: 709409,
    rise: { tee: 0.742587, h: 17, m: 49, s: 20 },
    set: { tee: 0.224521, h: 5, m: 23, s: 19 },
  },
  { jdn: 2431004.5, rataDie: 709580, rise: { tee: 0.555246, h: 13, m: 19, s: 33 }, set: { tee: -1, h: 0, m: 0, s: 0 } },
  {
    jdn: 2448698.5,
    rataDie: 727274,
    rise: { tee: 0.71922, h: 17, m: 15, s: 41 },
    set: { tee: 0.214825, h: 5, m: 9, s: 21 },
  },
  { jdn: 2450138.5, rataDie: 728714, rise: { tee: 0.466211, h: 11, m: 11, s: 21 }, set: { tee: -1, h: 0, m: 0, s: 0 } },
  {
    jdn: 2465737.5,
    rataDie: 744313,
    rise: { tee: 0.705999, h: 16, m: 56, s: 38 },
    set: { tee: 0.211858, h: 5, m: 5, s: 5 },
  },
  {
    jdn: 2486076.5,
    rataDie: 764652,
    rise: { tee: 0.436806, h: 10, m: 29, s: 0 },
    set: { tee: 0.963174, h: 23, m: 6, s: 58 },
  },
];

describe('astro spec', () => {
  const jdn = 2456435.5;

  it('should identify the week-day', () => {
    expect(jdnToWeekDay(jdn)).toBe(WeekDay.THURSDAY);
  });

  it('should determine the nearest week-day', () => {
    expect(kdayNearest(WeekDay.SUNDAY, jdn)).toBe(2456438.5);
  });

  it('should calculate the arc tangent in degrees', () => {
    let tan = arcTanDeg(90, 0);
    expect(tan).toBe(90);
    tan = arcTanDeg(0, 90);
    expect(tan).toBe(0);
  });

  it('should calculate mod3 and nth k-day correctly', () => {
    const a = mod3(0, 0, 0);
    expect(a).toBe(0);

    const jdn = nthKday(-1, WeekDay.FRIDAY, J1970);
    expect(jdn).toBe(2440581.5);
    const jdn2 = nthKday(0, WeekDay.FRIDAY, J1970);
    expect(jdn2).toBe(-1);
  });

  it('should calculate a polynomial', () => {
    expect(poly(1, [-0.00002, 0.000297, 0.025184, -0.181133, 0.55304, -0.861938, 0.677066, -0.212591])).toBeCloseTo(
      -0.000095,
      1e-6,
    );

    expect(poly(50, [-0.00002, 0.000297, 0.025184, -0.181133, 0.55304, -0.861938, 0.677066, -0.212591])).toBe(
      -1.557734842036502e11,
    );

    expect(poly(7000, [-0.00002, 0.000297, 0.025184, -0.181133, 0.55304, -0.861938, 0.677066, -0.212591])).toBe(
      -1.749981882604302e26,
    );
  });

  it('should calculate a Julian centuries relative to 2000-01-01', () => {
    expect(julianCenturies(584023)).toBeCloseTo(-4.0, 1e-4);
  });

  it('should calculate the obliquity of an ecliptic of a rataDie date', () => {
    expect(obliquity(jdn)).toBe(22.877468971740665);
  });

  it('should calculate an ephemeris correction', () => {
    expect(ephemerisCorrection(584023)).toBeCloseTo(0.001485, 1e-5);
  });

  it('should calculate the equation of time', () => {
    expect(equationOfTime(jdn)).toBeCloseTo(-0.007214, 1e-6);

    expect(equationOfTime(10623767.143 / 6)).toBeCloseTo(0.01025589, 1e-8);
  });

  it('should calculate a sigma of a matrix', () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ];

    expect(sigma(matrix, (x0: number, y0: number, z0: number): number => x0 * y0 * z0)).toBe(780);
    expect(sigma([], (): number => 0)).toBe(0);
  });

  it('should calculate fixAngle / fixAngleRadians', () => {
    expect(fixAngle(0)).toBe(0);
    expect(fixAngleRadians(0)).toBe(0);
  });

  it('should calculate standardToLocal / apparentToUniversal', () => {
    expect(standardToLocal(0, babylonian.LOCATION_BABYLON)).toBe(-0.022408888888888895);
    expect(apparentToUniversal(0, babylonian.LOCATION_BABYLON)).toBe(-0.1179944674813647);
  });

  it('should calculate jhms / jwday', () => {
    expect(jhms(0)).toStrictEqual([12, 0, 0,]);
    expect(jwday(0)).toBe(0);
  });

  it('should calculate a nutation', () => {
    const tee = dynamicalToUniversal(2448724.5);
    const actual = nutation(tee);

    expect(actual).toBeCloseTo(0.00154264, 1e-8);
  });

  it('should sort an array with binary search', () => {
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

  it('should calculate moon-rise for rata die', () => {
    dates.forEach(({ rataDie, rise }) => {
      const actual = moonRise(rataDie, islamic.LOCATION_MECCA);

      expect(actual).toBeCloseTo(rataDie + rise.tee, 0.00001);
    });
  });

  it('should calculate moon-set for rata die to be -1', () => {
    dates
      .filter((f) => f.set.tee === -1)
      .forEach(({ rataDie }) => {
        // 369740, 524156, 709580, 728714
        const actual = moonSet(rataDie, islamic.LOCATION_MECCA);
        expect(actual).toBe(-1);
      });
  });

  it('should calculate moon-set for rata die', () => {
    dates
      .filter((f) => f.set.tee !== -1)
      .forEach(({ rataDie, set }) => {
        const actual = moonSet(rataDie, islamic.LOCATION_MECCA);
        expect(actual).toBeCloseTo(rataDie + set.tee, 0.00001);
      });
  });

  it('should handle sunset', () => {
    const rataDie = sunset(0, new Location(90, 0, 0, 0));
    expect(rataDie).toBe(-1);
  });

  it('should handle moonLag', () => {
    const rataDie = moonLag(0, new Location(90, 0, 0, 0));
    expect(rataDie).toBe(-1);
    const tee = moonLag(369740, islamic.LOCATION_MECCA);
    expect(tee).toBe(1);
  });

  it('should handle dawn and moments befora that at the North Pole', () => {
    const location = new Location(90, 0, 0, 0);
    const momentOfDawn = dawn(0, location, 0);
    expect(momentOfDawn).toBe(-1);
    const momentBeforeDawn = dawn(0, location, -0.1);
    expect(momentBeforeDawn).toBe(-1);
  });
});
