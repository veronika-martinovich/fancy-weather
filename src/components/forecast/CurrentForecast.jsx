import React from "react";
import { connect } from "react-redux";
import { convertToCelsius } from "../../utilities/degree_functions/convertToCelsius";
import { convertToFahrenheit } from "../../utilities/degree_functions/convertToFahrenheit";
import { dictionary } from "../../constants/dictionary";
import {
  getWeatherByCoords,
  translateWeatherDescription,
} from "../../store/actionCreators";

class CurrentForecast extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      this.props.translateWeatherDescription(
        this.props.locationWeatherDescription,
        prevProps.language,
        this.props.language
      );
    }
  }

  render() {
    if (!this.props.weatherData) return "";
    return (
      <div className="current-forecast">
        <div className="current-forecast__temperature">
          <div className="current-forecast__degrees">
            {this.props.degreeScale === "C"
              ? convertToCelsius(this.props.weatherData[0].main.temp)
              : convertToFahrenheit(this.props.weatherData[0].main.temp)}
          </div>
          <span className="current-forecast__degrees-sign">°</span>
        </div>
        <div className="current-forecast__indicators">
          <span
            className="current-forecast__weather-icon"
            alt="weather icon"
            style={{
              backgroundImage: `url(http://openweathermap.org/img/wn/${this.props.weatherData[0].weather[0].icon}@2x.png)`,
            }}
          ></span>
          <div className="current-forecast__indicator">
            {this.props.locationWeatherDescription}
          </div>
          <div className=" current-forecast__indicator">
            {dictionary[this.props.language].feelsLike}:{" "}
            {this.props.degreeScale === "C"
              ? convertToCelsius(this.props.weatherData[0].main.feels_like)
              : convertToFahrenheit(this.props.weatherData[0].main.feels_like)}
            °
          </div>
          <div className="current-forecast__indicator">
            {dictionary[this.props.language].wind}:{" "}
            {this.props.weatherData[0].wind.speed}{" "}
            <span className="current-forecast__measure-unit">
              {dictionary[this.props.language].windSpeed}
            </span>
          </div>
          <div className="current-forecast__indicator">
            {dictionary[this.props.language].humidity}:{" "}
            {this.props.weatherData[0].main.humidity}%
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    lat: state.lat,
    lon: state.lon,
    locationWeatherDescription: state.locationWeatherDescription,
    weatherData: state.weatherData,
    degreeScale: state.degreeScale,
  };
};

const mapDispatchToProps = {
  translateWeatherDescription,
  getWeatherByCoords,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentForecast);
