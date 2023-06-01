import {useState} from "react";
import {useWeatherContext} from '../context/weatherContext'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {
  TextField,
  Container,
  Box,
  Grid,
  Button,
  Snackbar,
  Alert,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputAdornment,
  Typography,
} from '@mui/material'

const Search = () => {

  const [locationInfo, setLocationInfo] = useState({
    city: '',
    state: '',
    country: '',
    units: '',
  })

  //Open/Close state for toast notification.
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const {getWeatherData} = useWeatherContext()

  //Update state with the value of the input. 
  const handleChange = (e) => {
    e.preventDefault()
    setLocationInfo({...locationInfo, [e.target.name]: e.target.value})
  }

  const handleInputValidation = (e) => {
    e.preventDefault()
     // Check that all inputs are present.
     // If country code is US then there has to be a state code. 
    if((locationInfo.country === 'US' && locationInfo.state === '') || !locationInfo.city || !locationInfo.country || !locationInfo.units){
      setSnackBarOpen(true);
      handleClear(e);
    } else {
      handleSubmit(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //Pass the search input to the weatherContext.
    getWeatherData(locationInfo)
    handleClear(e)
  }

  //Clear all search fields. 
  const handleClear = (e) => {
    e.preventDefault()
    setLocationInfo({
      city: '',
      state: '',
      country: '',
      units: '',
    })
  }

  //Function for closing the snack bar alert.
  const handleSnackBarClose = (event, reason) => {
    //This if statement prevents the user from accidentally clicking out of the alert.
    if (reason === 'clickaway') {
      return;
    }
    //Once the duration specified in the snackbar has passed, close the alert.
    setSnackBarOpen(false);
  };
  
    return (
      <form>     
        <Container maxWidth='md'>
          <Box sx={{ flexGrow: 1, mt: 5, }}>
            <Grid container rowSpacing={6} columnSpacing={2} >
                <Grid item md={3} sm={3} xs={12} display="flex" justifyContent="center"
                  alignItems="center">
                    <TextField 
                        id="city name" 
                        label="City" 
                        name="city"
                        variant="outlined" 
                        helperText="Required" 
                        placeholder="Los Angeles"
                        value={locationInfo.city}
                        onChange={handleChange}
                        required={true}
                        // If the user did not provide a city value then provide a visual indicator of the error.
                        error={(locationInfo.country && !locationInfo.city ? true : false)}
                        InputProps={{
                          endAdornment: ( 
                            (locationInfo.country && !locationInfo.city) ? 
                            (<InputAdornment position="end">
                              <PriorityHighIcon color="warning" />
                            </InputAdornment>)
                            :
                            ''
                          ),
                        }}
                      />
                </Grid>
                <Grid item md={3} sm={3} xs={12} display="flex" justifyContent="center"
                  alignItems="center">
                <TextField 
                      id="state name" 
                      label="State" 
                      name="state"
                      variant="outlined" 
                      helperText="Only if searching in the US."
                      placeholder="CA"
                      value={locationInfo.state}
                      onChange={handleChange}
                      // If the user is searching in the us and did not provide a state value then provide a visual indicator of the error.
                      error={(locationInfo.country==='US' && locationInfo.state==='' ? true : false)}
                      InputProps={{
                        endAdornment: ( 
                          (locationInfo.country==='US' && locationInfo.state==='') ? 
                          (<InputAdornment position="end">
                            <PriorityHighIcon color="warning" />
                          </InputAdornment>)
                          :
                          ''
                        ),
                      }}
                    />
                </Grid>
                <Grid item md={3} sm={3} xs={12} display="flex" justifyContent="center"
                  alignItems="center">
                <TextField 
                      id="country name" 
                      label="Country" 
                      name="country"
                      variant="outlined" 
                      helperText="Required" 
                      placeholder="US"
                      value={locationInfo.country}
                      onChange={handleChange}
                      required={true}
                      //If the user did not provide a country value set error to true and provide a visual indicator of the error.
                      error={((locationInfo.city || locationInfo.state) && !locationInfo.country) ? true : false}
                      InputProps={{
                        endAdornment: ( 
                          ((locationInfo.city || locationInfo.state) && !locationInfo.country) ? 
                          (<InputAdornment position="end">
                            <PriorityHighIcon color="warning" />
                          </InputAdornment>)
                          :
                          ''
                        ),
                      }}
                    />
                </Grid>
                <Grid item md={3} sm={3} xs={12} display="flex"  justifyContent="center"  alignItems="center" ms={0}>
                    <FormControl 
                    //If the user did not select a unit value set error to true.
                    error = {((locationInfo.city || locationInfo.state) && (!locationInfo.units))? true : false}
                    required={true}
                    >
                    <InputLabel id="Units">Units</InputLabel>
                    <Select
                      autoWidth
                      labelId="Units"
                      id="units"
                      name="units"
                      value={locationInfo.units}
                      label="units"
                      onChange={handleChange}
                    >
                      <MenuItem value={'imperial'}>Fahrenheit (F)</MenuItem>
                      <MenuItem value={"metric"}>Celsius (C)</MenuItem>
                      <MenuItem value={"standard"}>Kelvin (K)</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item  xs={12} display="flex" justifyContent="center" alignItems="center" mb={3}>
                  {/* Submit button */}
                  <Button 
                    onClick={handleInputValidation} 
                    variant="contained" 
                    size={"large"} 
                    aria-label="Submit" 
                    sx={{marginRight: 3, fontSize: 19, fontWeight: 'bold', bgcolor: '#2196f3', ":hover":{bgcolor: "white", color: '#2196f3',borderColor: '2196f3', border: 'solid'}}}
                  >
                    Submit
                  </Button>
                  {/* Clear button */}
                  <Button 
                    onClick={handleClear} 
                    variant="outlined" 
                    aria-label="clear" 
                    sx={{ color: 'grey', borderColor: "grey", fontWeight: 'bold', ":hover":{bgcolor: "white", color: '#2196f3',borderColor: '2196f3', border: 'solid'}}}
                  >
                    <Typography>Clear</Typography> 
                  </Button>                  
                </Grid>
              </Grid>
          </Box>
        </Container>
        
        {/* Toast Noficiation */}
        <Snackbar open={snackBarOpen} autoHideDuration={4000} onClose={handleSnackBarClose}>
            <Alert onClose={handleSnackBarClose} severity="error" sx={{ width: '100%' }}>
              Please make sure you filled out all necessary fields.
            </Alert>
        </Snackbar> 
      
      </form>
    )
  }
  
  export default Search
  