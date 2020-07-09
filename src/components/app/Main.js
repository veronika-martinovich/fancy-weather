import React from "react";
import { useSelector } from "react-redux";
import { LocationName } from "../location/LocationName";
import { LocationDate } from "../location/LocationDate";
import { LocationMap } from "../map/LocationMap";
import { CurrentForecast } from "../forecast/CurrentForecast";
import { FutureForecast } from "../forecast/FutureForecast";
import { dictionary } from "../../constants/dictionary";
import { selectorApp } from "../../reducers/app/appReducer";
import { selectorWeather } from "../../reducers/weather/weatherReducer";
import { selectorLocation } from "../../reducers/location/locationReducer";

export const Main = () => {
  const { language } = useSelector(selectorApp);
  const { isForecastAvailable } = useSelector(selectorWeather);
  const { isCoordAvailable } = useSelector(selectorLocation);

  let errorMessage;
  if (!isForecastAvailable) {
    errorMessage = (
      <div className="error-message">
        {dictionary[language].errorMessageForecast}
      </div>
    );
  }
  if (!isCoordAvailable) {
    errorMessage = (
      <div className="error-message">
        {dictionary[this.props.language].errorMessageCoord}
      </div>
    );
  }

  return (
    <main className="main">
      {errorMessage}
      <div className="wrapper main__wrapper">
        <div className="location">
          <LocationName />
          <LocationDate />
        </div>
        <div className="weather">
          <CurrentForecast />
          <FutureForecast />
        </div>
        <LocationMap />
      </div>
    </main>
  );
};
