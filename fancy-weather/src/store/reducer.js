const initialState = {
  language: 'en',
  firstLocationLat: '',
  firstLocationLon: '',
  locationData: '',
  weatherData: '',
  firstLocationTimezone: '',
  degreeScale: 'C'
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        language: action.lang
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

    case 'UPDATE_COORDS':
      return {
        ...state,
        firstLocationLat: action.lat,
        firstLocationLon: action.lon
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