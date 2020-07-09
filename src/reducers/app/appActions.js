export function changeLanguage(lang) {
  return { type: "CHANGE_LANGUAGE", lang };
}

export function changeDegreeScale(scale) {
  return { type: "CHANGE_DEGREE_SCALE", scale };
}

export function updateLocalTimezone(timezone) {
  return { type: "UPDATE_LOCAL_TIMEZONE", timezone };
}

export function updateSearchQuery(query) {
  return { type: "UPDATE_SEARCH_QUERY", query };
}
