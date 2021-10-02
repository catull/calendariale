import { BaseDate } from './core/BaseDate';

export class MayanCountDate extends BaseDate {
  constructor(
    jdn: number,
    private baktun: number,
    private katun: number,
    private tun: number,
    private uinal: number,
    private kin: number,
  ) {
    super(jdn);
  }

  public getBaktun(): number {
    return this.baktun;
  }

  public getKatun(): number {
    return this.katun;
  }

  public getTun(): number {
    return this.tun;
  }

  public getUinal(): number {
    return this.uinal;
  }

  public getKin(): number {
    return this.kin;
  }
}
