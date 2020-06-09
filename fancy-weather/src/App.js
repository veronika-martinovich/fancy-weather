import React from "react";
import "./scss/style.scss";
import { Header } from "./Components/Header";
import Main from "./Components/Main";
import { connect } from "react-redux";
import { getCoords, changeBgFetchingFlag } from "./store/actionCreators";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgImageUrl: this.props.bgImageUrl,
    };
  }

  componentDidMount() {
    this.props.getCoords(this.props.language);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isBgFetching !== this.props.isBgFetching) {
      this.setState({
        bgImageUrl: this.props.bgImageUrl,
      });
    }
  }

  render() {
    return (
      <div
        className="App"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${this.state.bgImageUrl}')`,
        }}
      >
        <Header />
        <Main />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
    bgImageUrl: state.bgImageUrl,
    isBgFetching: state.isBgFetching,
  };
};

const mapDispatchToProps = {
  getCoords,
  changeBgFetchingFlag,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
