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

export function updateCoords(lat, lon) {
  return { type: "UPDATE_COORDS", lat, lon };
}

export function translateLocationName(text, langPrev, langCurr) {
  return async function (dispatch) {
    const translation = await translateText(text, langPrev, langCurr);
    dispatch(updateLocationName(translation.text[0]));
  };
}

export function translateWeatherDescription(text, langPrev, langCurr) {
  return async function (dispatch) {
    const translation = await translateText(text, langPrev, langCurr);
    dispatch(updateWeatherDescription(translation.text[0]));
  };
}

export function getCoords() {
  return function(dispatch){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(updateCoords(position.coords.latitude, position.coords.longitude));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

export function getWeatherByCoords(lat, lon) {
  return async function (dispatch) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${openWeatherMapApiKey}`
    );
    const weather = await response.json();
    const clearedWeatherData = clearWeatherData(weather.list);
    console.log(weather, clearedWeatherData);
    dispatch(updateLocationData(weather.city));
    dispatch(updateWeatherData(clearedWeatherData));
    dispatch(updateFirstLocationTimezone(weather.city.timezone));
  };
}
