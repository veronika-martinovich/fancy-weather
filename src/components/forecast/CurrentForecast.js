import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { convertToCelsius } from "../../utilities/degree_functions/convertToCelsius";
import { convertToFahrenheit } from "../../utilities/degree_functions/convertToFahrenheit";
import { dictionary } from "../../constants/dictionary";
import { actionTranslateWeatherDescription } from "../../reducers/location/locationActions";
import { selectorApp } from "../../reducers/app/appReducer";
import { selectorLocation } from "../../reducers/location/locationReducer";
import { selectorWeather } from "../../reducers/weather/weatherReducer";

export const CurrentForecast = () => {
  const { language, previousLanguage, degreeScale } = useSelector(selectorApp);
  const { locationWeatherDescription } = useSelector(selectorLocation);
  const { weatherData } = useSelector(selectorWeather);
  const dispatch = useDispatch();

  useEffect(() => {
    if (language && previousLanguage) {
      dispatch(
        actionTranslateWeatherDescription(
          locationWeatherDescription,
          previousLanguage,
          language
        )
      );
    }
  }, [language, previousLanguage, locationWeatherDescription, dispatch]);

  if (!weatherData) return null;
  return (
    <div className="current-forecast">
      <div className="current-forecast__temperature">
        <div className="current-forecast__degrees">
          {degreeScale === "C"
            ? convertToCelsius(weatherData[0].main.temp)
            : convertToFahrenheit(weatherData[0].main.temp)}
        </div>
        <span className="current-forecast__degrees-sign">°</span>
      </div>
      <div className="current-forecast__indicators">
        <span
          className="current-forecast__weather-icon"
          alt="weather icon"
          style={{
            backgroundImage: `url(http://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png)`,
          }}
        ></span>
        <div className="current-forecast__indicator">
          {locationWeatherDescription}
        </div>
        <div className=" current-forecast__indicator">
          {dictionary[language].feelsLike}:{" "}
          {degreeScale === "C"
            ? convertToCelsius(weatherData[0].main.feels_like)
            : convertToFahrenheit(weatherData[0].main.feels_like)}
          °
        </div>
        <div className="current-forecast__indicator">
          {dictionary[language].wind}: {weatherData[0].wind.speed}{" "}
          <span className="current-forecast__measure-unit">
            {dictionary[language].windSpeed}
          </span>
        </div>
        <div className="current-forecast__indicator">
          {dictionary[language].humidity}: {weatherData[0].main.humidity}%
        </div>
      </div>
    </div>
  );
};
