import React from "react";
import { changeDegreeScale } from "../store/actionCreators";
import { connect } from "react-redux";

class DegreeScaleSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedButton: "°C",
    };
    this.handleScaleSwitch = this.handleScaleSwitch.bind(this);
  }

  handleScaleSwitch(e) {
    this.props.changeDegreeScale(e.target.value);
    localStorage.setItem('degreeScale', e.target.value);
  }

  render() {
    return (
      <div className="degree-scale-switcher" onChange={this.handleScaleSwitch}>
        <input
          type="radio"
          id="switch-fahrenheit"
          name="degree-scale"
          value="F"
          defaultChecked={this.props.degreeScale === 'C' ? false : true}
        />
        <label htmlFor="switch-fahrenheit" className="switch-fahrenheit">
          °F
        </label>
        <input
          type="radio"
          id="switch-celsius"
          name="degree-scale"
          value="C"
          defaultChecked={this.props.degreeScale === 'C' ? true : false}
        />
        <label htmlFor="switch-celsius" className="switch-celsius">
          °C
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    degreeScale: state.degreeScale
  }
}

const mapDispatchToProps = {
  changeDegreeScale
}

export default connect(mapStateToProps, mapDispatchToProps)(DegreeScaleSwitcher);
