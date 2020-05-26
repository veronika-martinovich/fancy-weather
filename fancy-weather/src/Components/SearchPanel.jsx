import React from "react";
import { dictionary } from "../js/language/dictionary";
import { connect } from "react-redux";

class SearchPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="search-panel">
        <form className="search-panel__form">
          <input
            type="text"
            name="searchQuery"
            className="search-panel__input"
            placeholder={dictionary[this.props.language].searchInputPlaceholder}
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
          <button type="submit" className="search-panel__button">
            {dictionary[this.props.language].searchButtonText}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

export default connect(mapStateToProps)(SearchPanel);
