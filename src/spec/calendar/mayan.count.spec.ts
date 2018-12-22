import { INVALID_BAKTUN, INVALID_KATUN, INVALID_KIN, INVALID_TUN, INVALID_UINAL, J0000 } from '../../Const';
import { MayanCountCalendar as cal } from '../../calendar/MayanCountCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { baktun:  6, katun:  8, tun:  3, uinal: 13, kin:  9 } },
  { jdn:  -61387 + J0000, date: { baktun:  7, katun:  9, tun:  8, uinal:  3, kin: 15 } },
  { jdn:   25469 + J0000, date: { baktun:  8, katun:  1, tun:  9, uinal:  8, kin: 11 } },
  { jdn:   49217 + J0000, date: { baktun:  8, katun:  4, tun: 15, uinal:  7, kin: 19 } },
  { jdn:  171307 + J0000, date: { baktun:  9, katun:  1, tun: 14, uinal: 10, kin:  9 } },
  { jdn:  210155 + J0000, date: { baktun:  9, katun:  7, tun:  2, uinal:  8, kin: 17 } },
  { jdn:  253427 + J0000, date: { baktun:  9, katun: 13, tun:  2, uinal: 12, kin:  9 } },
  { jdn:  369740 + J0000, date: { baktun: 10, katun:  9, tun:  5, uinal: 14, kin:  2 } },
  { jdn:  400085 + J0000, date: { baktun: 10, katun: 13, tun: 10, uinal:  1, kin:  7 } },
  { jdn:  434355 + J0000, date: { baktun: 10, katun: 18, tun:  5, uinal:  4, kin: 17 } },
  { jdn:  452605 + J0000, date: { baktun: 11, katun:  0, tun: 15, uinal: 17, kin:  7 } },
  { jdn:  470160 + J0000, date: { baktun: 11, katun:  3, tun:  4, uinal: 13, kin:  2 } },
  { jdn:  473837 + J0000, date: { baktun: 11, katun:  3, tun: 14, uinal: 16, kin: 19 } },
  { jdn:  507850 + J0000, date: { baktun: 11, katun:  8, tun:  9, uinal:  7, kin: 12 } },
  { jdn:  524156 + J0000, date: { baktun: 11, katun: 10, tun: 14, uinal: 12, kin: 18 } },
  { jdn:  544676 + J0000, date: { baktun: 11, katun: 13, tun: 11, uinal: 12, kin: 18 } },
  { jdn:  567118 + J0000, date: { baktun: 11, katun: 16, tun: 14, uinal:  1, kin:  0 } },
  { jdn:  569477 + J0000, date: { baktun: 11, katun: 17, tun:  0, uinal: 10, kin: 19 } },
  { jdn:  601716 + J0000, date: { baktun: 12, katun:  1, tun: 10, uinal:  2, kin: 18 } },
  { jdn:  613424 + J0000, date: { baktun: 12, katun:  3, tun:  2, uinal: 12, kin:  6 } },
  { jdn:  626596 + J0000, date: { baktun: 12, katun:  4, tun: 19, uinal:  4, kin: 18 } },
  { jdn:  645554 + J0000, date: { baktun: 12, katun:  7, tun: 11, uinal: 16, kin: 16 } },
  { jdn:  664224 + J0000, date: { baktun: 12, katun: 10, tun:  3, uinal: 14, kin:  6 } },
  { jdn:  671401 + J0000, date: { baktun: 12, katun: 11, tun:  3, uinal: 13, kin:  3 } },
  { jdn:  694799 + J0000, date: { baktun: 12, katun: 14, tun:  8, uinal: 13, kin:  1 } },
  { jdn:  704424 + J0000, date: { baktun: 12, katun: 15, tun: 15, uinal:  8, kin:  6 } },
  { jdn:  708842 + J0000, date: { baktun: 12, katun: 16, tun:  7, uinal: 13, kin:  4 } },
  { jdn:  709409 + J0000, date: { baktun: 12, katun: 16, tun:  9, uinal:  5, kin: 11 } },
  { jdn:  709580 + J0000, date: { baktun: 12, katun: 16, tun:  9, uinal: 14, kin:  2 } },
  { jdn:  727274 + J0000, date: { baktun: 12, katun: 18, tun: 18, uinal: 16, kin: 16 } },
  { jdn:  728714 + J0000, date: { baktun: 12, katun: 19, tun:  2, uinal: 16, kin: 16 } },
  { jdn:  744313 + J0000, date: { baktun: 13, katun:  1, tun:  6, uinal:  4, kin: 15 } },
  { jdn:  764652 + J0000, date: { baktun: 13, katun:  4, tun:  2, uinal: 13, kin: 14 } },
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
