import React from "react";
import { ControlPanel } from "../control_panel/ControlPanel";
import  SearchPanel  from "../search_panel/SearchPanel";

export const Header = () => {
  return (
    <header className="header">
      <div className="wrapper header__wrapper">
          <ControlPanel />
          <SearchPanel/>
      </div>
    </header>
  );
};
