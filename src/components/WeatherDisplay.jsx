import React, { useEffect, useState } from "react";

import {useWeatherContext} from '../context/weatherContext'
import Favorites from "./Favorites";
import {
  Container,
  Box,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material'
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Gradient } from "@mui/icons-material";
import { blue, yellow } from "@mui/material/colors";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const WeatherDisplay = () => {
  
  const {
    weatherData: data,
    weatherError,
    weatherLoading,
    addCurrentToFavorites,
    addFavoriteSucccess,
    addFavoriteError,
    getFavoritesError,
    favoritesLocationData,
  } = useWeatherContext()

  const [openLoading, setOpenLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleCloseLoading = () => {
    setOpenLoading(false);
  };
  const handleOpenLoading= () => {
    setOpenLoading(true);
  };
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  const handleOpenSnackBar= () => {
    setOpenSnackBar(true);
  };

  //Trigger rerender whenever there is new weather data available. 
  useEffect(() => {

  }, [data])

  useEffect(() => {
    if(weatherLoading){
      handleOpenLoading()
    } else {
      handleCloseLoading()
    }
  }, [weatherLoading])

  useEffect(() => {
    if(addFavoriteSucccess || addFavoriteError){
      handleOpenSnackBar()
    } else {
      handleCloseSnackBar()
    }
  }, [addFavoriteSucccess,addFavoriteError])

  const FavsListStlyes = styled('div')(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
      borderBottom: '1px solid white',
      paddingBottom: '2rem',
    }
  }))

  const MainDisplayStyles = styled('div')(({theme}) => ({
    [theme.breakpoints.up('sm')]:{
      borderLeft: '1px solid white',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 20
    }
  }))

  //If there is an error with the search, inform the user. 
  if(weatherError || getFavoritesError){
    return (
      <div>
        <Container maxWidth='md'>
          <Box sx={{ flexGrow: 1, mt: 5, background: 'linear-gradient(to left bottom, #ffeb3b,  #4fc3f7,#03a9f4, #1976d2)' , height: '40vh',  borderRadius: '16px', }}>
            <Container maxWidth='md' sx={{marginLeft: 5, paddingTop: 15}}>
              <Typography variant='h4' color={'white'}>
              There was a problem, please check your internet connect and try again.
              </Typography>
            </Container>
          </Box>
        </Container>
      </div>
    ) 
    // If there is no data in the current search, prompt the user
  } else if(Object.keys(data).length === 0){
    return (
      <div>
        <Container maxWidth='md'>
          <Box sx={{ flexGrow: 1, mt: 5, background: 'linear-gradient(to left bottom, #ffeb3b,  #4fc3f7,#03a9f4, #1976d2)' , height: '60vh',  borderRadius: '16px', display: "flex",
            justifyContent:"center",
            alignItems:"center"}}>
            <Container maxWidth='md'>
              <Typography variant="h4" color={'white'}>
              What's the weather like in your city?
              </Typography>
            </Container>
          </Box>
        </Container>
      </div>
    ) 
    //If there is data from the user search present it.
  } else {
    return ( 
      <div>
        <Container maxWidth='md'>
          <Box sx={{ flexGrow: 1, mt: 5, background: 'linear-gradient(to left bottom, #ffeb3b,  #4fc3f7,#03a9f4, #1976d2)' , height: 'auto',  borderRadius: '16px', }}>
            <Grid container spacing={3} rowSpacing={1} columnSpacing={5} sx={{p: 4}} >
              <Grid item md={4} sm={4} xs={12} >
                <FavsListStlyes>
                  <Grid container item spacing={3} md={12} sm={12} xs={12} direction="column" display="flex" justifyContent="center" alignContent={'center'}>                
                        {favoritesLocationData.length === 0 ? 
                        <Typography variant='h4' color={'white'} mt={10} ml={5}>
                        Don't forget to add your most searched cities to your favorites!
                        </Typography>
                        :
                        <Favorites/> } {/* Favorites list*/}
                  </Grid>
                </FavsListStlyes>
              </Grid>
              {/* Current search weather data */}
              <Grid item md={8} sm={8} xs={12} mt={4}>
                <MainDisplayStyles>
                  <Grid container item spacing={3} direction="column" display="flex" justifyContent="center" alignContent={'center'} >
                        <Typography variant="h4" color={'white'} mb={1}>
                          {data.name}, {data.sys.country} 
                          <IconButton onClick={addCurrentToFavorites} aria-label="add to favorites" sx={{marginLeft: 3, ':hover': {background: 'none'}}} >
                            <AddIcon sx={{color: "white", ':hover':{borderColor: '2196f3', border: 'solid', borderRadius: 50,  }}} fontSize="large"></AddIcon>
                          </IconButton>
                        </Typography> 
                        <Typography variant="h6" color={'white'} mb={1}> Current Temp: {data.main.temp}</Typography>
                        <Typography variant="subtitle1" color={'white'} mb={1}> Feels Like: {data.main.feels_like}</Typography>
                        <Typography variant="body1" color={'white'}mb={1}> Description: {data.weather[0].description}</Typography>
                        <Typography variant="body1" color={'white'}mb={1}> Highest Temp: {data.main.temp_max}</Typography>
                        <Typography variant="body1" color={'white'}mb={1}> Lowest Temp: {data.main.temp_min}</Typography>
                        <Typography variant="body1" color={'white'}mb={1}> Humidity: {data.main.humidity}</Typography>
                        <Typography variant="body1" color={'white'}mb={1}> Wind Speed: {data.wind.speed}</Typography>
                        <Typography variant="body1" color={'white'}mb={1}> Wind Degree: {data.wind.deg}</Typography>
                  </Grid>
                </MainDisplayStyles>
              </Grid>
            </Grid>
          </Box>
        </Container>
          
        {/* Loading backdrop */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* Toast Noficiation */}
        <Snackbar open={openSnackBar} autoHideDuration={4000} onClose={handleCloseSnackBar}>
          {addFavoriteSucccess ? 
            <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
              This city was added to your favorites.
            </Alert>
            :
            <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
              This city is already in your favorites.
            </Alert>
          }   
        </Snackbar> 
      </div>
    );
  }
}

export default WeatherDisplay