import React from "react";
import { connect } from "react-redux";
import { convertTemperature } from "../js/functions/convertTemperature";
import { dictionary } from "../js/language/dictionary";
import {
  getWeatherByCoords,
  translateWeatherDescription,
} from "../store/actions";

class CurrentForecast extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      this.props.translateWeatherDescription(
        this.props.weatherData[0].weather[0].description,
        this.props.language
      );
    }

    if (
      prevProps.lat !== this.props.lat ||
      prevProps.lon !== this.props.lon
    ) {
      this.props.getWeatherByCoords(
        this.props.lat,
        this.props.lon
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
              ? convertTemperature(this.props.weatherData[0].main.temp)
              : this.props.weatherData[0].main.temp}
          </div>
          <span className="current-forecast__degrees-sign">°</span>
        </div>
        <div className="current-forecast__indicators">
          <span
            className="current-forecast__weather-icon icon_weather"
            alt="weather icon"
            style={{
              backgroundImage: `url(http://openweathermap.org/img/wn/${this.props.weatherData[0].weather[0].icon}@2x.png)`,
            }}
          ></span>
          <div className="current-forecast__indicator">
            {this.props.weatherData[0].weather[0].description}
          </div>
          <div className=" current-forecast__indicator">
            {dictionary[this.props.language].feelsLike}:{" "}
            {this.props.degreeScale === "C"
              ? convertTemperature(this.props.weatherData[0].main.feels_like)
              : this.props.weatherData[0].main.feels_like}
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
    weatherData: state.weatherData,
    degreeScale: state.degreeScale,
  };
};

const mapDispatchToProps = {
  translateWeatherDescription,
  getWeatherByCoords,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentForecast);
