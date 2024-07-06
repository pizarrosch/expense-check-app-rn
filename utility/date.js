export function getFormattedDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return date.toISOString().slice(0, 10);
  // `${date.getFullYear()}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`
}

export function getLastDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}