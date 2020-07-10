import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../scss/style.scss";
import { Header } from "./Header";
import { Main } from "./Main";
import { actionGetCoords } from "../../reducers/location/locationActions";
import { selectorBgImage } from "../../reducers/bgImage/bgImageReducer";
import { selectorApp } from "../../reducers/app/appReducer";

const App = () => {
  const { bgImageUrl, isBgFetching } = useSelector(selectorBgImage);
  const { language } = useSelector(selectorApp);
  const [bgImage, setBgImage] = useState(bgImageUrl);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetCoords(language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isBgFetching) {
      setBgImage(bgImageUrl);
    }
  }, [isBgFetching, bgImageUrl]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bgImage}')`,
      }}
    >
      <Header />
      <Main />
    </div>
  );
};

export default App;
