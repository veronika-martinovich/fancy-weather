import { translateText } from "../../utilities/translation_functions/translateText";
import { actionGetWeatherByCoords } from "../weather/weatherActions";

export function actionUpdateCoords(lat, lon) {
  return { type: "UPDATE_COORDS", lat, lon };
}

export function actionUpdateCoordAvailability(availability) {
  return { type: "UPDATE_COORD_AVAILABILITY", availability };
}

export function actionUpdateLocationName(name) {
  return { type: "UPDATE_LOCATION_NAME", name };
}

export function actionUpdateLocationCountry(country) {
  return { type: "UPDATE_LOCATION_COUNTRY", country };
}

export function actionUpdateLocationWeatherDescription(description) {
  return { type: "UPDATE_LOCATION_WEATHER_DESCRIPTION", description };
}

export function actionUpdateLocationData(location) {
  return { type: "UPDATE_LOCATION_DATA", location };
}

export function actionTranslateLocationName(text, langFrom, langTo) {
  return async function (dispatch) {
    const translation = await translateText(text, langFrom, langTo);
    dispatch(actionUpdateLocationName(translation.text[0]));
  };
}

export function actionTranslateLocationCountry(text, langFrom, langTo) {
  return async function (dispatch) {
    const translation = await translateText(text, langFrom, langTo);
    dispatch(actionUpdateLocationCountry(translation.text[0]));
  };
}

export function actionTranslateWeatherDescription(text, langFrom, langTo) {
  return async function (dispatch) {
    const translation = await translateText(text, langFrom, langTo);
    dispatch(actionUpdateLocationWeatherDescription(translation.text[0]));
  };
}

export function actionGetCoords(langTo) {
  return function (dispatch) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          actionUpdateCoords(position.coords.latitude, position.coords.longitude)
        );
        dispatch(
          actionGetWeatherByCoords(
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
