export class Location {
  constructor (
    private latitude: number,
    private longitude: number,
    private elevation: number,
    private zone: number) {
  }

  getLatitude () : number {
    return this.latitude;
  }

  getLongitude () : number {
    return this.longitude;
  }

  getElevation () : number {
    return this.elevation;
  }

  getZone () : number {
    return this.zone;
  }
}
