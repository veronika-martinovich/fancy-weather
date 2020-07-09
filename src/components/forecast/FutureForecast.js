import React from "react";
import { useSelector } from "react-redux";
import { convertToCelsius } from "../../utilities/degree_functions/convertToCelsius";
import { convertToFahrenheit } from "../../utilities/degree_functions/convertToFahrenheit";
import { dictionary } from "../../constants/dictionary";
import { selectorApp } from "../../reducers/app/appReducer";
import { selectorWeather } from "../../reducers/weather/weatherReducer";

export const FutureForecast = () => {
  const { language, degreeScale } = useSelector(selectorApp);
  const { weatherData } = useSelector(selectorWeather);

  const getWeekDay = (shift) => {
    let someDate = new Date();
    someDate.setDate(someDate.getDate() + shift);
    return someDate.getDay();
  };

  if (!weatherData) return null;
  return (
    <div className="future-forecast">
      {weatherData.reduce((acc, item, index) => {
        if (index > 0 && index < 4) {
          return acc.concat(
            <div className="future-forecast__day" key={index}>
              <p className="future-forecast__week-day">
                {dictionary[language].days[getWeekDay(index)]}
              </p>
              <div className="future-forecast__weather-container">
                <div className="future-forecast__degrees">
                  {degreeScale === "C"
                    ? convertToCelsius(item.main.temp)
                    : convertToFahrenheit(item.main.temp)}
                </div>
                <span className="future-forecast__degrees-sign">°</span>
                <span
                  className="future-forecast__weather-icon"
                  alt="weather icon"
                  style={{
                    backgroundImage: `url(http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png)`,
                  }}
                ></span>
              </div>
            </div>
          );
        }
        return acc;
      }, [])}
    </div>
  );
};
