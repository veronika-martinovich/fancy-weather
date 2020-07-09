import { openWeatherMapApiKey } from "../../constants/apiKeys";
import { countries } from "../../constants/countries";
import { updateCoordAvailability } from "../location/locationActions";
import { clearWeatherData } from "../../utilities/weather_functions/clearWeatherData";
import { getSeason } from "../../utilities/weather_functions/getSeason";
import { getTimeOfDay } from "../../utilities/weather_functions/getTimeOfDay";
import { translateText } from "../../utilities/translation_functions/translateText";
import {
  updateCoords,
  updateLocationData,
  updateLocationName,
  updateLocationCountry,
  updateLocationWeatherDescription,
} from "../location/locationActions";
import { updateLocalTimezone } from "../app/appActions";
import { getBgImage } from "../bgImage/bgImageActions";

export function updateWeatherData(weather) {
  return { type: "UPDATE_WEATHER_DATA", weather };
}

export function updateForecastAvailability(availability) {
  return { type: "UPDATE_FORECAST_AVAILABILITY", availability };
}

export function getWeatherByCoords(lat, lon, langTo) {
  return async function (dispatch) {
    try {
      dispatch(updateCoordAvailability(true));
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${openWeatherMapApiKey}`
      );
      const weather = await response.json();
      const clearedWeatherData = clearWeatherData(weather.list);
      const cityTranslation = await translateText(
        weather.city.name,
        "en",
        langTo
      );
      const countryTranslation = await translateText(
        countries[weather.city.country],
        "en",
        langTo
      );
      const weatherDescriptionTranslation = await translateText(
        clearedWeatherData[0].weather[0].description,
        "en",
        langTo
      );
      console.log(clearedWeatherData);
      dispatch(updateLocationData(weather.city));
      dispatch(updateWeatherData(clearedWeatherData));
      dispatch(updateLocalTimezone(weather.city.timezone));
      dispatch(updateLocationName(cityTranslation.text[0]));
      dispatch(updateLocationCountry(countryTranslation.text[0]));
      dispatch(
        updateLocationWeatherDescription(weatherDescriptionTranslation.text[0])
      );
    } catch (err) {
      console.log("Something went wrong");
      dispatch(updateCoordAvailability(false));
    }
  };
}

export function getWeatherByCityName(name, langFrom, langTo) {
  return async function (dispatch) {
    try {
      console.log(name);
      dispatch(updateForecastAvailability(true));
      const translationForWeather = await translateText(name, langFrom, langTo);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${translationForWeather.text[0]}&appid=${openWeatherMapApiKey}`
      );
      const weather = await response.json();
      const clearedWeatherData = clearWeatherData(weather.list);
      const cityTranslation = await translateText(
        weather.city.name,
        langTo,
        langFrom
      );
      const countryTranslation = await translateText(
        countries[weather.city.country],
        langTo,
        langFrom
      );
      const weatherDescriptionTranslation = await translateText(
        clearedWeatherData[0].weather[0].description,
        langTo,
        langFrom
      );

      dispatch(updateLocationData(weather.city));
      dispatch(updateWeatherData(clearedWeatherData));
      dispatch(updateLocationName(cityTranslation.text[0]));
      dispatch(updateLocationCountry(countryTranslation.text[0]));
      dispatch(
        updateLocationWeatherDescription(weatherDescriptionTranslation.text[0])
      );
      dispatch(updateCoords(weather.city.coord.lat, weather.city.coord.lon));
      dispatch(
        getBgImage(
          clearedWeatherData[0].weather[0].main,
          getSeason(clearedWeatherData[0].dt_txt),
          getTimeOfDay(clearedWeatherData[0].dt_txt)
        )
      );
    } catch (err) {
      console.log("Wrong city name");
      dispatch(updateForecastAvailability(false));
    }
  };
}
