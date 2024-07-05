export class Location {
  constructor(
    private readonly latitude: number,
    private readonly longitude: number,
    private readonly elevation: number,
    private readonly zone: number,
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
