import React, { useEffect } from "react";
import {useWeatherContext} from '../context/weatherContext'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {

    const {
        weatherData,
        weatherError,
        weatherLoading
      } = useWeatherContext()

    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        handleOpen()
    })

    return(
        <>
        <p>Loading</p>
        <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
        </Backdrop>
        </>
    )
}

export default Loading