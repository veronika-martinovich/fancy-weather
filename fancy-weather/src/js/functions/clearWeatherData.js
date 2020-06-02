export function clearWeatherData(array) {
  let clearedWeatherData = [];
  const currentDate = Number(array[0].dt_txt.slice(8,10));
  array.forEach((item, index) => {
    const futureDate = Number(item.dt_txt.slice(8,10));
    const futureHours = Number(item.dt_txt.slice(11,13));
    
    if (index === 0) {
      clearedWeatherData.push(item);
    }
    if (futureDate > currentDate && futureHours === 15) {
      clearedWeatherData.push(item);
    }
  });
  return clearedWeatherData;
}
