import { J0000 } from '../../Const';

import { BalinesePawukonCalendar as cal } from '../../calendar/BalinesePawukonCalendar';

const data3 = [
  {
    rataDie: -214193,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 1,
      caturwara: 1,
      pancawara: 3,
      sadwara: 1,
      saptawara: 1,
      asatawara: 5,
      sangawara: 7,
      dasawara: 3
    }
  },
  {
    rataDie: -61387,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 2,
      caturwara: 1,
      pancawara: 4,
      sadwara: 5,
      saptawara: 4,
      asatawara: 5,
      sangawara: 5,
      dasawara: 2
    }
  },
  {
    rataDie: 25469,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 2,
      caturwara: 1,
      pancawara: 5,
      sadwara: 5,
      saptawara: 4,
      asatawara: 1,
      sangawara: 5,
      dasawara: 6
    }
  },
  {
    rataDie: 49217,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 2,
      caturwara: 3,
      pancawara: 3,
      sadwara: 5,
      saptawara: 1,
      asatawara: 3,
      sangawara: 5,
      dasawara: 3
    }
  },
  {
    rataDie: 171307,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 1,
      caturwara: 3,
      pancawara: 3,
      sadwara: 1,
      saptawara: 4,
      asatawara: 3,
      sangawara: 1,
      dasawara: 5
    }
  },
  {
    rataDie: 210155,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 2,
      caturwara: 1,
      pancawara: 1,
      sadwara: 5,
      saptawara: 2,
      asatawara: 1,
      sangawara: 8,
      dasawara: 0
    }
  },
  {
    rataDie: 253427,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 2,
      caturwara: 3,
      pancawara: 3,
      sadwara: 5,
      saptawara: 7,
      asatawara: 3,
      sangawara: 2,
      dasawara: 7
    }
  },
  {
    rataDie: 369740,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 2,
      caturwara: 2,
      pancawara: 1,
      sadwara: 2,
      saptawara: 1,
      asatawara: 2,
      sangawara: 2,
      dasawara: 1
    }
  },
  {
    rataDie: 400085,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 2,
      caturwara: 1,
      pancawara: 1,
      sadwara: 5,
      saptawara: 1,
      asatawara: 1,
      sangawara: 8,
      dasawara: 1
    }
  },
  {
    rataDie: 434355,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 3,
      caturwara: 1,
      pancawara: 1,
      sadwara: 3,
      saptawara: 6,
      asatawara: 1,
      sangawara: 3,
      dasawara: 2
    }
  },
  {
    rataDie: 452605,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 1,
      caturwara: 1,
      pancawara: 1,
      sadwara: 1,
      saptawara: 7,
      asatawara: 5,
      sangawara: 1,
      dasawara: 5
    }
  },
  {
    rataDie: 470160,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 3,
      caturwara: 4,
      pancawara: 1,
      sadwara: 6,
      saptawara: 6,
      asatawara: 8,
      sangawara: 6,
      dasawara: 2
    }
  },
  {
    rataDie: 473837,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 2,
      caturwara: 3,
      pancawara: 3,
      sadwara: 5,
      saptawara: 1,
      asatawara: 3,
      sangawara: 5,
      dasawara: 3
    }
  },
  {
    rataDie: 507850,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 1,
      caturwara: 4,
      pancawara: 1,
      sadwara: 4,
      saptawara: 1,
      asatawara: 4,
      sangawara: 7,
      dasawara: 1
    }
  },
  {
    rataDie: 524156,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 2,
      caturwara: 2,
      pancawara: 2,
      sadwara: 2,
      saptawara: 4,
      asatawara: 2,
      sangawara: 5,
      dasawara: 7
    }
  },
  {
    rataDie: 544676,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 2,
      caturwara: 4,
      pancawara: 2,
      sadwara: 2,
      saptawara: 7,
      asatawara: 8,
      sangawara: 8,
      dasawara: 9
    }
  },
  {
    rataDie: 567118,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 1,
      caturwara: 4,
      pancawara: 4,
      sadwara: 4,
      saptawara: 7,
      asatawara: 4,
      sangawara: 7,
      dasawara: 4
    }
  },
  {
    rataDie: 569477,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 2,
      caturwara: 3,
      pancawara: 3,
      sadwara: 5,
      saptawara: 7,
      asatawara: 3,
      sangawara: 2,
      dasawara: 7
    }
  },
  {
    rataDie: 601716,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 3,
      caturwara: 4,
      pancawara: 2,
      sadwara: 6,
      saptawara: 4,
      asatawara: 8,
      sangawara: 3,
      dasawara: 7
    }
  },
  {
    rataDie: 613424,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 2,
      caturwara: 4,
      pancawara: 5,
      sadwara: 2,
      saptawara: 1,
      asatawara: 4,
      sangawara: 5,
      dasawara: 4
    }
  },
  {
    rataDie: 626596,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 1,
      caturwara: 2,
      pancawara: 2,
      sadwara: 4,
      saptawara: 6,
      asatawara: 2,
      sangawara: 1,
      dasawara: 6
    }
  },
  {
    rataDie: 645554,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 2,
      caturwara: 4,
      pancawara: 5,
      sadwara: 2,
      saptawara: 1,
      asatawara: 4,
      sangawara: 5,
      dasawara: 4
    }
  },
  {
    rataDie: 664224,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 3,
      caturwara: 4,
      pancawara: 5,
      sadwara: 6,
      saptawara: 2,
      asatawara: 8,
      sangawara: 3,
      dasawara: 3
    }
  },
  {
    rataDie: 671401,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 1,
      caturwara: 1,
      pancawara: 2,
      sadwara: 1,
      saptawara: 4,
      asatawara: 5,
      sangawara: 4,
      dasawara: 7
    }
  },
  {
    rataDie: 694799,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 2,
      caturwara: 1,
      pancawara: 5,
      sadwara: 5,
      saptawara: 1,
      asatawara: 5,
      sangawara: 8,
      dasawara: 4
    }
  },
  {
    rataDie: 704424,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 3,
      caturwara: 2,
      pancawara: 5,
      sadwara: 6,
      saptawara: 1,
      asatawara: 2,
      sangawara: 3,
      dasawara: 4
    }
  },
  {
    rataDie: 708842,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 2,
      caturwara: 2,
      pancawara: 3,
      sadwara: 2,
      saptawara: 2,
      asatawara: 2,
      sangawara: 1,
      dasawara: 2
    }
  },
  {
    rataDie: 709409,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 2,
      caturwara: 3,
      pancawara: 5,
      sadwara: 5,
      saptawara: 2,
      asatawara: 3,
      sangawara: 2,
      dasawara: 3
    }
  },
  {
    rataDie: 709580,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 2,
      caturwara: 4,
      pancawara: 1,
      sadwara: 2,
      saptawara: 5,
      asatawara: 4,
      sangawara: 8,
      dasawara: 4
    }
  },
  {
    rataDie: 727274,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 2,
      caturwara: 2,
      pancawara: 5,
      sadwara: 2,
      saptawara: 3,
      asatawara: 2,
      sangawara: 8,
      dasawara: 2
    }
  },
  {
    rataDie: 728714,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 2,
      caturwara: 4,
      pancawara: 5,
      sadwara: 2,
      saptawara: 1,
      asatawara: 4,
      sangawara: 5,
      dasawara: 4
    }
  },
  {
    rataDie: 744313,
    balinese: {
      luang: true,
      dwiwara: 2,
      triwara: 1,
      caturwara: 3,
      pancawara: 4,
      sadwara: 1,
      saptawara: 4,
      asatawara: 7,
      sangawara: 1,
      dasawara: 2
    }
  },
  {
    rataDie: 764652,
    balinese: {
      luang: false,
      dwiwara: 1,
      triwara: 3,
      caturwara: 4,
      pancawara: 3,
      sadwara: 6,
      saptawara: 1,
      asatawara: 8,
      sangawara: 6,
      dasawara: 3
    }
  }
];

describe('Balinese Pawukon calendar spec', () => {
  it ('should convert a Julian day to a Balinese Pawukon date', () => {
    data3.forEach(dt => {
      const julian = dt.rataDie + J0000;
      const date = dt.balinese;
      // const expected = {
      //   jdn: julian,
      //   luang: date.luang,
      //   dwiwara: date.dwiwara,
      //   triwara: date.triwara,
      //   caturwara: date.caturwara,
      //   pancawara: date.pancawara,
      //   sadwara: date.sadwara,
      //   saptawara: date.saptawara,
      //   asatawara: date.asatawara,
      //   sangawara: date.sangawara,
      //   dasawara: date.dasawara
      // };
      const expected = { jdn: julian, ...date };
      const actual = cal.fromJdn(julian);

      expect(expected).toEqual(actual);
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
