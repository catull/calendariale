import { INVALID_BAKTUN, INVALID_KATUN, INVALID_KIN, INVALID_TUN, INVALID_UINAL } from '../../Const';
import { MayanCountCalendar as cal } from '../../calendar/MayanCountCalendar';

const dates = [
  { jdn: 1507231.5, date: { baktun:  6, katun:  8, tun:  3, uinal: 13, kin:  9 } },
  { jdn: 1660037.5, date: { baktun:  7, katun:  9, tun:  8, uinal:  3, kin: 15 } },
  { jdn: 1746893.5, date: { baktun:  8, katun:  1, tun:  9, uinal:  8, kin: 11 } },
  { jdn: 1770641.5, date: { baktun:  8, katun:  4, tun: 15, uinal:  7, kin: 19 } },
  { jdn: 1892731.5, date: { baktun:  9, katun:  1, tun: 14, uinal: 10, kin:  9 } },
  { jdn: 1931579.5, date: { baktun:  9, katun:  7, tun:  2, uinal:  8, kin: 17 } },
  { jdn: 1974851.5, date: { baktun:  9, katun: 13, tun:  2, uinal: 12, kin:  9 } },
  { jdn: 2091164.5, date: { baktun: 10, katun:  9, tun:  5, uinal: 14, kin:  2 } },
  { jdn: 2121509.5, date: { baktun: 10, katun: 13, tun: 10, uinal:  1, kin:  7 } },
  { jdn: 2155779.5, date: { baktun: 10, katun: 18, tun:  5, uinal:  4, kin: 17 } },
  { jdn: 2174029.5, date: { baktun: 11, katun:  0, tun: 15, uinal: 17, kin:  7 } },
  { jdn: 2191584.5, date: { baktun: 11, katun:  3, tun:  4, uinal: 13, kin:  2 } },
  { jdn: 2195261.5, date: { baktun: 11, katun:  3, tun: 14, uinal: 16, kin: 19 } },
  { jdn: 2229274.5, date: { baktun: 11, katun:  8, tun:  9, uinal:  7, kin: 12 } },
  { jdn: 2245580.5, date: { baktun: 11, katun: 10, tun: 14, uinal: 12, kin: 18 } },
  { jdn: 2266100.5, date: { baktun: 11, katun: 13, tun: 11, uinal: 12, kin: 18 } },
  { jdn: 2288542.5, date: { baktun: 11, katun: 16, tun: 14, uinal:  1, kin:  0 } },
  { jdn: 2290901.5, date: { baktun: 11, katun: 17, tun:  0, uinal: 10, kin: 19 } },
  { jdn: 2323140.5, date: { baktun: 12, katun:  1, tun: 10, uinal:  2, kin: 18 } },
  { jdn: 2334848.5, date: { baktun: 12, katun:  3, tun:  2, uinal: 12, kin:  6 } },
  { jdn: 2348020.5, date: { baktun: 12, katun:  4, tun: 19, uinal:  4, kin: 18 } },
  { jdn: 2366978.5, date: { baktun: 12, katun:  7, tun: 11, uinal: 16, kin: 16 } },
  { jdn: 2385648.5, date: { baktun: 12, katun: 10, tun:  3, uinal: 14, kin:  6 } },
  { jdn: 2392825.5, date: { baktun: 12, katun: 11, tun:  3, uinal: 13, kin:  3 } },
  { jdn: 2416223.5, date: { baktun: 12, katun: 14, tun:  8, uinal: 13, kin:  1 } },
  { jdn: 2425848.5, date: { baktun: 12, katun: 15, tun: 15, uinal:  8, kin:  6 } },
  { jdn: 2430266.5, date: { baktun: 12, katun: 16, tun:  7, uinal: 13, kin:  4 } },
  { jdn: 2430833.5, date: { baktun: 12, katun: 16, tun:  9, uinal:  5, kin: 11 } },
  { jdn: 2431004.5, date: { baktun: 12, katun: 16, tun:  9, uinal: 14, kin:  2 } },
  { jdn: 2448698.5, date: { baktun: 12, katun: 18, tun: 18, uinal: 16, kin: 16 } },
  { jdn: 2450138.5, date: { baktun: 12, katun: 19, tun:  2, uinal: 16, kin: 16 } },
  { jdn: 2465737.5, date: { baktun: 13, katun:  1, tun:  6, uinal:  4, kin: 15 } },
  { jdn: 2486076.5, date: { baktun: 13, katun:  4, tun:  2, uinal: 13, kin: 14 } },
];

describe ('Mayan Count calendar spec', () => {
  it ('should convert a Mayan Count to Julian day', () => {
    dates.forEach (({ jdn, date }) => {
      const actual = cal.toJdn (date.baktun, date.katun, date.tun, date.uinal, date.kin);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Mayan Count', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.baktun).toBe (actual.getBaktun());
      expect (expected.katun).toBe (actual.getKatun());
      expect (expected.tun).toBe (actual.getTun());
      expect (expected.uinal).toBe (actual.getUinal());
      expect (expected.kin).toBe (actual.getKin());
    });
  });

  it ('should throw validation exceptions', () => {
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
