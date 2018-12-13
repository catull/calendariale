/* global describe it: true */
import { INVALID_BAKTUN, INVALID_KATUN, INVALID_KIN, INVALID_TUN, INVALID_UINAL, J0000 } from '../../Const';

import { MayanCountCalendar as cal } from '../../calendar/MayanCountCalendar';

const data2 = [
  { 'rataDie': -214193, 'mayanLong': { 'baktun':  6, 'katun':  8, 'tun':  3, 'uinal': 13, 'kin':  9 } },
  { 'rataDie':  -61387, 'mayanLong': { 'baktun':  7, 'katun':  9, 'tun':  8, 'uinal':  3, 'kin': 15 } },
  { 'rataDie':   25469, 'mayanLong': { 'baktun':  8, 'katun':  1, 'tun':  9, 'uinal':  8, 'kin': 11 } },
  { 'rataDie':   49217, 'mayanLong': { 'baktun':  8, 'katun':  4, 'tun': 15, 'uinal':  7, 'kin': 19 } },
  { 'rataDie':  171307, 'mayanLong': { 'baktun':  9, 'katun':  1, 'tun': 14, 'uinal': 10, 'kin':  9 } },
  { 'rataDie':  210155, 'mayanLong': { 'baktun':  9, 'katun':  7, 'tun':  2, 'uinal':  8, 'kin': 17 } },
  { 'rataDie':  253427, 'mayanLong': { 'baktun':  9, 'katun': 13, 'tun':  2, 'uinal': 12, 'kin':  9 } },
  { 'rataDie':  369740, 'mayanLong': { 'baktun': 10, 'katun':  9, 'tun':  5, 'uinal': 14, 'kin':  2 } },
  { 'rataDie':  400085, 'mayanLong': { 'baktun': 10, 'katun': 13, 'tun': 10, 'uinal':  1, 'kin':  7 } },
  { 'rataDie':  434355, 'mayanLong': { 'baktun': 10, 'katun': 18, 'tun':  5, 'uinal':  4, 'kin': 17 } },
  { 'rataDie':  452605, 'mayanLong': { 'baktun': 11, 'katun':  0, 'tun': 15, 'uinal': 17, 'kin':  7 } },
  { 'rataDie':  470160, 'mayanLong': { 'baktun': 11, 'katun':  3, 'tun':  4, 'uinal': 13, 'kin':  2 } },
  { 'rataDie':  473837, 'mayanLong': { 'baktun': 11, 'katun':  3, 'tun': 14, 'uinal': 16, 'kin': 19 } },
  { 'rataDie':  507850, 'mayanLong': { 'baktun': 11, 'katun':  8, 'tun':  9, 'uinal':  7, 'kin': 12 } },
  { 'rataDie':  524156, 'mayanLong': { 'baktun': 11, 'katun': 10, 'tun': 14, 'uinal': 12, 'kin': 18 } },
  { 'rataDie':  544676, 'mayanLong': { 'baktun': 11, 'katun': 13, 'tun': 11, 'uinal': 12, 'kin': 18 } },
  { 'rataDie':  567118, 'mayanLong': { 'baktun': 11, 'katun': 16, 'tun': 14, 'uinal':  1, 'kin':  0 } },
  { 'rataDie':  569477, 'mayanLong': { 'baktun': 11, 'katun': 17, 'tun':  0, 'uinal': 10, 'kin': 19 } },
  { 'rataDie':  601716, 'mayanLong': { 'baktun': 12, 'katun':  1, 'tun': 10, 'uinal':  2, 'kin': 18 } },
  { 'rataDie':  613424, 'mayanLong': { 'baktun': 12, 'katun':  3, 'tun':  2, 'uinal': 12, 'kin':  6 } },
  { 'rataDie':  626596, 'mayanLong': { 'baktun': 12, 'katun':  4, 'tun': 19, 'uinal':  4, 'kin': 18 } },
  { 'rataDie':  645554, 'mayanLong': { 'baktun': 12, 'katun':  7, 'tun': 11, 'uinal': 16, 'kin': 16 } },
  { 'rataDie':  664224, 'mayanLong': { 'baktun': 12, 'katun': 10, 'tun':  3, 'uinal': 14, 'kin':  6 } },
  { 'rataDie':  671401, 'mayanLong': { 'baktun': 12, 'katun': 11, 'tun':  3, 'uinal': 13, 'kin':  3 } },
  { 'rataDie':  694799, 'mayanLong': { 'baktun': 12, 'katun': 14, 'tun':  8, 'uinal': 13, 'kin':  1 } },
  { 'rataDie':  704424, 'mayanLong': { 'baktun': 12, 'katun': 15, 'tun': 15, 'uinal':  8, 'kin':  6 } },
  { 'rataDie':  708842, 'mayanLong': { 'baktun': 12, 'katun': 16, 'tun':  7, 'uinal': 13, 'kin':  4 } },
  { 'rataDie':  709409, 'mayanLong': { 'baktun': 12, 'katun': 16, 'tun':  9, 'uinal':  5, 'kin': 11 } },
  { 'rataDie':  709580, 'mayanLong': { 'baktun': 12, 'katun': 16, 'tun':  9, 'uinal': 14, 'kin':  2 } },
  { 'rataDie':  727274, 'mayanLong': { 'baktun': 12, 'katun': 18, 'tun': 18, 'uinal': 16, 'kin': 16 } },
  { 'rataDie':  728714, 'mayanLong': { 'baktun': 12, 'katun': 19, 'tun':  2, 'uinal': 16, 'kin': 16 } },
  { 'rataDie':  744313, 'mayanLong': { 'baktun': 13, 'katun':  1, 'tun':  6, 'uinal':  4, 'kin': 15 } },
  { 'rataDie':  764652, 'mayanLong': { 'baktun': 13, 'katun':  4, 'tun':  2, 'uinal': 13, 'kin': 14 } }
];

describe ('Mayan Count calendar spec', () => {
  let date;
  let julian;
  let expected;
  let actual;

  it ('should convert a Mayan Count to Julian day', () => {
    data2.forEach (dt => {
      julian = dt.rataDie + J0000;
      date   = dt.mayanLong;
      actual = cal.toJdn (date.baktun, date.katun, date.tun, date.uinal, date.kin);

      expect (julian).toBe (actual);
    });
  });

  it ('should convert a Julian day to a Mayan Count', () => {
    data2.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.mayanLong;
      expected = { 'jdn': julian, 'baktun': date.baktun, 'katun': date.katun, 'tun': date.tun, 'uinal': date.uinal, 'kin': date.kin };
      actual   = cal.fromJdn (julian);

      expect (expected).toEqual (actual);
      expect (expected.baktun).toBe (actual.getBaktun());
      expect (expected.katun).toBe (actual.getKatun());
      expect (expected.tun).toBe (actual.getTun());
      expect (expected.uinal).toBe (actual.getUinal());
      expect (expected.kin).toBe (actual.getKin());
    });
  });

  it ('throws validation exceptions', () => {
    expect (() => cal.toJdn (-1, 19, 19, 17, 19)).toThrow (INVALID_BAKTUN);
    expect (() => cal.toJdn ( 0,  0,  0,  0, -1)).toThrow (INVALID_KIN);
    expect (() => cal.toJdn ( 0,  0,  0,  0, 20)).toThrow (INVALID_KIN);
    expect (() => cal.toJdn ( 0,  0,  0, -1, 19)).toThrow (INVALID_UINAL);
    expect (() => cal.toJdn ( 0,  0,  0, 18, 19)).toThrow (INVALID_UINAL);
    expect (() => cal.toJdn ( 0,  0, -1, 17, 19)).toThrow (INVALID_TUN);
    expect (() => cal.toJdn ( 0,  0, 20, 17, 19)).toThrow (INVALID_TUN);
    expect (() => cal.toJdn ( 0, -1, 19, 17, 19)).toThrow (INVALID_KATUN);
    expect (() => cal.toJdn ( 0, 20, 19, 17, 19)).toThrow (INVALID_KATUN);
   });
});
