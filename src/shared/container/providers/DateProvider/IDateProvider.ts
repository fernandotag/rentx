interface IDateProvider {
  compareInHours: (startDate: Date, endDate: Date) => number;
  convertToUTC: (date: Date) => string;
  compareInDays: (startDate: Date, endDate: Date) => number;
  addDays: (days: number) => Date;
}

export type { IDateProvider };
