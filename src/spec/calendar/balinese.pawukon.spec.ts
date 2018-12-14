import { J0000 } from '../../Const';

import { BalinesePawukonCalendar as cal } from '../../calendar/BalinesePawukonCalendar';

const dates = [
  {
    rataDie: -214193,
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
    date: {
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
  },
];

describe('Balinese Pawukon calendar spec', () => {
  it ('should convert a Julian day to a Balinese Pawukon date', () => {
    dates.forEach(({ rataDie, date }) => {
      const jdn = rataDie + J0000;
      const expected = { jdn, ...date };
      const actual = cal.fromJdn (jdn);

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
