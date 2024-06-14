export function getFormattedDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${date.getFullYear()}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`
}