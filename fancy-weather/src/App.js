import React from "react";
import "./scss/style.scss";
import { Header } from "./Components/Header";
import Main from "./Components/Main";
import { connect } from "react-redux";

class App extends React.Component {
  
  render() {
    return (
      <div
        className="App"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${this.props.bgImageUrl}')`
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
    bgImageUrl: state.bgImageUrl,
    isBgFetching: state.isBgFetching
  }
};

export default connect(mapStateToProps)(App);
