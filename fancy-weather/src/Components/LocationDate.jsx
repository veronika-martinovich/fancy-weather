import React from "react";
import { checkZeros } from "../js/functions/checkZeros";
import { dictionary } from "../js/language/dictionary";
import { connect } from "react-redux";

class LocationDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formedDate: "",
    };
  }

  componentDidMount() {
    setInterval(this.setDateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.setDateTime);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.locationData.name !== this.props.locationData.name) {
      return true;
    }
  }

  setDateTime = () => {
    if (this.props.firstLocationTimezone && this.props.locationData) {
      let localDate = "";
      if (
        this.props.firstLocationTimezone === this.props.locationData.timezone
      ) {
        localDate = new Date();
      } else {
        const tempDate = new Date();
        const timezoneShiftHours =
          tempDate.getHours() -
          this.props.firstLocationTimezone / 3600 +
          this.props.locationData.timezone / 3600;
        const timezoneShiftMinutes =
          (this.props.locationData.timezone / 3600 -
            parseInt(this.props.locationData.timezone / 3600)) *
          60;
        localDate = new Date(
          tempDate.getFullYear(),
          tempDate.getMonth(),
          tempDate.getDate(),
          timezoneShiftHours,
          tempDate.getMinutes() + timezoneShiftMinutes,
          tempDate.getSeconds()
        );
      }
      const day = dictionary[this.props.language].daysShort[localDate.getDay()];
      const date = localDate.getDate();
      const month =
        dictionary[this.props.language].months[localDate.getMonth()];
      const hours = checkZeros(localDate.getHours());
      const minutes = checkZeros(localDate.getMinutes());
      const seconds = checkZeros(localDate.getSeconds());
      const formedDate = `${day}  ${date}  ${month}  ${hours}:${minutes}:${seconds}`;
      this.setState({
        formedDate,
      });
    }
  };

  render() {
    return <div className="location__date-time">{this.state.formedDate}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    locationData: state.locationData,
    firstLocationTimezone: state.firstLocationTimezone,
  };
};

export default connect(mapStateToProps, null)(LocationDate);
