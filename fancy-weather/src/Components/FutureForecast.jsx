import React from "react";
import { connect } from "react-redux";
import { convertTemperature } from "../js/functions/convertTemperature";
import { dictionary } from "../js/language/dictionary";

class FutureForecast extends React.Component {

  getWeekDay(shift) {
    let someDate = new Date();
    someDate.setDate(someDate.getDate() + shift); 
    return someDate.getDay();
  }

  render() {
    if (!this.props.weatherData) return "";
    return (
      <div className="future-forecast">
        {this.props.weatherData.map((item, index) => {
          if (index > 0 && index < 4) {
            return (
              <div className="future-forecast__day" key={index}>
                <p className="future-forecast__week-day">
                  {
                    dictionary[this.props.language].days[
                      this.getWeekDay(index)
                    ]
                  }
                </p>
                <div className="future-forecast__weather-container">
                  <div className="future-forecast__degrees">
                    {this.props.degreeScale === "C"
                      ? convertTemperature(item.main.temp)
                      : item.main.temp}
                  </div>
                  <span className="future-forecast__degrees-sign">°</span>
                  <span
                    className="future-forecast__weather-icon icon_weather"
                    alt="weather icon"
                    style={{
                      backgroundImage: `url(http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png)`,
                    }}
                  ></span>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    weatherData: state.weatherData,
    degreeScale: state.degreeScale,
  };
};

export default connect(mapStateToProps)(FutureForecast);
