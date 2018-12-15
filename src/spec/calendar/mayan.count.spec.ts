import { INVALID_BAKTUN, INVALID_KATUN, INVALID_KIN, INVALID_TUN, INVALID_UINAL, J0000 } from '../../Const';

import { MayanCountCalendar as cal } from '../../calendar/MayanCountCalendar';

const dates = [
  { rataDie: -214193, date: { baktun:  6, katun:  8, tun:  3, uinal: 13, kin:  9 } },
  { rataDie:  -61387, date: { baktun:  7, katun:  9, tun:  8, uinal:  3, kin: 15 } },
  { rataDie:   25469, date: { baktun:  8, katun:  1, tun:  9, uinal:  8, kin: 11 } },
  { rataDie:   49217, date: { baktun:  8, katun:  4, tun: 15, uinal:  7, kin: 19 } },
  { rataDie:  171307, date: { baktun:  9, katun:  1, tun: 14, uinal: 10, kin:  9 } },
  { rataDie:  210155, date: { baktun:  9, katun:  7, tun:  2, uinal:  8, kin: 17 } },
  { rataDie:  253427, date: { baktun:  9, katun: 13, tun:  2, uinal: 12, kin:  9 } },
  { rataDie:  369740, date: { baktun: 10, katun:  9, tun:  5, uinal: 14, kin:  2 } },
  { rataDie:  400085, date: { baktun: 10, katun: 13, tun: 10, uinal:  1, kin:  7 } },
  { rataDie:  434355, date: { baktun: 10, katun: 18, tun:  5, uinal:  4, kin: 17 } },
  { rataDie:  452605, date: { baktun: 11, katun:  0, tun: 15, uinal: 17, kin:  7 } },
  { rataDie:  470160, date: { baktun: 11, katun:  3, tun:  4, uinal: 13, kin:  2 } },
  { rataDie:  473837, date: { baktun: 11, katun:  3, tun: 14, uinal: 16, kin: 19 } },
  { rataDie:  507850, date: { baktun: 11, katun:  8, tun:  9, uinal:  7, kin: 12 } },
  { rataDie:  524156, date: { baktun: 11, katun: 10, tun: 14, uinal: 12, kin: 18 } },
  { rataDie:  544676, date: { baktun: 11, katun: 13, tun: 11, uinal: 12, kin: 18 } },
  { rataDie:  567118, date: { baktun: 11, katun: 16, tun: 14, uinal:  1, kin:  0 } },
  { rataDie:  569477, date: { baktun: 11, katun: 17, tun:  0, uinal: 10, kin: 19 } },
  { rataDie:  601716, date: { baktun: 12, katun:  1, tun: 10, uinal:  2, kin: 18 } },
  { rataDie:  613424, date: { baktun: 12, katun:  3, tun:  2, uinal: 12, kin:  6 } },
  { rataDie:  626596, date: { baktun: 12, katun:  4, tun: 19, uinal:  4, kin: 18 } },
  { rataDie:  645554, date: { baktun: 12, katun:  7, tun: 11, uinal: 16, kin: 16 } },
  { rataDie:  664224, date: { baktun: 12, katun: 10, tun:  3, uinal: 14, kin:  6 } },
  { rataDie:  671401, date: { baktun: 12, katun: 11, tun:  3, uinal: 13, kin:  3 } },
  { rataDie:  694799, date: { baktun: 12, katun: 14, tun:  8, uinal: 13, kin:  1 } },
  { rataDie:  704424, date: { baktun: 12, katun: 15, tun: 15, uinal:  8, kin:  6 } },
  { rataDie:  708842, date: { baktun: 12, katun: 16, tun:  7, uinal: 13, kin:  4 } },
  { rataDie:  709409, date: { baktun: 12, katun: 16, tun:  9, uinal:  5, kin: 11 } },
  { rataDie:  709580, date: { baktun: 12, katun: 16, tun:  9, uinal: 14, kin:  2 } },
  { rataDie:  727274, date: { baktun: 12, katun: 18, tun: 18, uinal: 16, kin: 16 } },
  { rataDie:  728714, date: { baktun: 12, katun: 19, tun:  2, uinal: 16, kin: 16 } },
  { rataDie:  744313, date: { baktun: 13, katun:  1, tun:  6, uinal:  4, kin: 15 } },
  { rataDie:  764652, date: { baktun: 13, katun:  4, tun:  2, uinal: 13, kin: 14 } },
];

describe ('Mayan Count calendar spec', () => {
  it ('should convert a Mayan Count to Julian day', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn    = rataDie + J0000;
      const actual = cal.toJdn (date.baktun, date.katun, date.tun, date.uinal, date.kin);

      expect (actual).toBe (jdn);
    });
  });

  it ('should convert a Julian day to a Mayan Count', () => {
    dates.forEach (({ rataDie, date }) => {
      const jdn      = rataDie + J0000;
      const expected = { jdn, ...date };
      const actual   = cal.fromJdn (jdn);

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
