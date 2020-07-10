import { openWeatherMapApiKey } from "../../constants/apiKeys";
import { countries } from "../../constants/countries";
import { actionUpdateCoordAvailability } from "../location/locationActions";
import { clearWeatherData } from "../../utilities/weather_functions/clearWeatherData";
import { getSeason } from "../../utilities/weather_functions/getSeason";
import { getTimeOfDay } from "../../utilities/weather_functions/getTimeOfDay";
import { translateText } from "../../utilities/translation_functions/translateText";
import {
  actionUpdateCoords,
  actionUpdateLocationData,
  actionUpdateLocationName,
  actionUpdateLocationCountry,
  actionUpdateLocationWeatherDescription,
} from "../location/locationActions";
import { actionUpdateLocalTimezone } from "../app/appActions";
import { actionGetBgImage } from "../bgImage/bgImageActions";

export function actionUpdateWeatherData(weather) {
  return { type: "UPDATE_WEATHER_DATA", weather };
}

export function actionUpdateForecastAvailability(availability) {
  return { type: "UPDATE_FORECAST_AVAILABILITY", availability };
}

export function actionGetWeatherByCoords(lat, lon, langTo) {
  return async function (dispatch) {
    try {
      dispatch(actionUpdateCoordAvailability(true));
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
      dispatch(actionUpdateLocationData(weather.city));
      dispatch(actionUpdateWeatherData(clearedWeatherData));
      dispatch(actionUpdateLocalTimezone(weather.city.timezone));
      dispatch(actionUpdateLocationName(cityTranslation.text[0]));
      dispatch(actionUpdateLocationCountry(countryTranslation.text[0]));
      dispatch(
        actionUpdateLocationWeatherDescription(weatherDescriptionTranslation.text[0])
      );
    } catch (err) {
      console.log("Something went wrong");
      dispatch(actionUpdateCoordAvailability(false));
    }
  };
}

export function actionGetWeatherByCityName(name, langFrom, langTo) {
  return async function (dispatch) {
    try {
      console.log(name);
      dispatch(actionUpdateForecastAvailability(true));
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

      dispatch(actionUpdateLocationData(weather.city));
      dispatch(actionUpdateWeatherData(clearedWeatherData));
      dispatch(actionUpdateLocationName(cityTranslation.text[0]));
      dispatch(actionUpdateLocationCountry(countryTranslation.text[0]));
      dispatch(
        actionUpdateLocationWeatherDescription(weatherDescriptionTranslation.text[0])
      );
      dispatch(actionUpdateCoords(weather.city.coord.lat, weather.city.coord.lon));
      dispatch(
        actionGetBgImage(
          clearedWeatherData[0].weather[0].main,
          getSeason(clearedWeatherData[0].dt_txt),
          getTimeOfDay(clearedWeatherData[0].dt_txt)
        )
      );
    } catch (err) {
      console.log("Wrong city name");
      dispatch(actionUpdateForecastAvailability(false));
    }
  };
}
