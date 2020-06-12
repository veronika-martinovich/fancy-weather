import React from "react";
import { connect } from "react-redux";
import { getWeatherByCityName, updateSearchQuery } from "../../store/actionCreators";
import { recognition } from "../../constants/SpeechRecognition";

class IconMicrophone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isListening: false,
    };
    this.handleListen = this.handleListen.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleListen() {
    recognition.lang = `${this.props.language}`;
    if (this.state.isListening) {
      recognition.start();
      recognition.onresult = (e) => {
        const query = e.results[0][0].transcript;
        this.props.updateSearchQuery(query);
        this.setState({
          isListening: !this.state.isListening,
        });
        this.props.getWeatherByCityName(query, this.props.language, "en");
      };
    } else {
      recognition.stop();
    }
  }

  handleClick() {
    this.setState(
      {
        isListening: !this.state.isListening,
      },
      this.handleListen
    );
  }

  render() {
    return (
      <span
        className={
          this.state.isListening
            ? "search-panel__microphone search-panel__microphone_listening"
            : "search-panel__microphone"
        }
        onClick={this.handleClick}
      ></span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    searchQuery: state.searchQuery,
  };
};

const mapDispatchToProps = {
  getWeatherByCityName,
  updateSearchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(IconMicrophone);
