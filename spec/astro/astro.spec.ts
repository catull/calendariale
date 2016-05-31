/* global describe it: true */
/* eslint
  max-params: [ "error", 4 ] */

'use strict';

const astro = require ('../../lib/Astro.js');
const chai = require ('chai');
const Const = require ('../../lib/Const.js');

require ('dirty-chai');
require ('mocha');

const expect = chai.expect;

describe ('Astro spec', () => {
  const julian = 2456435.5,
      fixed = julian - Const.J0000;

  it ('should determine the week-day', () => {
    expect (astro.jwday (fixed)).to.equal (4); // Thursday
  });

  it ('should calculate a polynomial', () => {
    expect (astro.poly (1, [
      -0.00002, 0.000297, 0.025184, -0.181133,
      0.553040, -0.861938, 0.677066, -0.212591 ])).to.be.closeTo (-0.000095, 1e-6);

    expect (astro.poly (50, [
      -0.00002, 0.000297, 0.025184, -0.181133,
      0.553040, -0.861938, 0.677066, -0.212591 ])).to.equal (-1.557734842036502e+11);

    expect (astro.poly (7000, [
      -0.00002, 0.000297, 0.025184, -0.181133,
      0.553040, -0.861938, 0.677066, -0.212591 ])).to.equal (-1.749981882604302e+26);
  });

  it ('should calculate a Julian centuries relative to 2000-01-01', () => {
    expect (astro.julianCenturies (584023)).to.be.closeTo (-4.0, 1e-4);
  });

  it ('should calculate the obliquity of an ecliptic of a fixed date', () => {
    expect (astro.obliquity (julian)).to.be.equal (22.877468971740665);
  });

  it ('should calculate an ephemeris correction', () => {
    expect (astro.ephemerisCorrection (584023)).to.be.closeTo (0.001485, 1e-5);
  });

  it ('should calculate the equation of time', () => {
    expect (astro.equationOfTime (julian)).to.be.closeTo (-0.007214, 1e-6);

    expect (astro.equationOfTime (49203.35716666667 + Const.J0000)).to.be.closeTo (0.01025589, 1e-8);
  });

  it ('should calculate a sigma of a matrix', () => {
    const matrix = [ [ 1, 2, 3, 4 ], [ 5, 6, 7, 8 ], [ 9, 10, 11, 12 ] ];

    expect (astro.sigma (matrix, (x0, y0, z0) => {
      return x0 * y0 * z0;
    })).to.be.equal (780);
  });

  it ('should calculate a nutation', () => {
    const jd = 727300 + Const.J0000,
        tee = astro.dynamicalToUniversal (jd),
        actual = astro.nutation (tee);

    expect (actual).to.be.closeTo (0.00154264, 1e-8);
  });

  it ('should sort an array with binary search', () => {
    let func = (arg) => arg,
        y1 = 1.0;

    const fMinusY = (x0, y0) => func (x0) - y0,
        predicate = (a0, b0) => Math.abs (fMinusY ((a0 + b0) / 2, y1)) <= 1e-5,
        discriminator = (x0) => fMinusY (x0, y1) >= 0;

    expect (astro.binarySearch (0.0, 3.1, predicate, discriminator)).to.be.closeTo (1.0, 1e-4);

    y1 = 0.0;
    func = (x0) => x0 * x0 - 4 * x0 + 4;

    expect (astro.binarySearch (1.5, 2.5, predicate, discriminator)).to.be.closeTo (2.0, 1e-4);
  });
});
