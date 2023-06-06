import React, {useContext, useReducer, useState} from "react";
import weather_reducer from "../reducer/weatherReducer";
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
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

//Context hook that will allow the components to subscribe to state.
const WeatherContext = React.createContext() 

const initialState = {
    weatherLoading: false,
    weatherError: false,
    weatherData: {},
    favoritesLocationData: [],
    getFavoritesError: false,
    addFavoriteSucccess: false,
    addFavoriteError: false,
}

const formatWeatherDataApiUrl = (searchInfo) => {
    let apiURL = ''   
    if(searchInfo.lat  && searchInfo.lon) {//Search with lat and lon
        apiURL = `lat=${searchInfo.lat}&lon=${searchInfo.lon}&appid=${import.meta.env.VITE_API_KEY}&units=${"imperial"}`
    } 
    else if (searchInfo.state) { //If searching within the US then the state field must be included in the api URL.
        apiURL = `q=${searchInfo.city},${searchInfo.state},${searchInfo.country}&appid=${import.meta.env.VITE_API_KEY}&units=${searchInfo.units}`
    }
    else { //If there is no state in the search info, then the field is not required. 
        apiURL = `q=${searchInfo.city},${searchInfo.country}&appid=${import.meta.env.VITE_API_KEY}&units=${searchInfo.units}`
    }
    return apiURL
}

export const WeatherProvider = ({children}) => {
    const [state, dispatch] = useReducer(weather_reducer, initialState)

    const getWeatherData = async (searchInfo) => {
        dispatch({type: GET_WEATHER_BEGIN}) //Set the loading state to true.
        let urlEnding = formatWeatherDataApiUrl(searchInfo)
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?${urlEnding}`)
            const weatherData = response.data
            dispatch({type: GET_WEATHER_SUCCESS, payload: weatherData})
        } catch (error) {
            dispatch({type: GET_WEATHER_ERROR})
        }
    }

    const addCurrentToFavorites = () => {
        //If the city is not already stored in local storage add it else set error to be true.
        if(!JSON.parse(localStorage.getItem(state.weatherData.name))){
            localStorage.setItem(state.weatherData.name, JSON.stringify({lat: state.weatherData.coord.lat, lon: state.weatherData.coord.lon}))
            dispatch({type: ADD_FAVORITE_SUCCESS})
        } else {
            dispatch({type: ADD_FAVORITE_ERROR})
        }
        getFavoritesData()
    }

    const addDefaultFavoritesToStorage = () => {
        //If there are no favorites in storage, add these defaults.
        if(Object.keys(localStorage).length === 0){
            localStorage.setItem("Paris", JSON.stringify({lat: 48.8534, lon: 2.3488}))
            localStorage.setItem("New York", JSON.stringify({lat: 40.7143, lon: -74.006}))
        }
    }

    const getFavoritesData = async() => {
        const localStorageKeys = Object.keys(localStorage)
        let favoritesData = []
        try{
            for(let key in localStorageKeys) {
                let coords = JSON.parse(localStorage.getItem(localStorageKeys[key]))
                let urlEnding = formatWeatherDataApiUrl(coords)
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?${urlEnding}`)
                const {
                    main: {temp: temp}, 
                    name: city, 
                    sys: {country: country},
                    coord,
                    weather:[{description: descrp}], 
                } = response.data
                favoritesData.push({temp, city, country, coord, descrp, id:uuidv4()})
            }    
            dispatch({type: GET_FAVORITES_SUCCESS, payload: favoritesData})
        } catch (error) {
            dispatch({type: GET_FAVORITES_ERROR})
        }
    }

    const deleteFavorite = async(cityID) => {
        let newFavorites = state.favoritesLocationData.filter((city) => {
            if(city.id !== cityID){
                return true //Return true to keep the objects that do pass the test in the new array.
            } else {
                localStorage.removeItem(city.city)
                return false //Return false to remove the object that didn't pass from the array.
            }
        })
        dispatch({type: DELETE_FAVORITE, payload: newFavorites})
    }

    return(
        <WeatherContext.Provider 
            value={{
                ...state,
                getWeatherData,
                addCurrentToFavorites,
                addDefaultFavoritesToStorage,
                getFavoritesData,
                deleteFavorite,
            }}
        >
            {children}
        </WeatherContext.Provider> 
    )
}

//Context hook
export const useWeatherContext = () => {
    return useContext(WeatherContext)
}