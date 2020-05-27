import React from "react";
import { transformCoords } from "../js/functions/transformCoords";
import { connect } from "react-redux";
import { dictionary } from "../js/language/dictionary";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";

class LocationMap extends React.Component {
  render() {
    if (!this.props.lat || !this.props.lon) return "";
    return (
      <div className="location-map">
        <YMaps>
          <Map
            className="location-map__ymaps"
            defaultState={{
              center: [this.props.lat, this.props.lon],
              zoom: 14,
              controls: [],
            }}
          >
            <Placemark geometry={[this.props.lat, this.props.lon]} />
            <ZoomControl options={{ float: "right" }} />
          </Map>
        </YMaps>
        <span className="location-map__lat">
          {dictionary[this.props.language].latitude}:{" "}
          {transformCoords(this.props.lat)}
        </span>
        <span className="location-map__lon">
          {dictionary[this.props.language].longitude}:{" "}
          {transformCoords(this.props.lon)}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    lat: state.lat,
    lon: state.lon,
  };
};

export default connect(mapStateToProps)(LocationMap);
