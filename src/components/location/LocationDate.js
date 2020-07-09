import React from "react";
import { checkZeros } from "../../utilities/date_time_functions/checkZeros";
import { getCityDate } from "../../utilities/date_time_functions/getCityDate";
import { dictionary } from "../../constants/dictionary";
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
    if (this.props.localTimezone && this.props.locationData) {
      const cityDate = getCityDate(this.props.locationData.timezone/3600);
      const day = dictionary[this.props.language].daysShort[cityDate.getDay()];
      const date = cityDate.getDate();
      const month =
        dictionary[this.props.language].months[cityDate.getMonth()];
      const hours = checkZeros(cityDate.getHours());
      const minutes = checkZeros(cityDate.getMinutes());
      const seconds = checkZeros(cityDate.getSeconds());
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
    localTimezone: state.localTimezone,
  };
};

export default connect(mapStateToProps, null)(LocationDate);
