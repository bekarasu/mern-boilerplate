export const compareFromNow = (date: Date, dateAsDay: number) => new Date(date).setDate(new Date().getDate() + dateAsDay) < Date.now();
