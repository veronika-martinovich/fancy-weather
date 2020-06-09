import React from "react";
import { ControlPanel } from "./ControlPanel";
import  SearchPanel  from "./SearchPanel";

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
