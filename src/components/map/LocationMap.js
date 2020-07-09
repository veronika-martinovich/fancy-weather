import React from "react";
import { useSelector } from "react-redux";
import { transformCoords } from "../../utilities/coord_functions/transformCoords";
import { dictionary } from "../../constants/dictionary";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import { selectorApp } from "../../reducers/app/appReducer";
import { selectorLocation } from "../../reducers/location/locationReducer";

export const LocationMap = () => {
  const { language } = useSelector(selectorApp);
  const { lat, lon } = useSelector(selectorLocation);

  if (!lat || !lon) return null;
  return (
    <div className="location-map">
      <YMaps>
        <Map
          className="location-map__ymaps"
          state={{
            center: [lat, lon],
            zoom: 14,
            controls: [],
          }}
        >
          <Placemark geometry={[lat, lon]} />
          <ZoomControl options={{ float: "right" }} />
        </Map>
      </YMaps>
      <span className="location-map__lat">
        {dictionary[language].latitude}: {transformCoords(lat)}
      </span>
      <span className="location-map__lon">
        {dictionary[language].longitude}: {transformCoords(lon)}
      </span>
    </div>
  );
};
