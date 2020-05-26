import React from "react";
import {checkZeros} from "../js/functions/checkZeros";
import { dictionary } from "../js/language/dictionary";
import { connect } from "react-redux";

class LocationDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formedDate: "00:00:00",
    };
  }

  componentDidMount() {
    setInterval(this.setDateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.setDateTime);
  }

 /*  componentDidUpdate(prevProps) {

    if (prevProps.firstLocationTimezone !== this.props.firstLocationTimezone) {
      console.log(prevProps.firstLocationTimezone, this.props.firstLocationTimezone);
    }
  } */

  setDateTime = () => {
    const newDate = new Date();
    //this.props.locationData.timezone / 60 / 60;
    const day = dictionary[this.props.language].daysShort[newDate.getDay()];
    const date = newDate.getDate();
    const month = dictionary[this.props.language].months[newDate.getMonth()];
    const hours = checkZeros(newDate.getHours());
    const minutes = checkZeros(newDate.getMinutes());
    const seconds = checkZeros(newDate.getSeconds());
    const formedDate = `${day}  ${date}  ${month}  ${hours}:${minutes}:${seconds}`;
    this.setState({
      formedDate,
    });
  };

  render() {
    if (!this.props.firstLocationTimezone && !this.props.locationData.timezone)
      return "";
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
