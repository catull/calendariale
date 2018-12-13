import { mod } from '../Astro';
import { INVALID_BAKTUN, INVALID_KATUN, INVALID_KIN, INVALID_TUN, INVALID_UINAL, mayan } from '../Const';

import { BaseCalendarDate, CalendarDateValidationException } from './core';

export class MayanCountCalendarDate extends BaseCalendarDate {
  // Determine Julian day number from Mayan Count calendar date
  public static toJdn(baktun: number, katun: number, tun: number, uinal: number, kin: number): number {
    this.validate(baktun, katun, tun, uinal, kin);

    return mayan.EPOCH + baktun * 144000 + katun * 7200 + tun * 360 + uinal * 20 + kin;
  }

  public static validate(baktun: number, katun: number, tun: number, uinal: number, kin: number): void {
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

  // Calculate Mayan Count calendar date from Julian day
  public static fromJdn(jdn: number): MayanCountCalendarDate {
    let d: number = Math.floor(jdn) + 0.5 - mayan.EPOCH;
    const baktun: number = Math.floor(d / 144000);
    d = mod(d, 144000);
    const katun: number = Math.floor(d / 7200);
    d = mod(d, 7200);
    const tun: number = Math.floor(d / 360);
    d = mod(d, 360);
    const uinal: number = Math.floor(d / 20);
    const kin: number = mod(d, 20);

    return new MayanCountCalendarDate(jdn, baktun, katun, tun, uinal, kin);
  }

  constructor(jdn: number, private baktun: number, private katun: number, private tun: number, private uinal: number, private kin: number) {
    super(jdn);
  }

  public getBaktun (): number {
    return this.baktun;
  }

  public getKatun (): number {
    return this.katun;
  }

  public getTun (): number {
    return this.tun;
  }

  public getUinal (): number {
    return this.uinal;
  }

  public getKin (): number {
    return this.kin;
  }
}
