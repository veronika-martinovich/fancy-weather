const defaultData = {
  lat: "",
  lon: "",
  isCoordAvailable: true,
  locationName: "",
  locationCountry: "",
  locationWeatherDescription: "",
  locationData: "",
};

export const selectorLocation = state => state.locationReducer;

const locationReducer = (state = defaultData, action) => {
  switch (action.type) {
    case "UPDATE_COORDS":
      return {
        ...state,
        lat: action.lat,
        lon: action.lon,
      };
    case "UPDATE_COORDS_AVAILABILITY":
      return {
        ...state,
        isCoordAvailable: action.availability,
      };
    case "UPDATE_LOCATION_NAME":
      return {
        ...state,
        locationName: action.name,
      };
    case "UPDATE_LOCATION_COUNTRY":
      return {
        ...state,
        locationCountry: action.country,
      };
    case "UPDATE_LOCATION_WEATHER_DESCRIPTION":
      return {
        ...state,
        locationWeatherDescription: action.description,
      };
    case "UPDATE_LOCATION_DATA":
      return {
        ...state,
        locationData: action.location,
      };
    default:
      return state;
  }
};

export default locationReducer;
