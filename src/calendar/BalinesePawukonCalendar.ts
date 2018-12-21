import { amod, mod } from '../Astro';
import { balinese } from '../Const';

import { BalinesePawukonDate } from './BalinesePawukonDate';
import { BaseCalendar } from './BaseCalendar';

export class BalinesePawukonCalendar extends BaseCalendar {
  public static jdnToBalineseDayCount(jdn: number): number {
    return mod(jdn - balinese.EPOCH, 210);
  }

  // Calculate Balinese calendar date from Julian day
  public static fromJdn(jdn: number): BalinesePawukonDate {
    const count: number = this.jdnToBalineseDayCount(jdn);
    const triwara: number = mod(count, 3) + 1;
    const pancawara: number = amod(count + 2, 5);
    const sadwara: number = mod(count, 6) + 1;
    const saptawara: number = mod(count, 7) + 1;
    const asatawara: number = mod(Math.max(6, 4 + mod(count - 70, 210)), 8) + 1;
    const caturwara: number = amod(asatawara, 4);
    const sangawara: number = mod(Math.max(0, count - 3), 9) + 1;

    const i: number = pancawara - 1;
    const j: number = saptawara - 1;
    const sum: number = 1 + [5, 9, 7, 4, 8][i] + [5, 4, 3, 7, 8, 6, 9][j];

    const dasawara: number = mod(sum, 10);
    const luang: boolean = mod(dasawara, 2) === 0;
    const dwiwara: number = amod(dasawara, 2);

    return new BalinesePawukonDate(
      jdn, luang, dwiwara, triwara, caturwara, pancawara,
      sadwara, saptawara, asatawara, sangawara, dasawara);
  }

}
