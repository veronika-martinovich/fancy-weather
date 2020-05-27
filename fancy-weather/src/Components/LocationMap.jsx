import React from "react";
import { connect } from "react-redux";
import { dictionary } from "../js/language/dictionary";

class LocationMap extends React.Component {
  

  render() {
    //if (!this.props.weatherData) return "";
    return (
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language
  };
};

export default connect(mapStateToProps)(LocationMap);