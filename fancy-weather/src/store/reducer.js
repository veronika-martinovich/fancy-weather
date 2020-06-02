import natureImage from "../image/nature.jpg";

const initialState = {
  language: 'en',
  lat: '',
  lon: '',
  isForecastAvailable: true,
  locationName: '',
  locationCountry: '',
  locationWeatherDescription: '',
  locationData: '',
  weatherData: '',
  localTimezone: '',
  degreeScale: localStorage.degreeScale || 'C',
  bgImageUrl: natureImage,
  isBgFetching: false,
  searchQuery: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        language: action.lang
      }

    case 'CHANGE_DEGREE_SCALE':
      return {
        ...state,
        degreeScale: action.scale
      }

    case 'CHANGE_BG_IMAGE':
      return {
        ...state,
        bgImageUrl: action.url
      }

    case 'CHANGE_BG_FETCHING_FLAG':
      return {
        ...state,
        isBgFetching: action.flag
      }
    
    case 'UPDATE_LOCATION_DATA':
      return {
        ...state,
        locationData: action.location
      }

    case 'UPDATE_WEATHER_DATA':
      return {
        ...state,
        weatherData: action.weather
      }

    case 'UPDATE_FORECAST_AVAILABILITY':
      return {
        ...state,
        isForecastAvailable: action.availability
      }

    case 'UPDATE_LOCAL_TIMEZONE':
      return {
        ...state,
        localTimezone: action.timezone
      }

    case 'UPDATE_LOCATION_NAME':
      return {
        ...state,
        locationName: action.name
      }

    case 'UPDATE_LOCATION_COUNTRY':
      return {
        ...state,
        locationCountry: action.country
      }

    case 'UPDATE_LOCATION_WEATHER_DESCRIPTION':
      return {
        ...state,
        locationWeatherDescription: action.description
      }

    case 'UPDATE_COORDS':
      return {
        ...state,
        lat: action.lat,
        lon: action.lon
      }

    case 'UPDATE_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.searchQuery
      }

    default:
      return state
  }
}

export default reducer;