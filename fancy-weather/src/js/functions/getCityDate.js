export function getCityDate(offset) {
  const localDate = new Date();
  console.log(localDate.getTimezoneOffset())
  const utcTime = localDate.getTime() + (localDate.getTimezoneOffset() * 60000);
  const cityDate = new Date(utcTime + (3600000 * offset));
  return cityDate;
}