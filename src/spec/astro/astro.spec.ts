import { J0000 } from '../../Const';

import { binarySearch, dynamicalToUniversal, ephemerisCorrection, equationOfTime,
  julianCenturies, jwday, nutation, obliquity, poly, sigma
} from '../../Astro';

describe('Astro spec', () => {
  const julian = 2456435.5;
  const fixed = julian - J0000;

  it ('should determine the week-day', () => {
    expect(jwday(fixed)).toBe(4); // Thursday
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

  it ('should calculate the obliquity of an ecliptic of a fixed date', () => {
    expect(obliquity(julian)).toBe(22.877468971740665);
  });

  it ('should calculate an ephemeris correction', () => {
    expect(ephemerisCorrection(584023)).toBeCloseTo(0.001485, 1e-5);
  });

  it ('should calculate the equation of time', () => {
    expect(equationOfTime(julian)).toBeCloseTo(-0.007214, 1e-6);

    expect(equationOfTime(49203.35716666667 + J0000)).toBeCloseTo( 0.01025589, 1e-8);
  });

  it ('should calculate a sigma of a matrix', () => {
    const matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];

    expect(sigma(matrix, (x0: number, y0: number, z0: number): number => x0 * y0 * z0)).toBe(780);
  });

  it ('should calculate a nutation', () => {
    const jd = 727300 + J0000;
    const tee = dynamicalToUniversal(jd);
    const actual = nutation(tee);

    expect(actual).toBeCloseTo(0.00154264, 1e-8);
  });

  it ('should sort an array with binary search', () => {
    let func = (arg: number) => arg;
    let y1 = 1.0;

    const fMinusY = (x0: number, y0: number) => func(x0) - y0;
    const predicate = (a0: number, b0: number) => Math.abs(fMinusY((a0 + b0) / 2, y1)) <= 1e-5;
    const discriminator = (x0: number) => fMinusY(x0, y1) >= 0;

    expect(binarySearch(0.0, 3.1, predicate, discriminator)).toBeCloseTo(1.0, 1e-4);

    y1 = 0.0;
    func = (x0: number) => x0 * x0 - 4 * x0 + 4;

    expect(binarySearch(1.5, 2.5, predicate, discriminator)).toBeCloseTo(2.0, 1e-4);
  });
});
