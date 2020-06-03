import React from "react";
import { connect } from "react-redux";
import { getForecastPitch } from "../js/functions/getForecastPitch";
import { convertTemperature } from "../js/functions/convertTemperature";
import { synthesis } from "./SpeechSynthesis";

class IconSpeaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpeaking: false,
    };
    this.handleSpeak = this.handleSpeak.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSpeak() {
    let degrees = this.props.weatherData[0].main.temp;
    if (this.props.degreeScale === "C") {
      degrees = convertTemperature(this.props.weatherData[0].main.temp);
    }
    const pitch = getForecastPitch(
      this.props.language,
      this.props.locationName,
      this.props.locationCountry,
      degrees,
      this.props.locationWeatherDescription,
      this.props.weatherData[0].wind.speed,
      this.props.weatherData[0].main.humidity
    );
    const utterThis = new SpeechSynthesisUtterance(pitch);
    utterThis.lang = this.props.language;
    if (this.state.isSpeaking) {
      synthesis.speak(utterThis);
      utterThis.onend = () => {
        this.setState({
          isSpeaking: !this.state.isSpeaking,
        });
      }
    } else {
      synthesis.cancel(utterThis);
      this.setState({
        isSpeaking: !this.state.isSpeaking,
      });
    }
  }

  handleClick() {
    this.setState(
      {
        isSpeaking: !this.state.isSpeaking,
      },
      this.handleSpeak
    );
  }

  render() {
    return (
      <span className="icon icon_weather-player" onClick={this.handleClick}>
        <span
          className={
            this.state.isSpeaking
              ? "icon icon_speaker icon_speaking"
              : "icon icon_speaker"
          }
        ></span>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    locationName: state.locationName,
    locationCountry: state.locationCountry,
    locationWeatherDescription: state.locationWeatherDescription,
    degreeScale: state.degreeScale,
    weatherData: state.weatherData,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(IconSpeaker);
