import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WeatherProvider } from './context/weatherContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <WeatherProvider>
    <App />
  </WeatherProvider>
)
