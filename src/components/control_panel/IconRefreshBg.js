import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionGetBgImage } from "../../reducers/bgImage/bgImageActions";
import { getSeason } from "../../utilities/weather_functions/getSeason";
import { getTimeOfDay } from "../../utilities/weather_functions/getTimeOfDay";
import { selectorBgImage } from "../../reducers/bgImage/bgImageReducer";
import { selectorWeather } from "../../reducers/weather/weatherReducer";

export const IconRefreshBg = () => {
  const { isBgFetching } = useSelector(selectorBgImage);
  const { weatherData } = useSelector(selectorWeather);
  const dispatch = useDispatch();

  const handleRefreshBgClick = () => {
    dispatch(
      actionGetBgImage(
        weatherData[0].weather[0].main,
        getSeason(weatherData[0].dt_txt),
        getTimeOfDay(weatherData[0].dt_txt)
      )
    );
  };

  return (
    <span className="icon icon_refresh-bg" onClick={handleRefreshBgClick}>
      <span
        className={
          isBgFetching
            ? "icon icon_arrow-circle icon_fetching"
            : "icon icon_arrow-circle"
        }
      ></span>
    </span>
  );
};
