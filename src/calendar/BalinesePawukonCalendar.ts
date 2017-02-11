import { amod, mod } from '../Astro';
import { balinese } from '../Const';
import { BaseCalendar } from '../Calendar';

export class BalinesePawukonCalendar extends BaseCalendar {
  constructor(
    jdn: number,
    private luang: boolean,
    private dwiwara: number,
    private triwara: number,
    private caturwara: number,
    private pancawara: number,
    private sadwara: number,
    private saptawara: number,
    private asatawara: number,
    private sangawara: number,
    private dasawara: number) {
    super(jdn);
  }

  isLuag (): boolean {
    return this.luang;
  }

  getDwiwara (): number {
    return this.dwiwara;
  }

  getTriwara (): number {
    return this.triwara;
  }

  getCaturwara (): number {
    return this.caturwara;
  }

  getPancawara (): number {
    return this.pancawara;
  }

  getSadwara (): number {
    return this.sadwara;
  }

  getSaptawara (): number {
    return this.saptawara;
  }

  getAsatawara (): number {
    return this.asatawara;
  }

  getSangawara (): number {
    return this.sangawara;
  }

  getDasawara (): number {
    return this.dasawara;
  }

  public static jdnToBalineseDayCount(jdn: number): number {
    return mod(jdn - balinese.EPOCH, 210);
  }

  // Calculate Balinese calendar date from Julian day
  public static fromJdn(jdn: number): BalinesePawukonCalendar {
    const count: number = this.jdnToBalineseDayCount(jdn);
    const triwara: number = mod(count, 3) + 1;
    const pancawara: number = amod(count + 2, 5);
    const sadwara: number = mod(count, 6) + 1;
    const saptawara: number = mod(count, 7) + 1;
    const asatawara: number = mod(Math.max(6, 4 + mod(count - 70, 210)), 8) + 1;
    const caturwara: number = amod(asatawara, 4);
    const sangawara: number = mod(Math.max(0, count - 3), 9) + 1;

    let i: number = pancawara - 1;
    let j: number = saptawara - 1;
    let sum: number = 1 + [5, 9, 7, 4, 8][i] + [5, 4, 3, 7, 8, 6, 9][j];

    const dasawara: number = mod(sum, 10);
    const luang: boolean = mod(dasawara, 2) === 0;
    const dwiwara: number = amod(dasawara, 2);

    return new BalinesePawukonCalendar(
      jdn, luang, dwiwara, triwara, caturwara, pancawara,
      sadwara, saptawara, asatawara, sangawara, dasawara);
  }
}
