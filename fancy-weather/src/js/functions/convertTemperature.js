export function convertTemperature(tempInFahrenheit) {
  const tempInCelsius = Math.round(tempInFahrenheit - 273.15);
  return tempInCelsius;
}