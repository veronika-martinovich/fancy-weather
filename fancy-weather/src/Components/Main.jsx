import React from "react";
import LocationName from "./LocationName";
import LocationDate from "./LocationDate";
import LocationMap from "./LocationMap";
import CurrentForecast from "./CurrentForecast";
import FutureForecast from "./FutureForecast";
import { connect } from "react-redux";
import { getCoords } from "../store/actions";

class Main extends React.Component {

  componentDidMount() {
    this.props.getCoords();
  }

  render() {
    return (
      <main className="main">
        <div className="wrapper main__wrapper">
          <div className="location">
            <LocationName />
            <LocationDate />
          </div>
          <div className="weather">
            <CurrentForecast />
            <FutureForecast/>
          </div>
          <LocationMap/>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = {
  getCoords
};

export default connect(null, mapDispatchToProps)(Main);
