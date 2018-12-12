export class CalendarValidationException extends Error {
  constructor(public error: string) {
    super(error);
  }
}
