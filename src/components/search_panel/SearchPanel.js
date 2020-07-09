import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconMicrophone } from "./IconMicrophone";
import { dictionary } from "../../constants/dictionary";
import { getWeatherByCityName } from "../../reducers/weather/weatherActions";
import { updateSearchQuery } from "../../reducers/app/appActions";
import { selectorApp } from "../../reducers/app/appReducer";

export const SearchPanel = () => {
  const { language, searchQuery } = useSelector(selectorApp);
  const dispatch = useDispatch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getWeatherByCityName(searchQuery, language, "en"));
  };

  const handleSearchQueryChange = (e) => {
    dispatch(updateSearchQuery(e.target.value));
  };

  return (
    <div className="search-panel">
      <form className="search-panel__form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="searchQuery"
          className="search-panel__input"
          placeholder={dictionary[language].searchInputPlaceholder}
          autoComplete="off"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button type="submit" className="search-panel__button">
          {dictionary[language].searchButtonText}
        </button>
        <IconMicrophone />
      </form>
    </div>
  );
};
