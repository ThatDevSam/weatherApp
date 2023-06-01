import {useEffect} from "react";
import {useWeatherContext} from '../context/weatherContext'
import {
  Grid,
  Typography,
  IconButton,
  Button,
  
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const Favorites = () => {
  const {favoritesLocationData, deleteFavorite, getWeatherData} = useWeatherContext()
    return(
      favoritesLocationData.map((city) => (
        <Grid item key={city.id} >
          <Typography variant="h5" color={'white'}>
              {city.city}, {city.country} 
              {/* Delete button */}
              <IconButton  
                aria-label="Delete favorite" 
                onClick={() => deleteFavorite(city.id)}
                sx={{marginLeft: 1, ':hover': {background: 'none'}}} >
                <DeleteForeverIcon 
                  fontSize="sm" 
                  sx={{color: "white", ':hover':{borderColor: '2196f3', border: 'solid', borderRadius: 50}}} >
                </DeleteForeverIcon>
              </IconButton>               
          </Typography>
          <Typography variant="subtitle2" color={'white'}>
              Temp: {city.temp} 
          </Typography>
          <Typography variant="subtitle2" color={'white'}>
              {city.descrp} 
          </Typography>
              {/* Details button */}
              <Button 
                variant="outlined" 
                size="small" 
                aria-label="show details" 
                onClick={() => getWeatherData(city.coord)}
                sx={{ color: 'white', borderColor: "white", fontWeight: 'bold', ":hover":{color: 'white', borderColor: '2196f3', border: 'solid'}}}
                endIcon={<NavigateNextIcon sx={{color: 'white'}} />}
              >
                <Typography variant="caption" color={'white'}>Details</Typography> 
              </Button>
        </Grid>
      ))
    )     
  }
  
  export default Favorites