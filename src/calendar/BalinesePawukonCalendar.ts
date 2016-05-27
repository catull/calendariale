import { amod, mod } from '../Astro';
import { balinese } from '../Const';
import { Calendar } from '../Calendar';

export class BalinesePawukonCalendar {
  constructor (
      private luang: boolean,
      private dwiwara: number,
      private triwara: number,
      private caturwara: number,
      private pancawara: number,
      private sadwara: number,
      private saptawara: number,
      private asatawara: number,
      private sangawara: number,
      private dasawara: number)
  {
  }

  public static jdnToBalineseDayCount (jdn: number) : number {
    return mod (jdn - balinese.EPOCH, 210);
  }

  // Calculate Balinese calendar date from Julian day
  public static fromJdn (jdn: number) : BalinesePawukonCalendar {
    const count     = this.jdnToBalineseDayCount (jdn);
    const triwara   = mod (count, 3) + 1;
    const pancawara = amod (count + 2, 5);
    const sadwara   = mod (count, 6) + 1;
    const saptawara = mod (count, 7) + 1;
    const asatawara = mod (Math.max (6, 4 + mod (count - 70, 210)), 8) + 1;
    const caturwara = amod (asatawara, 4);
    const sangawara = mod (Math.max (0, count - 3), 9) + 1;

    let i = pancawara - 1;
    let j = saptawara - 1;
    let sum = 1 + [ 5, 9, 7, 4, 8 ][i] + [ 5, 4, 3, 7, 8, 6, 9 ][j];
    const dasawara  = mod (sum, 10);
    const luang     = mod (dasawara, 2) === 0;
    const dwiwara   = amod (dasawara, 2);

    return new BalinesePawukonCalendar (
        luang, dwiwara, triwara, caturwara, pancawara,
        sadwara, saptawara, asatawara, sangawara, dasawara);
  }
}
