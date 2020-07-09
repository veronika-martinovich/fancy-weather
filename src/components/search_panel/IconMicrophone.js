import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherByCityName } from "../../reducers/weather/weatherActions";
import { updateSearchQuery } from "../../reducers/app/appActions";
import { recognition } from "../../constants/SpeechRecognition";
import { selectorApp } from "../../reducers/app/appReducer";

export const IconMicrophone = () => {
  const [isListening, setIsListening] = useState(false);
  const { language } = useSelector(selectorApp);
  const dispatch = useDispatch();

  const handleListen = () => {
    recognition.lang = `${language}`;
    if (isListening) {
      recognition.start();
      recognition.onresult = (e) => {
        const query = e.results[0][0].transcript;
        dispatch(updateSearchQuery(query));
        setIsListening(!isListening);
        dispatch(getWeatherByCityName(query, language, "en"));
      };
    } else {
      recognition.stop();
    }
  };

  const handleClick = () => {
    setIsListening(!isListening);
  };

  useEffect(() => {
    handleListen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  return (
    <span
      className={
        isListening
          ? "search-panel__microphone search-panel__microphone_listening"
          : "search-panel__microphone"
      }
      onClick={handleClick}
    ></span>
  );
};
