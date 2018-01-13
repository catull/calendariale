import { amod, mod } from '../Astro';
import { aztec } from '../Const';
import { BaseCalendar } from '../Calendar';

export class AztecTonalpohualliCalendar extends BaseCalendar {
  // Calculate Aztec Tonalpohualli calendar date from Julian day
  public static fromJdn(jdn: number): AztecTonalpohualliCalendar {
    const count: number = jdn - aztec.TONALPOHUALLI_CORRELATION + 1;
    const num: number = amod(count, 13);
    const name: number = amod(count, 20);

    return new AztecTonalpohualliCalendar(jdn, num, name);
  }

  // Return the number of elapsed days into cycle of Aztec Tonalpohualli date.
  public static toOrdinal(num: number, name: number): number {
    return mod(num - 1 + 39 * (num - name), 260);
  }

  // Return Julian day number of latest date on or before an Aztec Tonalpohualli date
  public static onOrBefore(num: number, name: number, jdn: number): number {
    return jdn - mod(jdn - aztec.TONALPOHUALLI_CORRELATION - this.toOrdinal(num, name), 260);
  }

  constructor(jdn: number, private num: number, private name: number) {
    super(jdn);
  }

  public getNumber (): number {
    return this.num;
  }

  public getName (): number {
    return this.name;
  }
}
