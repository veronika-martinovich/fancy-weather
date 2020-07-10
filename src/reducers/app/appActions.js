export function actionChangeLanguage(lang) {
  return { type: "CHANGE_LANGUAGE", lang };
}

export function actionChangePreviousLanguage(lang) {
  return { type: "CHANGE_PREVIOUS_LANGUAGE", lang };
}

export function actionChangeDegreeScale(scale) {
  return { type: "CHANGE_DEGREE_SCALE", scale };
}

export function actionUpdateLocalTimezone(timezone) {
  return { type: "UPDATE_LOCAL_TIMEZONE", timezone };
}

export function actionUpdateSearchQuery(query) {
  return { type: "UPDATE_SEARCH_QUERY", query };
}
