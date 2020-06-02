import { translateText } from "../js/functions/translateText";
import { openWeatherMapApiKey } from "../js/api/apiKeys";
import { client } from "../js/api/apiKeys";
import { clearWeatherData } from "../js/functions/clearWeatherData";
import { getSeason } from "../js/functions/getSeason";
import { getTimeOfDay } from "../js/functions/getTimeOfDay";
import { getRandomNumber } from "../js/functions/getRandomNumber";
import { countries } from "../js/language/countries";
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

export function updateCoordAvailability(availability) {
  return { type: "UPDATE_COORD_AVAILABILITY", availability };
}

export function updateLocalTimezone(timezone) {
  return { type: "UPDATE_LOCAL_TIMEZONE", timezone };
}

export function updateLocationName(name) {
  return { type: "UPDATE_LOCATION_NAME", name };
}

export function updateLocationCountry(country) {
  return { type: "UPDATE_LOCATION_COUNTRY", country };
}

export function updateLocationWeatherDescription(description) {
  return { type: "UPDATE_LOCATION_WEATHER_DESCRIPTION", description };
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

export function translateLocationCountry(text, langFrom, langTo) {
  return async function (dispatch) {
    const translation = await translateText(text, langFrom, langTo);
    dispatch(updateLocationCountry(translation.text[0]));
  };
}

export function translateWeatherDescription(text, langFrom, langTo) {
  return async function (dispatch) {
    const translation = await translateText(text, langFrom, langTo);
    dispatch(updateLocationWeatherDescription(translation.text[0]));
  };
}

export function getCoords(langTo) {
  return function (dispatch) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(updateCoords(position.coords.latitude, position.coords.longitude));
        dispatch(getWeatherByCoords(position.coords.latitude, position.coords.longitude, langTo))
      },
      (err) => {
        console.log("Can not extract current coords");
      }
    );
  };
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
        'en',
        langTo
      );
      const countryTranslation = await translateText(
        countries[weather.city.country],
        'en',
        langTo
      );
      const weatherDescriptionTranslation = await translateText(
        clearedWeatherData[0].weather[0].description,
        'en',
        langTo
      );

      dispatch(updateLocationData(weather.city));
      dispatch(updateWeatherData(clearedWeatherData));
      dispatch(updateLocalTimezone(weather.city.timezone));
      dispatch(updateLocationName(cityTranslation.text[0]));
      dispatch(updateLocationCountry(countryTranslation.text[0]));
      dispatch(updateLocationWeatherDescription(weatherDescriptionTranslation.text[0]));
    } catch (err) {
      console.log("Something went wrong");
      dispatch(updateCoordAvailability(false));
    }
  };
}

export function getWeatherByCityName(name, langFrom, langTo) {
  return async function (dispatch) {
    try {
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
      dispatch(updateLocationWeatherDescription(weatherDescriptionTranslation.text[0]));
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

export function getBgImage(weather, season, timeOfDay) {
  return async function (dispatch) {
    try {
      dispatch(changeBgFetchingFlag(true));
      const query = `${weather}, ${season}, ${timeOfDay}`;
      const page = getRandomNumber(1, 1000);
      const photos = await client.photos.search({
        query,
        page: page,
        per_page: 1,
      });
      console.log("Bg image query:", query);
      dispatch(changeBgImage(photos.photos[0].src.landscape));
      dispatch(changeBgFetchingFlag(false));
    } catch (err) {
      console.log("No available images");
      dispatch(changeBgImage(natureImage));
      dispatch(changeBgFetchingFlag(false) );
    }
  };
}
