import {
    GET_WEATHER_BEGIN,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_ERROR,
    ADD_FAVORITE_BEGIN,
    ADD_FAVORITE_SUCCESS,
    ADD_FAVORITE_ERROR,
    GET_FAVORITES_SUCCESS,
    GET_FAVORITES_ERROR,
    DELETE_FAVORITE
} from '../actions'

const weather_reducer = (state, action) =>{
    switch(action.type){
        case GET_WEATHER_BEGIN : {
            return {
                ...state, 
                weatherLoading: true,
                weatherError: false
            }
        }
        case GET_WEATHER_SUCCESS : {
            return {
                ...state, 
                weatherLoading: false, 
                weatherError: false,
                weatherData: action.payload
            }
        }
        case GET_WEATHER_ERROR : {
            return {
                ...state, 
                weatherLoading: false, 
                weatherError: true,
            }
        }
        case GET_FAVORITES_SUCCESS : {
            return {
                ...state, 
                favoritesLocationData: [...action.payload],
                getFavoritesError: false
            }
        }
        case GET_FAVORITES_ERROR : {
            return {
                ...state, 
                getFavoritesError: true,
            }
        }
        case ADD_FAVORITE_SUCCESS : {
            return {
                ...state, 
                addFavoriteSucccess: true,
                addFavoriteError: false,
            }
        }
        case  ADD_FAVORITE_ERROR : {
            return {
                ...state, 
                addFavoriteError: true,
                addFavoriteSucccess: false
            }
        }
        case  DELETE_FAVORITE : {
            return {
                ...state, 
                favoritesLocationData: action.payload,
            }
        }
    }
    
    throw new Error(`No Matching "${action.type}" - action type`)
}

export default weather_reducer