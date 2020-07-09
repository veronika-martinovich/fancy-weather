import React from "react";
import LocationName from "../location/LocationName";
import LocationDate from "../location/LocationDate";
import LocationMap from "../map/LocationMap";
import CurrentForecast from "../forecast/CurrentForecast";
import FutureForecast from "../forecast/FutureForecast";
import { dictionary } from "../../constants/dictionary";
import { connect } from "react-redux";

class Main extends React.Component {
  render() {
    let errorMessage;
    if (!this.props.isForecastAvailable) {
      errorMessage = (
        <div className="error-message">
          {dictionary[this.props.language].errorMessageForecast}
        </div>
      );
    }
    if (!this.props.isCoordAvailable) {
      errorMessage = (
        <div className="error-message">
          {dictionary[this.props.language].errorMessageCoord}
        </div>
      );
    }

    return (
      <main className="main">
        {errorMessage}
        <div className="wrapper main__wrapper">
          <div className="location">
            <LocationName />
            <LocationDate />
          </div>
          <div className="weather">
            <CurrentForecast />
            <FutureForecast />
          </div>
          <LocationMap />
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    isForecastAvailable: state.isForecastAvailable,
    isCoordAvailable: state.isCoordAvailable
  };
};

export default connect(mapStateToProps)(Main);
