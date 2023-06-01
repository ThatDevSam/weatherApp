import { useEffect, useState } from 'react'
import Search from './components/Search'
import WeatherDisplay from './components/WeatherDisplay'
import { useWeatherContext } from './context/weatherContext'

import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material'


const App = () => {

  let weatherAppTheme = createTheme({
    typography: {
      fontFamily: [
        'Merriweather Sans',
        'sans-serif',
      ].join(','),
    },});

  weatherAppTheme = responsiveFontSizes(weatherAppTheme)

    const {
      addDefaultFavoritesToStorage,
      getFavoritesData,
    } = useWeatherContext()

    useEffect(() => {
      addDefaultFavoritesToStorage()
      getFavoritesData()
    },[])


  return (
    <>
    <ThemeProvider theme={weatherAppTheme}>
      <Box sx={{ height: '100vh'}}>
        <Search />
        <WeatherDisplay/>
      </Box>
    </ThemeProvider>
    </>
  )
}

export default App
