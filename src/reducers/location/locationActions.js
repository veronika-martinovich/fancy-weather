import { translateText } from "../../utilities/translation_functions/translateText";
import { getWeatherByCoords } from "../weather/weatherActions";

export function updateCoords(lat, lon) {
  return { type: "UPDATE_COORDS", lat, lon };
}

export function updateCoordAvailability(availability) {
  return { type: "UPDATE_COORD_AVAILABILITY", availability };
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

export function updateLocationData(location) {
  return { type: "UPDATE_LOCATION_DATA", location };
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
        dispatch(
          updateCoords(position.coords.latitude, position.coords.longitude)
        );
        dispatch(
          getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude,
            langTo
          )
        );
      },
      (err) => {
        console.log("Can not extract current coords");
      }
    );
  };
}
