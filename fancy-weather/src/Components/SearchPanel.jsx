import React from "react";
import { dictionary } from "../js/language/dictionary";
import { connect } from "react-redux";
import { getWeatherByCityName } from "../store/actions";

class SearchPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.props.getWeatherByCityName(this.state.searchQuery, this.props.language, 'en');
  };

  render() {
    return (
      <div className="search-panel">
        <form className="search-panel__form" onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            name="searchQuery"
            className="search-panel__input"
            placeholder={dictionary[this.props.language].searchInputPlaceholder}
            autoComplete='off'
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
    searchQuery: state.searchQuery
  };
};

const mapDispatchToProps = {
  getWeatherByCityName
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
