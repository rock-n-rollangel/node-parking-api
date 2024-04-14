export class TimeHelper {
  private seconds: number;
  private time: string;
  public static readonly regex: RegExp = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  private readonly maxSeconds: number = 24 * 3600 - 1;

  constructor(time: number | string) {
    if (typeof time === 'number' && time <= this.maxSeconds) {
      this.seconds = time;
    } else if (typeof time === 'string' && TimeHelper.regex.test(time)) {
      this.time = time;
    } else {
      throw new Error(
        'TimeHelper: Not compatible time format or over seconds limit',
      );
    }
  }

  getHumanReadable(): string {
    if (this.time) return this.time;

    const hours = Math.floor(this.seconds / 3600);
    const minutes = Math.floor((this.seconds / 60) % 60);

    return this.formatHumanReadable(hours, minutes);
  }

  getDatabaseTime(): number {
    if (this.seconds) return this.seconds;

    const [hours, minutes] = this.time.split(':');

    return Number(hours) * 3600 + Number(minutes) * 60;
  }

  private formatHumanReadable(hours: number, minutes: number): string {
    const paddedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${paddedHours}:${paddedMinutes}`;
  }

  static getSecondsFromTime(time: string): number {
    return new TimeHelper(time).getDatabaseTime();
  }
}
