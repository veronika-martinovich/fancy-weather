export function convertToCelsius(tempInKelvin) {
  const tempInCelsius = Math.round(tempInKelvin - 273.15);
  return tempInCelsius;
}
