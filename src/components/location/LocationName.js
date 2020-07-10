import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  actionTranslateLocationName,
  actionTranslateLocationCountry,
} from "../../reducers/location/locationActions";
import { selectorApp } from "../../reducers/app/appReducer";
import { selectorLocation } from "../../reducers/location/locationReducer";

export const LocationName = () => {
  const { language, previousLanguage } = useSelector(selectorApp);
  const { locationName, locationCountry } = useSelector(selectorLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    if (language && previousLanguage) {
      dispatch(actionTranslateLocationName(locationName, previousLanguage, language));
      dispatch(
        actionTranslateLocationCountry(locationCountry, previousLanguage, language)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, previousLanguage, dispatch]);

  if (!locationName || !locationCountry) return null;
  return (
    <div className="location__name">{`${locationName}, ${locationCountry}`}</div>
  );
};
