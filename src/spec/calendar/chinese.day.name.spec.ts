/* global describe it: true */
import { J0000 } from '../../Const';

import { ChineseDayNameCalendar as cal } from '../../calendar/ChineseDayNameCalendar';

const data4 = [
  { 'rataDie': -214193, 'chineseDayName': { 'stem':  2, 'branch': 10 } },
  { 'rataDie':  -61387, 'chineseDayName': { 'stem':  8, 'branch':  8 } },
  { 'rataDie':   25469, 'chineseDayName': { 'stem':  4, 'branch':  8 } },
  { 'rataDie':   49217, 'chineseDayName': { 'stem':  2, 'branch':  8 } },
  { 'rataDie':  171307, 'chineseDayName': { 'stem':  2, 'branch': 10 } },
  { 'rataDie':  210155, 'chineseDayName': { 'stem': 10, 'branch':  2 } },
  { 'rataDie':  253427, 'chineseDayName': { 'stem':  2, 'branch':  2 } },
  { 'rataDie':  369740, 'chineseDayName': { 'stem':  5, 'branch': 11 } },
  { 'rataDie':  400085, 'chineseDayName': { 'stem': 10, 'branch':  8 } },
  { 'rataDie':  434355, 'chineseDayName': { 'stem': 10, 'branch':  6 } },
  { 'rataDie':  452605, 'chineseDayName': { 'stem': 10, 'branch':  4 } },
  { 'rataDie':  470160, 'chineseDayName': { 'stem':  5, 'branch':  3 } },
  { 'rataDie':  473837, 'chineseDayName': { 'stem':  2, 'branch':  8 } },
  { 'rataDie':  507850, 'chineseDayName': { 'stem':  5, 'branch':  1 } },
  { 'rataDie':  524156, 'chineseDayName': { 'stem':  1, 'branch': 11 } },
  { 'rataDie':  544676, 'chineseDayName': { 'stem':  1, 'branch': 11 } },
  { 'rataDie':  567118, 'chineseDayName': { 'stem':  3, 'branch':  1 } },
  { 'rataDie':  569477, 'chineseDayName': { 'stem':  2, 'branch':  8 } },
  { 'rataDie':  601716, 'chineseDayName': { 'stem':  1, 'branch':  3 } },
  { 'rataDie':  613424, 'chineseDayName': { 'stem':  9, 'branch': 11 } },
  { 'rataDie':  626596, 'chineseDayName': { 'stem':  1, 'branch':  7 } },
  { 'rataDie':  645554, 'chineseDayName': { 'stem':  9, 'branch':  5 } },
  { 'rataDie':  664224, 'chineseDayName': { 'stem':  9, 'branch':  3 } },
  { 'rataDie':  671401, 'chineseDayName': { 'stem':  6, 'branch':  4 } },
  { 'rataDie':  694799, 'chineseDayName': { 'stem':  4, 'branch':  2 } },
  { 'rataDie':  704424, 'chineseDayName': { 'stem':  9, 'branch':  3 } },
  { 'rataDie':  708842, 'chineseDayName': { 'stem':  7, 'branch':  5 } },
  { 'rataDie':  709409, 'chineseDayName': { 'stem':  4, 'branch':  8 } },
  { 'rataDie':  709580, 'chineseDayName': { 'stem':  5, 'branch': 11 } },
  { 'rataDie':  727274, 'chineseDayName': { 'stem':  9, 'branch':  5 } },
  { 'rataDie':  728714, 'chineseDayName': { 'stem':  9, 'branch':  5 } },
  { 'rataDie':  744313, 'chineseDayName': { 'stem':  8, 'branch':  4 } },
  { 'rataDie':  764652, 'chineseDayName': { 'stem':  7, 'branch':  3 } }
];

describe ('Chinese Day Name calendar spec', () => {
  let date;
  let expected;
  let actual;
  let julian;

  it ('should convert a Julian day number to a Chinese Day Name date', () => {
    data4.forEach (dt => {
      julian   = dt.rataDie + J0000;
      date     = dt.chineseDayName;
      expected = { jdn: julian, stem: date.stem, branch: date.branch };
      actual   = cal.fromJdn (julian);

      expect (expected).toEqual (actual);
      expect (expected.stem).toBe (actual.getStem());
      expect (expected.branch).toBe (actual.getBranch());
    });
  });
});
