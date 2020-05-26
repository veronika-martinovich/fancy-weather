import { translateText } from "../js/functions/translateText";
import { openWeatherMapApiKey } from "../js/API/APIs";
import { clearWeatherData } from "../js/functions/clearWeatherData";

export function changeLanguage(lang) {
  return { type: "CHANGE_LANGUAGE", lang };
}

export function updateLocationData(location) {
  return { type: "UPDATE_LOCATION_DATA", location };
}

export function updateWeatherData(weather) {
  return { type: "UPDATE_WEATHER_DATA", weather };
}

export function updateFirstLocationTimezone(timezone) {
  return { type: "UPDATE_FIRST_LOCATION_TIMEZONE", timezone };
}

export function updateLocationName(name) {
  return { type: "UPDATE_LOCATION_NAME", name };
}

export function updateWeatherDescription(description) {
  return { type: "UPDATE_WEATHER_DESCRIPTION", description };
}

export function translateLocationName(text, lang) {
  return async function (dispatch) {
    const translation = await translateText(text, lang);
    dispatch(updateLocationName(translation.text[0]));
  };
}

export function translateWeatherDescription(text, lang) {
  return async function (dispatch) {
    const translation = await translateText(text, lang);
    dispatch(updateWeatherDescription(translation.text[0]));
  };
}

export function getWeatherByLocation() {
  return function (dispatch) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${openWeatherMapApiKey}`
        );
        const weather = await response.json();
        const clearedWeatherData = clearWeatherData(weather.list);
        console.log(weather, clearedWeatherData);
        dispatch(updateLocationData(weather.city));
        dispatch(updateWeatherData(clearedWeatherData));
        dispatch(updateFirstLocationTimezone(weather.city.timezone));
      },
      (error) => {
        console.log(error);
      }
    );
  };
}
