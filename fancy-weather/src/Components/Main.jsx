import React from "react";
import LocationName from "./LocationName";
import LocationDate from "./LocationDate";
import CurrentForecast from "./CurrentForecast";
import { connect } from "react-redux";
import { getWeatherByLocation } from "../store/actions";

class Main extends React.Component {

  componentDidMount() {
    this.props.getWeatherByLocation();
  }

  render() {
    return (
      <main className="main">
        <div className="wrapper main__wrapper">
          <div className="location">
            <LocationName />
            <LocationDate />
          </div>
          <CurrentForecast />
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = {
  getWeatherByLocation
};

export default connect(null, mapDispatchToProps)(Main);
