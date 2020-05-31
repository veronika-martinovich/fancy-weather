import React from "react";
import { connect } from "react-redux";
import {
  translateLocationName,
  translateLocationCountry,
} from "../store/actions";

class LocationName extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      this.props.translateLocationName(
        this.props.locationName,
        prevProps.language,
        this.props.language
      );
      this.props.translateLocationCountry(
        this.props.locationCountry,
        prevProps.language,
        this.props.language
      );
    }
  }

  render() {
    if (!this.props.locationName) return "";
    return (
      <div className="location__name">{`${this.props.locationName}, ${this.props.locationCountry}`}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    locationName: state.locationData.name,
    locationCountry: state.locationData.country,
    weatherData: state.weatherData,
  };
};

const mapDispatchToProps = {
  translateLocationName,
  translateLocationCountry,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationName);
