import { amod, mod } from '../Astro';
import { aztec } from '../Const';
import { Calendar } from '../Calendar';

export class AztecTonalpohualliCalendar {
  constructor (private number: number, private name: number) {
  }

  // Calculate Aztec Tonalpohualli calendar date from Julian day
  public static fromJdn (jdn: number) : AztecTonalpohualliCalendar {
    const count  = jdn - aztec.TONALPOHUALLI_CORRELATION + 1;
    const number = amod (count, 13);
    const name   = amod (count, 20);

    return new AztecTonalpohualliCalendar (number, name);
  }

  // Return the number of elapsed days into cycle of Aztec Tonalpohualli date.
  public static toOrdinal (number: number, name: number) : number {
    return mod (number - 1 + 39 * (number - name), 260);
  }

  // Return Julian day number of latest date on or before an Aztec Tonalpohualli date
  public static onOrBefore (number: number, name: number, jdn: number) {
    return jdn - mod (jdn - aztec.TONALPOHUALLI_CORRELATION - this.toOrdinal (number, name), 260);
  }
}
