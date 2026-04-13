/* eslint-disable @typescript-eslint/no-explicit-any */

export function isBeforeToday(date: string) {
  const [day, month, year] = date.split("/").map(Number);
  const d = new Date(year, month - 1, day); // month - 1 car janvier = 0

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);

  return d < today;
}

export function isAfterToday(date: string) {
  const [day, month, year] = date.split("/").map(Number);
  const d = new Date(year, month - 1, day); // month - 1 car janvier = 0

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);

  return d >= today;
}
