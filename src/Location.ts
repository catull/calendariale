export class Location {
  constructor(
    private latitude: number,
    private longitude: number,
    private elevation: number,
    private zone: number,
  ) {}

  public getLatitude(): number {
    return this.latitude;
  }

  public getLongitude(): number {
    return this.longitude;
  }

  public getElevation(): number {
    return this.elevation;
  }

  public getZone(): number {
    return this.zone;
  }
}
