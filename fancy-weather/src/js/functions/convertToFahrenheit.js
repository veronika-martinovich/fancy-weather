export function convertToFahrenheit(tempInKelvin) {
  const tempInFahrenheit = Math.round((tempInKelvin - 273.15)*9/5 + 32);
  return tempInFahrenheit;
}
