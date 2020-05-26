import React from "react";
import { connect } from "react-redux";
import { translateLocationName } from "../store/actions";

class LocationName extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      this.props.translateLocationName(this.props.locationData.name, this.props.language);
    }
  }

  render() {
    if (!this.props.locationData.name) return '';
    return (
      <div className="location__name">{`${this.props.locationData.name}, ${this.props.locationData.country}`}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    locationData: state.locationData,
  };
};

const mapDispatchToProps = {
  translateLocationName
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationName);
