import { ChineseDayNameCalendar as cal } from '../../calendar/ChineseDayNameCalendar';
import { ChineseDayNameDate } from '../../calendar/ChineseDayNameDate';

const dates = [
  { rataDie: -214193, date: { stem:  2, branch: 10 } },
  { rataDie:  -61387, date: { stem:  8, branch:  8 } },
  { rataDie:   25469, date: { stem:  4, branch:  8 } },
  { rataDie:   49217, date: { stem:  2, branch:  8 } },
  { rataDie:  171307, date: { stem:  2, branch: 10 } },
  { rataDie:  210155, date: { stem: 10, branch:  2 } },
  { rataDie:  253427, date: { stem:  2, branch:  2 } },
  { rataDie:  369740, date: { stem:  5, branch: 11 } },
  { rataDie:  400085, date: { stem: 10, branch:  8 } },
  { rataDie:  434355, date: { stem: 10, branch:  6 } },
  { rataDie:  452605, date: { stem: 10, branch:  4 } },
  { rataDie:  470160, date: { stem:  5, branch:  3 } },
  { rataDie:  473837, date: { stem:  2, branch:  8 } },
  { rataDie:  507850, date: { stem:  5, branch:  1 } },
  { rataDie:  524156, date: { stem:  1, branch: 11 } },
  { rataDie:  544676, date: { stem:  1, branch: 11 } },
  { rataDie:  567118, date: { stem:  3, branch:  1 } },
  { rataDie:  569477, date: { stem:  2, branch:  8 } },
  { rataDie:  601716, date: { stem:  1, branch:  3 } },
  { rataDie:  613424, date: { stem:  9, branch: 11 } },
  { rataDie:  626596, date: { stem:  1, branch:  7 } },
  { rataDie:  645554, date: { stem:  9, branch:  5 } },
  { rataDie:  664224, date: { stem:  9, branch:  3 } },
  { rataDie:  671401, date: { stem:  6, branch:  4 } },
  { rataDie:  694799, date: { stem:  4, branch:  2 } },
  { rataDie:  704424, date: { stem:  9, branch:  3 } },
  { rataDie:  708842, date: { stem:  7, branch:  5 } },
  { rataDie:  709409, date: { stem:  4, branch:  8 } },
  { rataDie:  709580, date: { stem:  5, branch: 11 } },
  { rataDie:  727274, date: { stem:  9, branch:  5 } },
  { rataDie:  728714, date: { stem:  9, branch:  5 } },
  { rataDie:  744313, date: { stem:  8, branch:  4 } },
  { rataDie:  764652, date: { stem:  7, branch:  3 } },
];

describe ('Chinese Day Name calendar spec', () => {
  it ('should convert a Julian day number to a Chinese Day Name date', () => {
    dates.forEach (({ rataDie, date }) => {
      const actual   = cal.fromRd (rataDie) as ChineseDayNameDate;
      const jdn      = actual.getJdn();
      const expected = { jdn, ...date };

      expect (expected).toEqual (actual);
      expect (expected.stem).toBe (actual.getStem());
      expect (expected.branch).toBe (actual.getBranch());
    });
  });
});
