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
    if (!this.props.isForecastAvailable) return (
      <div className="error-message">Something went wrong</div>
    )
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

const mapStateToProps = (state) => {
  return {
    isForecastAvailable: state.isForecastAvailable
  }
}

const mapDispatchToProps = {
  getCoords
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
