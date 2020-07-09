const defaultData = {
  isForecastAvailable: true,
  weatherData: "",
};

const weatherReducer = (state = defaultData, action) => {
  switch (action.type) {
    case "UPDATE_FORECAST_AVAILABILITY":
      return {
        ...state,
        isForecastAvailable: action.availability,
      };
    case "UPDATE_WEATHER_DATA":
      return {
        ...state,
        weatherData: action.weather,
      };
    default:
      return state;
  }
};

export default weatherReducer;
