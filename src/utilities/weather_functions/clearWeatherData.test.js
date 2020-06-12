import { clearWeatherData } from "./clearWeatherData";

describe("clearWeatherData", () => {
  it("should return array", () => {
    const weatherData = [
      {dt_txt: "2020-06-03 09:00:00"},
      {dt_txt: "2020-06-04 15:00:00"},
      {dt_txt: "2020-06-05 18:00:00"},
      {dt_txt: "2020-06-06 21:00:00"},
      {dt_txt: "2020-06-07 15:00:00"}
    ];
    const clearedWeatherData = clearWeatherData(weatherData);
    expect(clearedWeatherData).toBeInstanceOf(Array);
    expect(clearedWeatherData).toHaveLength(3);
  })
});
