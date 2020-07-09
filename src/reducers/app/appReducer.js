const defaultData = {
  language: localStorage.language || "en",
  degreeScale: localStorage.degreeScale || "C",
  localTimezone: "",
  searchQuery: "",
};

const appReducer = (state = defaultData, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.lang,
      };
    case "CHANGE_DEGREE_SCALE":
      return {
        ...state,
        degreeScale: action.scale,
      };
    case "UPDATE_LOCAL_TIMEZONE":
      return {
        ...state,
        localTimezone: action.timezone,
      };
    case "UPDATE_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.query,
      };
    default:
      return state;
  }
};

export default appReducer;
