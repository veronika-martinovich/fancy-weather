import { translateText } from "../js/functions/translateText";
import { openWeatherMapApiKey } from "../js/api/apiKeys";
import { client } from "../js/api/apiKeys";
import { clearWeatherData } from "../js/functions/clearWeatherData";
import { getRandomNumber } from "../js/functions/getRandomNumber";
import natureImage from "../image/nature.jpg";

export function changeLanguage(lang) {
  return { type: "CHANGE_LANGUAGE", lang };
}

export function changeDegreeScale(scale) {
  return { type: "CHANGE_DEGREE_SCALE", scale };
}

export function changeBgImage(url) {
  return { type: "CHANGE_BG_IMAGE", url };
}

export function changeBgFetchingFlag(flag) {
  return { type: "CHANGE_BG_FETCHING_FLAG", flag };
}

export function updateLocationData(location) {
  return { type: "UPDATE_LOCATION_DATA", location };
}

export function updateWeatherData(weather) {
  return { type: "UPDATE_WEATHER_DATA", weather };
}

export function updateForecastAvailability(availability) {
  return { type: "UPDATE_FORECAST_AVAILABILITY", availability };
}

export function updateFirstLocationTimezone(timezone) {
  return { type: "UPDATE_FIRST_LOCATION_TIMEZONE", timezone };
}

export function updateLocationName(name) {
  return { type: "UPDATE_LOCATION_NAME", name };
}

export function updateLocationCountry(country) {
  return { type: "UPDATE_LOCATION_COUNTRY", country };
}

export function updateWeatherDescription(description) {
  return { type: "UPDATE_WEATHER_DESCRIPTION", description };
}

export function updateCoords(lat, lon) {
  return { type: "UPDATE_COORDS", lat, lon };
}

export function updateSearchQuery(query) {
  return { type: "UPDATE_SEARCH_QUERY", query };
}

export function translateLocationName(text, langFrom, langTo) {
  return async function (dispatch) {
    const translation = await translateText(text, langFrom, langTo);
    dispatch(updateLocationName(translation.text[0]));
  };
}

/* export function translateLocationCountry(text, langPrev, langCurr) {
  return async function (dispatch) {
    const translation = await translateText(text, langPrev, langCurr);
    dispatch(updateLocationCountry(translation.text[0]));
  };
} */

export function translateWeatherDescription(text, langFrom, langTo) {
  return async function (dispatch) {
    const translation = await translateText(text, langFrom, langTo);
    dispatch(updateWeatherDescription(translation.text[0]));
  };
}

export function getCoords() {
  return function (dispatch) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          updateCoords(position.coords.latitude, position.coords.longitude)
        );
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

export function getWeatherByCoords(lat, lon) {
  return async function (dispatch) {
    try{
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${openWeatherMapApiKey}`
      );
      const weather = await response.json();
      const clearedWeatherData = clearWeatherData(weather.list);
      console.log(weather, clearedWeatherData);
      dispatch(updateLocationData(weather.city));
      dispatch(updateWeatherData(clearedWeatherData));
      dispatch(updateFirstLocationTimezone(weather.city.timezone));
      dispatch(updateForecastAvailability(true));
    }catch(err) {
      console.log('Something went wrong');
      dispatch(updateForecastAvailability(false));
    }
  };
}

export function getWeatherByCityName(name, langFrom, langTo) {
  return async function (dispatch) {
    try{
      const translationForWeather = await translateText(name, langFrom, langTo);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${translationForWeather.text[0]}&appid=${openWeatherMapApiKey}`
      );
      console.log('city name')
      const weather = await response.json();
      const clearedWeatherData = clearWeatherData(weather.list);
      const cityTranslation = await translateText(weather.city.name, langTo, langFrom);
      const weatherDescriptionTranslation = await translateText(clearedWeatherData[0].weather[0].description, langTo, langFrom); 
      console.log(weather, clearedWeatherData);
      dispatch(updateLocationData(weather.city));
      dispatch(updateWeatherData(clearedWeatherData));
      dispatch(updateForecastAvailability(true));
      dispatch(updateLocationName(cityTranslation.text[0]));
      dispatch(updateWeatherDescription(weatherDescriptionTranslation.text[0]));
      dispatch(updateCoords(weather.city.coord.lat, weather.city.coord.lon));
    }catch(err) {
      console.log('Wrong city name');
      dispatch(updateForecastAvailability(false));
    }
  };
}

export function getBgImage(query) {
  return async function (dispatch) {
    try{
      dispatch(changeBgFetchingFlag(true));
      const page = getRandomNumber(1, 1000);
      const photos = await client.photos.search({
        query,
        page: page,
        per_page: 1,
      });
      dispatch(changeBgImage(photos.photos[0].src.original));
      dispatch(changeBgFetchingFlag(false));
    } catch(err) {
      console.log('No available images');
      dispatch(changeBgImage(natureImage));
      dispatch(changeBgFetchingFlag(false));
    };
  };
}
