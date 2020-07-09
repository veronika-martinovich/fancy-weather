import React from "react";
import IconRefreshBg from "./IconRefreshBg";
import  SelectLanguage  from "./SelectLanguage";
import  DegreeScaleSwitcher  from "./DegreeScaleSwitcher";
import IconSpeaker from "./IconSpeaker";

export const ControlPanel = () => {
  return (
    <div className="control-panel">
      <IconRefreshBg />
      <SelectLanguage />
      <DegreeScaleSwitcher />
      <IconSpeaker />
    </div>
  );
};
