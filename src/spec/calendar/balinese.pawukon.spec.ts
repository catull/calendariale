import { J0000 } from '../../Const';
import { BalinesePawukonCalendar as cal } from '../../calendar/BalinesePawukonCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { luang: false, dwiwara: 1, triwara: 1, caturwara: 1, pancawara: 3, sadwara: 1, saptawara: 1, asatawara: 5, sangawara: 7, dasawara: 3 } },
  { jdn: -61387 + J0000, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 1, pancawara: 4, sadwara: 5, saptawara: 4, asatawara: 5, sangawara: 5, dasawara: 2 } },
  { jdn:  25469 + J0000, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 1, pancawara: 5, sadwara: 5, saptawara: 4, asatawara: 1, sangawara: 5, dasawara: 6 } },
  { jdn:  49217 + J0000, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 3, pancawara: 3, sadwara: 5, saptawara: 1, asatawara: 3, sangawara: 5, dasawara: 3 } },
  { jdn: 171307 + J0000, date: { luang: false, dwiwara: 1, triwara: 1, caturwara: 3, pancawara: 3, sadwara: 1, saptawara: 4, asatawara: 3, sangawara: 1, dasawara: 5 } },
  { jdn: 210155 + J0000, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 1, pancawara: 1, sadwara: 5, saptawara: 2, asatawara: 1, sangawara: 8, dasawara: 0 } },
  { jdn: 253427 + J0000, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 3, pancawara: 3, sadwara: 5, saptawara: 7, asatawara: 3, sangawara: 2, dasawara: 7 } },
  { jdn: 369740 + J0000, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 2, pancawara: 1, sadwara: 2, saptawara: 1, asatawara: 2, sangawara: 2, dasawara: 1 } },
  { jdn: 400085 + J0000, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 1, pancawara: 1, sadwara: 5, saptawara: 1, asatawara: 1, sangawara: 8, dasawara: 1 } },
  { jdn: 434355 + J0000, date: { luang: true,  dwiwara: 2, triwara: 3, caturwara: 1, pancawara: 1, sadwara: 3, saptawara: 6, asatawara: 1, sangawara: 3, dasawara: 2 } },
  { jdn: 452605 + J0000, date: { luang: false, dwiwara: 1, triwara: 1, caturwara: 1, pancawara: 1, sadwara: 1, saptawara: 7, asatawara: 5, sangawara: 1, dasawara: 5 } },
  { jdn: 470160 + J0000, date: { luang: true,  dwiwara: 2, triwara: 3, caturwara: 4, pancawara: 1, sadwara: 6, saptawara: 6, asatawara: 8, sangawara: 6, dasawara: 2 } },
  { jdn: 473837 + J0000, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 3, pancawara: 3, sadwara: 5, saptawara: 1, asatawara: 3, sangawara: 5, dasawara: 3 } },
  { jdn: 507850 + J0000, date: { luang: false, dwiwara: 1, triwara: 1, caturwara: 4, pancawara: 1, sadwara: 4, saptawara: 1, asatawara: 4, sangawara: 7, dasawara: 1 } },
  { jdn: 524156 + J0000, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 2, pancawara: 2, sadwara: 2, saptawara: 4, asatawara: 2, sangawara: 5, dasawara: 7 } },
  { jdn: 544676 + J0000, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 4, pancawara: 2, sadwara: 2, saptawara: 7, asatawara: 8, sangawara: 8, dasawara: 9 } },
  { jdn: 567118 + J0000, date: { luang: true,  dwiwara: 2, triwara: 1, caturwara: 4, pancawara: 4, sadwara: 4, saptawara: 7, asatawara: 4, sangawara: 7, dasawara: 4 } },
  { jdn: 569477 + J0000, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 3, pancawara: 3, sadwara: 5, saptawara: 7, asatawara: 3, sangawara: 2, dasawara: 7 } },
  { jdn: 601716 + J0000, date: { luang: false, dwiwara: 1, triwara: 3, caturwara: 4, pancawara: 2, sadwara: 6, saptawara: 4, asatawara: 8, sangawara: 3, dasawara: 7 } },
  { jdn: 613424 + J0000, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 4, pancawara: 5, sadwara: 2, saptawara: 1, asatawara: 4, sangawara: 5, dasawara: 4 } },
  { jdn: 626596 + J0000, date: { luang: true,  dwiwara: 2, triwara: 1, caturwara: 2, pancawara: 2, sadwara: 4, saptawara: 6, asatawara: 2, sangawara: 1, dasawara: 6 } },
  { jdn: 645554 + J0000, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 4, pancawara: 5, sadwara: 2, saptawara: 1, asatawara: 4, sangawara: 5, dasawara: 4 } },
  { jdn: 664224 + J0000, date: { luang: false, dwiwara: 1, triwara: 3, caturwara: 4, pancawara: 5, sadwara: 6, saptawara: 2, asatawara: 8, sangawara: 3, dasawara: 3 } },
  { jdn: 671401 + J0000, date: { luang: false, dwiwara: 1, triwara: 1, caturwara: 1, pancawara: 2, sadwara: 1, saptawara: 4, asatawara: 5, sangawara: 4, dasawara: 7 } },
  { jdn: 694799 + J0000, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 1, pancawara: 5, sadwara: 5, saptawara: 1, asatawara: 5, sangawara: 8, dasawara: 4 } },
  { jdn: 704424 + J0000, date: { luang: true,  dwiwara: 2, triwara: 3, caturwara: 2, pancawara: 5, sadwara: 6, saptawara: 1, asatawara: 2, sangawara: 3, dasawara: 4 } },
  { jdn: 708842 + J0000, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 2, pancawara: 3, sadwara: 2, saptawara: 2, asatawara: 2, sangawara: 1, dasawara: 2 } },
  { jdn: 709409 + J0000, date: { luang: false, dwiwara: 1, triwara: 2, caturwara: 3, pancawara: 5, sadwara: 5, saptawara: 2, asatawara: 3, sangawara: 2, dasawara: 3 } },
  { jdn: 709580 + J0000, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 4, pancawara: 1, sadwara: 2, saptawara: 5, asatawara: 4, sangawara: 8, dasawara: 4 } },
  { jdn: 727274 + J0000, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 2, pancawara: 5, sadwara: 2, saptawara: 3, asatawara: 2, sangawara: 8, dasawara: 2 } },
  { jdn: 728714 + J0000, date: { luang: true,  dwiwara: 2, triwara: 2, caturwara: 4, pancawara: 5, sadwara: 2, saptawara: 1, asatawara: 4, sangawara: 5, dasawara: 4 } },
  { jdn: 744313 + J0000, date: { luang: true,  dwiwara: 2, triwara: 1, caturwara: 3, pancawara: 4, sadwara: 1, saptawara: 4, asatawara: 7, sangawara: 1, dasawara: 2 } },
  { jdn: 764652 + J0000, date: { luang: false, dwiwara: 1, triwara: 3, caturwara: 4, pancawara: 3, sadwara: 6, saptawara: 1, asatawara: 8, sangawara: 6, dasawara: 3 } },
];

describe('Balinese Pawukon calendar spec', () => {
  it ('should convert a Julian day to a Balinese Pawukon date', () => {
    dates.forEach(({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.luang).toBe (actual.isLuag());
      expect (expected.dwiwara).toBe (actual.getDwiwara());
      expect (expected.triwara).toBe (actual.getTriwara());
      expect (expected.caturwara).toBe (actual.getCaturwara());
      expect (expected.pancawara).toBe (actual.getPancawara());
      expect (expected.sadwara).toBe (actual.getSadwara());
      expect (expected.saptawara).toBe (actual.getSaptawara());
      expect (expected.asatawara).toBe (actual.getAsatawara());
      expect (expected.sangawara).toBe (actual.getSangawara());
      expect (expected.dasawara).toBe (actual.getDasawara());
    });
  });

});
