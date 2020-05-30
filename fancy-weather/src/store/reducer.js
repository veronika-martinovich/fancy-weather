import natureImage from "../image/nature.jpg";

const initialState = {
  language: 'en',
  lat: '',
  lon: '',
  isForecastAvailable: true,
  locationData: '',
  weatherData: '',
  firstLocationTimezone: '',
  degreeScale: 'C',
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

    case 'UPDATE_FIRST_LOCATION_TIMEZONE':
      return {
        ...state,
        firstLocationTimezone: action.timezone
      }

    case 'UPDATE_LOCATION_NAME':
      return {
        ...state,
        locationData: {
          ...state.locationData,
          name: action.name
        }
      }

    /* case 'UPDATE_LOCATION_COUNTRY':
      return {
        ...state,
        locationData: {
          ...state.locationData,
          country: action.country
        }
      } */

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

    case 'UPDATE_WEATHER_DESCRIPTION':
      return {
        ...state,
        weatherData: state.weatherData.map((item, index) => {
          if (index !== 0) {
            return item
          }
          return {
            ...item,
            weather: item.weather.map((item, index) => {
              if (index !== 0) {
                return item
              }
              return {
                ...item,
                description: action.description
              }
            })
          }
        })
      }
    
    default:
      return state
  }
}

export default reducer;