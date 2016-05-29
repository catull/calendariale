import { mod } from '../Astro';
import { mayan } from '../Const';
import { BaseCalendar } from '../Calendar';

export class MayanCountCalendar extends BaseCalendar {
  constructor (jdn: number, private baktun: number, private katun: number, private tun: number, private uinal: number, private kin: number) {
    super (jdn);
  }

  // Determine JUlian day number from Mayan Count calendar date
  public static toJdn (baktun: number, katun: number, tun: number, uinal: number, kin: number): number {
    return mayan.EPOCH +
      baktun * 144000 +
      katun * 7200 +
      tun * 360 +
      uinal * 20 +
      kin;
  }

  // Calculate Mayan Count calendar date from Julian day
  public static fromJdn (jdn: number) {
    let d0, baktun, katun, tun, uinal, kin;

    d0     = Math.floor (jdn) + 0.5 - mayan.EPOCH;
    baktun = Math.floor (d0 / 144000);
    d0     = mod (d0, 144000);
    katun  = Math.floor (d0 / 7200);
    d0     = mod (d0, 7200);
    tun    = Math.floor (d0 / 360);
    d0     = mod (d0, 360);
    uinal  = Math.floor (d0 / 20);
    kin    = mod (d0, 20);

    return new MayanCountCalendar (jdn, baktun, katun, tun, uinal, kin);
  }
}
