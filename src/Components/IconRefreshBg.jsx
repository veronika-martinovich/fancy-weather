import React from "react";
import { connect } from "react-redux";
import { getBgImage } from "../store/actionCreators";
import { getSeason } from "../js/functions/getSeason";
import { getTimeOfDay } from "../js/functions/getTimeOfDay";

class IconRefreshBg extends React.Component {
  constructor(props) {
    super(props);
    this.handleRefreshBgClick = this.handleRefreshBgClick.bind(this);
  }

  handleRefreshBgClick() {
    this.props.getBgImage(
      this.props.weatherData[0].weather[0].main,
      getSeason(this.props.weatherData[0].dt_txt),
      getTimeOfDay(this.props.weatherData[0].dt_txt)
    );
  }

  render() {
    return (
      <span
        className="icon icon_refresh-bg"
        onClick={this.handleRefreshBgClick}
      >
        <span
          className={
            this.props.isBgFetching
              ? "icon icon_arrow-circle icon_fetching"
              : "icon icon_arrow-circle"
          }
        ></span>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weatherData: state.weatherData,
    isBgFetching: state.isBgFetching,
  };
};

const mapDispatchToProps = {
  getBgImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(IconRefreshBg);
