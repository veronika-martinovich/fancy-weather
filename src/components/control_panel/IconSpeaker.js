import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getForecastPitch } from "../../utilities/weather_functions/getForecastPitch";
import { convertToCelsius } from "../../utilities/degree_functions/convertToCelsius";
import { convertToFahrenheit } from "../../utilities/degree_functions/convertToFahrenheit";
import { synthesis } from "../../constants/SpeechSynthesis";
import { selectorApp } from "../../reducers/app/appReducer";
import { selectorWeather } from "../../reducers/weather/weatherReducer";
import { selectorLocation } from "../../reducers/location/locationReducer";

export const IconSpeaker = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { language, degreeScale } = useSelector(selectorApp);
  const { weatherData } = useSelector(selectorWeather);
  const {
    locationName,
    locationCountry,
    locationWeatherDescription,
  } = useSelector(selectorLocation);

  const handleSpeak = () => {
    if (weatherData) {
      let degrees = weatherData[0].main.temp;
      if (degreeScale === "C") {
        degrees = convertToCelsius(weatherData[0].main.temp);
      } else {
        degrees = convertToFahrenheit(weatherData[0].main.temp);
      }
      const pitch = getForecastPitch(
        language,
        locationName,
        locationCountry,
        degrees,
        locationWeatherDescription,
        weatherData[0].wind.speed,
        weatherData[0].main.humidity
      );
      const utterThis = new SpeechSynthesisUtterance(pitch);
      utterThis.lang = language;
      if (isSpeaking) {
        synthesis.speak(utterThis);
        utterThis.onend = () => {
          setIsSpeaking(!isSpeaking);
        };
      } else {
        synthesis.cancel(utterThis);
      }
    }
  };

  const handleClick = () => {
    setIsSpeaking(!isSpeaking);
  };

  useEffect(() => {
    handleSpeak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpeaking]);

  return (
    <span className="icon icon_weather-player" onClick={handleClick}>
      <span
        className={
          isSpeaking ? "icon icon_speaker icon_speaking" : "icon icon_speaker"
        }
      ></span>
    </span>
  );
};
