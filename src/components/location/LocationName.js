import React from "react";
import { connect } from "react-redux";
import {
  translateLocationName,
  translateLocationCountry,
} from "../../reducers/location/locationActions";

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
    if (prevProps.locationName !== this.props.locationName) {
      return true;
    }
  }

  render() {
    if (!this.props.locationName || !this.props.locationCountry) return "";
    return (
      <div className="location__name">{`${this.props.locationName}, ${this.props.locationCountry}`}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    locationName: state.locationName,
    locationCountry: state.locationCountry,
  };
};

const mapDispatchToProps = {
  translateLocationName,
  translateLocationCountry,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationName);
