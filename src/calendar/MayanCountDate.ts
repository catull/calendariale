import { BaseDate } from './core/index';

export class MayanCountDate extends BaseDate {
  constructor(
    jdn: number,
    private readonly baktun: number,
    private readonly katun: number,
    private readonly tun: number,
    private readonly uinal: number,
    private readonly kin: number,
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
