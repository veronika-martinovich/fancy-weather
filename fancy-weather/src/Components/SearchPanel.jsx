import React from "react";
import IconMicrophone from "./IconMicrophone";
import { dictionary } from "../js/language/dictionary";
import { connect } from "react-redux";
import { getWeatherByCityName, updateSearchQuery } from "../store/actions";

class SearchPanel extends React.Component {

  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.props.getWeatherByCityName(this.props.searchQuery, this.props.language, 'en');
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
            value={this.props.searchQuery}
            onChange={(e) => this.props.updateSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-panel__button">
            {dictionary[this.props.language].searchButtonText}
          </button>
          <IconMicrophone />
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
  getWeatherByCityName,
  updateSearchQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
