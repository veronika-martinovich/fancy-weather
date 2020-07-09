import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { checkZeros } from "../../utilities/date_time_functions/checkZeros";
import { getCityDate } from "../../utilities/date_time_functions/getCityDate";
import { dictionary } from "../../constants/dictionary";
import { selectorLocation } from "../../reducers/location/locationReducer";
import { selectorApp } from "../../reducers/app/appReducer";

export const LocationDate = () => {
  const [formedDate, setFormedDate] = useState("");
  const { language, localTimezone } = useSelector(selectorApp);
  const { locationData } = useSelector(selectorLocation);

  const updateDateTime = () => {
    const cityDate = getCityDate(locationData.timezone / 3600);
    const day = dictionary[language].daysShort[cityDate.getDay()];
    const date = cityDate.getDate();
    const month = dictionary[language].months[cityDate.getMonth()];
    const hours = checkZeros(cityDate.getHours());
    const minutes = checkZeros(cityDate.getMinutes());
    const seconds = checkZeros(cityDate.getSeconds());
    const newFormedDate = `${day}  ${date}  ${month}  ${hours}:${minutes}:${seconds}`;
    setFormedDate(newFormedDate);
  };

  useEffect(() => {
    if (localTimezone && locationData.timezone) {
      const intervalId = setInterval(() => {
        updateDateTime();
      }, 1000);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationData, localTimezone, language]);

  return <div className="location__date-time">{formedDate}</div>;
};
