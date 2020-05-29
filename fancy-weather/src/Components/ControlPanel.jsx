import React from "react";
import IconRefreshBg from "./IconRefreshBg";
import  SelectLanguage  from "./SelectLanguage";
import  DegreeScaleSwitcher  from "./DegreeScaleSwitcher";

export const ControlPanel = () => {
  return (
    <div className="control-panel">
      <IconRefreshBg />
      <SelectLanguage />
      <DegreeScaleSwitcher />
    </div>
  );
};
