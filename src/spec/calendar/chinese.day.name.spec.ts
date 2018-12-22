import { J0000 } from '../../Const';
import { ChineseDayNameCalendar as cal } from '../../calendar/ChineseDayNameCalendar';

const dates = [
  { jdn: -214193 + J0000, date: { stem:  2, branch: 10 } },
  { jdn:  -61387 + J0000, date: { stem:  8, branch:  8 } },
  { jdn:   25469 + J0000, date: { stem:  4, branch:  8 } },
  { jdn:   49217 + J0000, date: { stem:  2, branch:  8 } },
  { jdn:  171307 + J0000, date: { stem:  2, branch: 10 } },
  { jdn:  210155 + J0000, date: { stem: 10, branch:  2 } },
  { jdn:  253427 + J0000, date: { stem:  2, branch:  2 } },
  { jdn:  369740 + J0000, date: { stem:  5, branch: 11 } },
  { jdn:  400085 + J0000, date: { stem: 10, branch:  8 } },
  { jdn:  434355 + J0000, date: { stem: 10, branch:  6 } },
  { jdn:  452605 + J0000, date: { stem: 10, branch:  4 } },
  { jdn:  470160 + J0000, date: { stem:  5, branch:  3 } },
  { jdn:  473837 + J0000, date: { stem:  2, branch:  8 } },
  { jdn:  507850 + J0000, date: { stem:  5, branch:  1 } },
  { jdn:  524156 + J0000, date: { stem:  1, branch: 11 } },
  { jdn:  544676 + J0000, date: { stem:  1, branch: 11 } },
  { jdn:  567118 + J0000, date: { stem:  3, branch:  1 } },
  { jdn:  569477 + J0000, date: { stem:  2, branch:  8 } },
  { jdn:  601716 + J0000, date: { stem:  1, branch:  3 } },
  { jdn:  613424 + J0000, date: { stem:  9, branch: 11 } },
  { jdn:  626596 + J0000, date: { stem:  1, branch:  7 } },
  { jdn:  645554 + J0000, date: { stem:  9, branch:  5 } },
  { jdn:  664224 + J0000, date: { stem:  9, branch:  3 } },
  { jdn:  671401 + J0000, date: { stem:  6, branch:  4 } },
  { jdn:  694799 + J0000, date: { stem:  4, branch:  2 } },
  { jdn:  704424 + J0000, date: { stem:  9, branch:  3 } },
  { jdn:  708842 + J0000, date: { stem:  7, branch:  5 } },
  { jdn:  709409 + J0000, date: { stem:  4, branch:  8 } },
  { jdn:  709580 + J0000, date: { stem:  5, branch: 11 } },
  { jdn:  727274 + J0000, date: { stem:  9, branch:  5 } },
  { jdn:  728714 + J0000, date: { stem:  9, branch:  5 } },
  { jdn:  744313 + J0000, date: { stem:  8, branch:  4 } },
  { jdn:  764652 + J0000, date: { stem:  7, branch:  3 } },
];

describe ('Chinese Day Name calendar spec', () => {
  it ('should convert a Julian day number to a Chinese Day Name date', () => {
    dates.forEach (({ jdn, date }) => {
      const actual   = cal.fromJdn (jdn);
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.stem).toBe (actual.getStem());
      expect (expected.branch).toBe (actual.getBranch());
    });
  });
});
