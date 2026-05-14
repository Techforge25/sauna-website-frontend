export type CalendarDay = {
  date: string;
  day: number;
  isAvailable: boolean;
};

export const weekdays = ["Mon", "Tue", "Wed", "Thus", "Fri", "Sat", "Sun"];

export const defaultSelectedDate = "2026-05-12";

export const calendarDays: CalendarDay[] = [
  { date: "2026-05-01", day: 1, isAvailable: false },
  { date: "2026-05-02", day: 2, isAvailable: true },
  { date: "2026-05-03", day: 3, isAvailable: false },
  { date: "2026-05-04", day: 4, isAvailable: false },
  { date: "2026-05-05", day: 5, isAvailable: true },
  { date: "2026-05-06", day: 6, isAvailable: true },
  { date: "2026-05-07", day: 7, isAvailable: true },
  { date: "2026-05-08", day: 8, isAvailable: false },
  { date: "2026-05-09", day: 9, isAvailable: true },
  { date: "2026-05-10", day: 10, isAvailable: true },
  { date: "2026-05-11", day: 11, isAvailable: true },
  { date: "2026-05-12", day: 12, isAvailable: true },
  { date: "2026-05-13", day: 13, isAvailable: false },
  { date: "2026-05-14", day: 14, isAvailable: false },
  { date: "2026-05-15", day: 15, isAvailable: false },
  { date: "2026-05-16", day: 16, isAvailable: false },
  { date: "2026-05-17", day: 17, isAvailable: false },
  { date: "2026-05-18", day: 18, isAvailable: true },
  { date: "2026-05-19", day: 19, isAvailable: true },
  { date: "2026-05-20", day: 20, isAvailable: true },
  { date: "2026-05-21", day: 21, isAvailable: false },
  { date: "2026-05-22", day: 22, isAvailable: true },
  { date: "2026-05-23", day: 23, isAvailable: false },
  { date: "2026-05-24", day: 24, isAvailable: true },
  { date: "2026-05-25", day: 25, isAvailable: false },
  { date: "2026-05-26", day: 26, isAvailable: true },
  { date: "2026-05-27", day: 27, isAvailable: false },
  { date: "2026-05-28", day: 28, isAvailable: true },
  { date: "2026-05-29", day: 29, isAvailable: false },
  { date: "2026-05-30", day: 30, isAvailable: true },
  { date: "2026-05-31", day: 31, isAvailable: true },
];

export function formatSlashDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}
