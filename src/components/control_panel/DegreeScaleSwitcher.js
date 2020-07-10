import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionChangeDegreeScale } from "../../reducers/app/appActions";
import { selectorApp } from "../../reducers/app/appReducer";

export const DegreeScaleSwitcher = () => {
  const { degreeScale } = useSelector(selectorApp);
  const dispatch = useDispatch();

  const handleScaleSwitch = (e) => {
    dispatch(actionChangeDegreeScale(e.target.value));
    localStorage.setItem("degreeScale", e.target.value);
  };

  return (
    <div className="degree-scale-switcher" onChange={handleScaleSwitch}>
      <input
        type="radio"
        id="switch-fahrenheit"
        name="degree-scale"
        value="F"
        defaultChecked={degreeScale === "C" ? false : true}
      />
      <label htmlFor="switch-fahrenheit" className="switch-fahrenheit">
        °F
      </label>
      <input
        type="radio"
        id="switch-celsius"
        name="degree-scale"
        value="C"
        defaultChecked={degreeScale === "C" ? true : false}
      />
      <label htmlFor="switch-celsius" className="switch-celsius">
        °C
      </label>
    </div>
  );
};
