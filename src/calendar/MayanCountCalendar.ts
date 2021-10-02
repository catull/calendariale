import { mod } from '../Astro';
import { INVALID_BAKTUN, INVALID_KATUN, INVALID_KIN, INVALID_TUN, INVALID_UINAL, mayan } from '../Const';

import { MayanCountDate } from './MayanCountDate';
import { CalendarDateValidationException } from './core/CalendarDateValidationException';

export class MayanCountCalendar {
  // Determine Julian day number (JDN) from Mayan Count calendar date
  public static toJdn(baktun: number, katun: number, tun: number, uinal: number, kin: number): number {
    this.validate(baktun, katun, tun, uinal, kin);

    return mayan.EPOCH + baktun * 144000 + katun * 7200 + tun * 360 + uinal * 20 + kin;
  }

  // Calculate Mayan Count calendar date from Julian day number (JDN)
  public static fromJdn(jdn: number): MayanCountDate {
    let d: number = Math.floor(jdn) + 0.5 - mayan.EPOCH;
    const baktun: number = Math.floor(d / 144000);
    d = mod(d, 144000);
    const katun: number = Math.floor(d / 7200);
    d = mod(d, 7200);
    const tun: number = Math.floor(d / 360);
    d = mod(d, 360);
    const uinal: number = Math.floor(d / 20);
    const kin: number = mod(d, 20);

    return new MayanCountDate(jdn, baktun, katun, tun, uinal, kin);
  }

  private static validate(baktun: number, katun: number, tun: number, uinal: number, kin: number): void {
    if (baktun < 0) {
      throw new CalendarDateValidationException(INVALID_BAKTUN);
    }

    if (kin < 0 || kin > 19) {
      throw new CalendarDateValidationException(INVALID_KIN);
    }

    if (uinal < 0 || uinal > 17) {
      throw new CalendarDateValidationException(INVALID_UINAL);
    }

    if (tun < 0 || tun > 19) {
      throw new CalendarDateValidationException(INVALID_TUN);
    }

    if (katun < 0 || katun > 19) {
      throw new CalendarDateValidationException(INVALID_KATUN);
    }
  }
}
