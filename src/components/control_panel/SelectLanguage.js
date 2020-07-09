import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { languages } from "../../constants/languages";
import { changeLanguage } from "../../reducers/app/appActions";
import { selectorApp } from "../../reducers/app/appReducer";
import { actionChangePreviousLanguage } from "../../reducers/app/appActions";

export const SelectLanguage = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { language } = useSelector(selectorApp);
  const dispatch = useDispatch();

  const handleItemClick = (e) => {
    setIsOpened(!isOpened);
    if (e.target.classList.contains("select__item")) {
      dispatch(actionChangePreviousLanguage(language));
      dispatch(changeLanguage(e.target.textContent));
    }
    localStorage.setItem("language", e.target.textContent);
  };

  return (
    <div
      className={isOpened ? "select select_opened" : "select"}
      onClick={handleItemClick}
    >
      <div className="select__header">
        <span className="select__current">{language}</span>
        <span
          className={
            isOpened
              ? "select__icon select__icon_opened"
              : "select__icon icon select__icon_closed"
          }
        ></span>
      </div>
      <div className="select__body">
        {languages.map((lang) => (
          <div key={lang} className="select__item" value={lang}>
            {lang}
          </div>
        ))}
      </div>
    </div>
  );
};
