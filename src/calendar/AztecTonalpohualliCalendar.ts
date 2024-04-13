import { amod, mod } from '../Astro'
import { aztec } from '../Const'

import { AztecTonalpohualliDate } from './AztecTonalpohualliDate'

export class AztecTonalpohualliCalendar {
  // Calculate Aztec Tonalpohualli calendar date from Julian day number (JDN)
  public static fromJdn (jdn: number): AztecTonalpohualliDate {
    const count: number = jdn - aztec.TONALPOHUALLI_CORRELATION + 1
    const num: number = amod(count, 13)
    const name: number = amod(count, 20)

    return new AztecTonalpohualliDate(jdn, num, name)
  }

  // Return the number of elapsed days into cycle of Aztec Tonalpohualli date.
  public static toOrdinal (num: number, name: number): number {
    return mod(num - 1 + 39 * (num - name), 260)
  }

  // Return Julian day number (JDN) of latest date on or before an Aztec Tonalpohualli date
  public static onOrBefore (num: number, name: number, jdn: number): number {
    return jdn - mod(jdn - aztec.TONALPOHUALLI_CORRELATION - this.toOrdinal(num, name), 260)
  }
}
