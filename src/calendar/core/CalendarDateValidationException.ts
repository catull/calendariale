export class CalendarDateValidationException extends Error {
  constructor(public error: string) {
    super(error);
  }
}
